//http://log.medcl.net/item/2013/05/1104/
/**
First of all; create "offer sdp" by calling peerConnection.createOffer:

offerer.createOffer(function (offerSDP) {
    offerer.setLocalDescription(offerSDP);
    // use XHR/WebSocket/etc. to exchange offer-sdp with other peer(s)
}, null, constraints);

On the "answerer" side, set "remote descriptions" using "offer sdp":

offerSDP = new SessionDescription(offerSDP);
answerer.setRemoteDescription(offerSDP);
And then create "answer sdp":
answerer.createAnswer(function (answerSDP) {
    answerer.setLocalDescription(answerSDP);

    // use XHR/WebSocket/etc. to exchange answer-sdp with "offerer"
}, null, constraints);

On the offerer side, set remote descriptions using "answer sdp":

answerSDP = new SessionDescription(answerSDP);
offerer.setRemoteDescription(answerSDP);

 **/


var iceServers = {
    iceServers:[
        {url: 'stun:stun.l.google.com:19302'}, //STUN
        {url: 'turn:homeo@turn.bistri.com:80',credential: 'homeo'}  //TURN
    ]
};

var optional = {
    optional: [{
        RtpDataChannels: true
    }]
};
//////////////////////////////////////////////////////////////////////////
//first step
//////////////////////////////////////////////////////////////////////////
var peer = new webkitRTCPeerConnection(iceServers, optional);
var constraints;
var sdp;  //RTCSessionDescription object //sessionDescription

peer.onicecandidate= function(event) {
    console.log('peer ice callback');
    if (event.candidate) {
        peer.addIceCandidate(event.candidate);
        console.log('peer ICE candidate: \n' + event.candidate.candidate);
    }
}

peer.createOffer(
    function(offerSDP) {
        peer.setLocalDescription(offerSDP);
        sdp = offerSDP;
        console.log("sdp:"+sdp);
        // use XHR/WebSocket/etc. to exchange offer-sdp with other peer(s)
    },
    function onSdpError(e) {
        console.error('sdp error:', e.name, e.message);
    },
    constraints
);
//////////////////////////////////////////////////////////////////////////
//second step
//////////////////////////////////////////////////////////////////////////

var answer;
var offerSDP = new RTCSessionDescription({sdp:sdp.sdp,type:sdp.type});
var otherPeer = new webkitRTCPeerConnection(iceServers, optional);
otherPeer.onicecandidate= function(event) {
    console.log('otherPeer ice callback');
    if (event.candidate) {
        otherPeer.addIceCandidate(event.candidate);
        console.log('otherPeer ICE candidate: \n' + event.candidate.candidate);
    }
}
otherPeer.setRemoteDescription(offerSDP);
otherPeer.createAnswer(function (answerSDP) {
    otherPeer.setLocalDescription(answerSDP);
    answer = answerSDP;
    console.log("answerSDP:"+answer);
    // use XHR/WebSocket/etc. to exchange answer-sdp with "offerer"
}, null, constraints);
//////////////////////////////////////////////////////////////////////////
//third step
//////////////////////////////////////////////////////////////////////////
answerSDP = new RTCSessionDescription({sdp:answer.sdp,type:answer.type});
peer.setRemoteDescription(answerSDP);



/////////////////////////////////////////////////////////////////////////////
//http://www.html5rocks.com/en/tutorials/webrtc/basics/#toc-rtcdatachannel
//create dataChannel
/////////////////////////////////////////////////////////////////////////////

peer.ondatachannel = function(event){
    receiveChannel = event.channel;
    receiveChannel.onmessage = function(event){
        console.log("receive:"+event.data);
    };
};

peerSendChannel = peer.createDataChannel("sendDataChannel", {reliable: false});
peerSendChannel.onopen = function(e){console.log("otherPeer receive:"+ peerSendChannel.readyState)};
peerSendChannel.onclose = function(e){console.log("otherPeer receive:"+ peerSendChannel.readyState)};




otherPeer.ondatachannel = function(event){
    receiveChannel = event.channel;
    receiveChannel.onmessage = function(e){console.log("otherPeer receive:"+ e.data)};
    receiveChannel.onopen = function(e){console.log("otherPeer receive:"+ receiveChannel.readyState)};
    receiveChannel.onclose = function(e){console.log("otherPeer receive:"+ receiveChannel.readyState)};
};
otherPeerSendChannel = otherPeer.createDataChannel("sendDataChannel", {reliable: false});

















