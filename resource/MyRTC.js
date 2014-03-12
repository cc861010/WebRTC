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

//http://simpl.info/

var iceServers = {
    iceServers: [
        {url: 'stun:stun.l.google.com:19302'}, //STUN
        {url: 'turn:homeo@turn.bistri.com:80', credential: 'homeo'}  //TURN
    ]
};

var optional = {
    optional: [
        {
            RtpDataChannels: true
        }
    ]
};
var constraints;
//////////////////////////////////////////////////////////////////////////
//first step
//////////////////////////////////////////////////////////////////////////

var peerSdp;  //RTCSessionDescription object //sessionDescription
var candidate = [];

var peer = new webkitRTCPeerConnection(iceServers, optional);
peerSendChannel = peer.createDataChannel("sendDataChannel", {reliable: false});
peer.ondatachannel = function (event) {
    console.log("peer ondatachannel--------->");
    receiveChannel = event.channel;
    receiveChannel.onmessage = function (e) {
        console.log("peer receive:" + e.data)
    };
    receiveChannel.onopen = function (e) {
        console.log("peer receive:" + receiveChannel.readyState)
    };
    receiveChannel.onclose = function (e) {
        console.log("peer receive:" + receiveChannel.readyState)
    };
};

peer.onicecandidate = function (event) {
    console.log('peer ice callback');
    if (event.candidate) {
        console.log('event.candidate:' + event.candidate);
        //otherPeer.addIceCandidate(event.candidate);
        candidate.push(event.candidate)
        console.log('peer ICE candidate: \n' + event.candidate.candidate);
    }
}

peer.createOffer(
    function (offerSDP) {
        peer.setLocalDescription(offerSDP);
        peerSdp = offerSDP;
        console.log("peerSdp:" + peerSdp.sdp);
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

var offerSDP = new RTCSessionDescription({sdp: peerSdp.sdp, type: peerSdp.type});
otherPeer = new webkitRTCPeerConnection(iceServers, optional);
otherPeer.setRemoteDescription(offerSDP);
for(var i=0;i<candidate.length;i++){
    otherPeer.addIceCandidate(candidate[i]);
}

otherPeer.ondatachannel = function (event) {
    console.log("otherPeer ondatachannel--------->")
    receiveChannel = event.channel;
    receiveChannel.onmessage = function (e) {
        console.log("otherPeer receive:" + e.data)
    };
    receiveChannel.onopen = function (e) {
        console.log("otherPeer receive:" + receiveChannel.readyState)
    };
    receiveChannel.onclose = function (e) {
        console.log("otherPeer receive:" + receiveChannel.readyState)
    };
};
otherPeerSendChannel = otherPeer.createDataChannel("sendDataChannel", {reliable: false});

otherPeer.onicecandidate = function (event) {
    console.log('peer ice callback');
    if (event.candidate) {
        console.log('event.candidate:' + event.candidate);
        peer.addIceCandidate(event.candidate);
        console.log('peer ICE candidate: \n' + event.candidate.candidate);
    }
}






//////////////////////////////////////////////////////////////////////////
//third step
//////////////////////////////////////////////////////////////////////////

otherPeer.createAnswer(function (answerSDP) {
    otherPeer.setLocalDescription(answerSDP);
    var answer = answerSDP;
    console.log("answerSDP:" + answer);
    // use XHR/WebSocket/etc. to exchange answer-sdp with "offerer"
    answerPeer(answer);
}, null, constraints);

function answerPeer(answer) {
    answerSDP = new RTCSessionDescription({sdp: answer.sdp, type: answer.type});
    peer.setRemoteDescription(answerSDP);
}
















/////////////////////////////////////////////////////////////////////////////
//http://www.html5rocks.com/en/tutorials/webrtc/basics/#toc-rtcdatachannel
//create dataChannel
/////////////////////////////////////////////////////////////////////////////

peer.ondatachannel = function (event) {
    receiveChannel = event.channel;
    receiveChannel.onmessage = function (event) {
        console.log("receive:" + event.data);
    };
};

peerSendChannel = peer.createDataChannel("sendDataChannel", {reliable: false});
peerSendChannel.onopen = function (e) {
    console.log("peerSendChannel receive:" + peerSendChannel.readyState)
};
peerSendChannel.onclose = function (e) {
    console.log("peerSendChannel receive:" + peerSendChannel.readyState)
};


otherPeer.ondatachannel = function (event) {
    receiveChannel = event.channel;
    receiveChannel.onmessage = function (e) {
        console.log("otherPeer receive:" + e.data)
    };
    receiveChannel.onopen = function (e) {
        console.log("otherPeer receive:" + receiveChannel.readyState)
    };
    receiveChannel.onclose = function (e) {
        console.log("otherPeer receive:" + receiveChannel.readyState)
    };
};
otherPeerSendChannel = otherPeer.createDataChannel("sendDataChannel", {reliable: false});

















