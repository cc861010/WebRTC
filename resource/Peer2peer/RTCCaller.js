var sendChannel, receiveChannel;

var signaling = new Signaling();

function trace(text) {
    console.log((performance.now() / 1000).toFixed(3) + ": " + text);
}

    var servers = null;
    /*
     * setup localPeerConnection
     */
    window.localPeerConnection = new webkitRTCPeerConnection(servers,{optional: [{RtpDataChannels: true}]});
    trace('Created local peer connection object localPeerConnection');
    sendChannel = localPeerConnection.createDataChannel("sendDataChannel",{reliable: false});
    trace('Created send data channel');
    localPeerConnection.onicecandidate = function(event) {
        trace('local ice callback');
        if (event.candidate) {
            //------------->
            signaling.emitMessage("candidate",event.candidate);
            //remotePeerConnection.addIceCandidate(event.candidate);
            trace('Local ICE candidate: \n' + event.candidate.candidate);
        }
    };
    signaling.onMessage("candidate",function(candidate){
        localPeerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    })

    sendChannel.onopen = function(event){trace('sendChannel:onopen');};
    sendChannel.onclose = function(event){trace('sendChannel:onclose');};
    sendChannel.onmessage = function(event){trace('sendChannel:onmessage->'+event.data);};


    localPeerConnection.createOffer(function(desc) {
//        localPeerConnection.setLocalDescription(desc);
//        trace('Offer from localPeerConnection \n' + desc.sdp);
//        //------------->
//        remotePeerConnection.setRemoteDescription(desc);
//        remotePeerConnection.createAnswer(function(desc) {
//            remotePeerConnection.setLocalDescription(desc);
//            trace('Answer from remotePeerConnection \n' + desc.sdp);
//            //------------->
//            localPeerConnection.setRemoteDescription(desc);
//        });
        signaling.onMessage("sdpAnswer",function(sdpAnswer){
            localPeerConnection.setLocalDescription(new RTCSessionDescription(JSON.parse(sdpAnswer)));
            trace('Offer from localPeerConnection \n' + desc.sdp);
            localPeerConnection.setRemoteDescription(new RTCSessionDescription(JSON.parse(sdpAnswer)));
        })
        signaling.emitMessage("sdpOffer",desc);
    });


/*
 * setup remotePeerConnection
 */
//    window.remotePeerConnection = new webkitRTCPeerConnection(servers,{optional: [{RtpDataChannels: true}]});
//    trace('Created remote peer connection object remotePeerConnection');
//    remotePeerConnection.onicecandidate = function(event) {
//        trace('remote ice callback');
//        if (event.candidate) {
//            //------------->
//            signaling.emit("candidate",event.candidate);
//            //localPeerConnection.addIceCandidate(event.candidate);
//            trace('Remote ICE candidate: \n ' + event.candidate.candidate);
//        }
//    };
//
//    remotePeerConnection.ondatachannel = function(event) {
//        trace('Receive Channel Callback');
//        receiveChannel = event.channel;
//        receiveChannel.onopen = function(){trace('gotReceiveChannel:onopen');}
//        receiveChannel.onclose = function(){trace('gotReceiveChannel:onclose');}
//        receiveChannel.onmessage = function(event){trace('gotReceiveChannel:onmessage->'+event.data);};
//    };
//
//
//    signaling.on("sdpOffer",function(desc){
//        remotePeerConnection.setRemoteDescription(desc);
//        remotePeerConnection.createAnswer(function(desc) {
//            remotePeerConnection.setLocalDescription(desc);
//            trace('Answer from remotePeerConnection \n' + desc.sdp);
//            signaling.emit("sdpAnswer",desc);
//        });
//    })





////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////


function sendDataToRemotePeer(data) {
    sendChannel.send(data);
    trace('localPeer Sent data: ' + data);
}
function sendDataToLocalPeer(data) {
    receiveChannel.send(data);
    trace('remoterPeer Sent data: ' + data);
}

function closeDataChannels() {
    trace('Closing data channels');
    sendChannel.close();
    trace('Closed data channel with label: ' + sendChannel.label);
    receiveChannel.close();
    trace('Closed data channel with label: ' + receiveChannel.label);
    localPeerConnection.close();
    remotePeerConnection.close();
    trace('Closed peer connections');
}



