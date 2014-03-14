/**

 var pc1, pc2, offer, answer;

 pc1 = new webkitRTCPeerConnection(null,{optional: [{RtpDataChannels: true}]});
 pc2 = new webkitRTCPeerConnection(null,{optional: [{RtpDataChannels: true}]});

 pc1.onicecandidate = function(event) {
    if (event.candidate) pc2.addIceCandidate(event.candidate);
};

 pc2.onicecandidate = function(event) {
    if (event.candidate) pc1.addIceCandidate(event.candidate);
};

 pc1.createOffer(onOfferCreated, onError);

 function onError(err) {
  window.alert(err.message);
}

 function onOfferCreated(description) {
  offer = description;
  pc1.setLocalDescription(offer, onPc1LocalDescriptionSet, onError);
}

 function onPc1LocalDescriptionSet() {
  // after this function returns, pc1 will start firing icecandidate events
  pc2.setRemoteDescription(offer, onPc2RemoteDescriptionSet, onError);
}

 function onPc2RemoteDescriptionSet() {
  pc2.createAnswer(onAnswerCreated, onError);
}

 function onAnswerCreated(description) {
  answer = description;
  pc2.setLocalDescription(answer, onPc2LocalDescriptionSet, onError);
}

 function onPc2LocalDescriptionSet() {
  // after this function returns, you'll start getting icecandidate events on pc2
  pc1.setRemoteDescription(answer, onPc1RemoteDescriptionSet, onError);
}

 function onPc1RemoteDescriptionSet() {
  window.alert('Yay, we finished signaling offers and answers');
}

 */














var sendChannel, receiveChannel;


function trace(text) {
    console.log((performance.now() / 1000).toFixed(3) + ": " + text);
}

function createConnection() {
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
            remotePeerConnection.addIceCandidate(event.candidate);
            trace('Local ICE candidate: \n' + event.candidate.candidate);
        }
    };
    sendChannel.onopen = function(event){trace('sendChannel:onopen');};
    sendChannel.onclose = function(event){trace('sendChannel:onclose');};
    sendChannel.onmessage = function(event){trace('sendChannel:onmessage->'+event.data);};
    /*
     * setup remotePeerConnection
     */
    window.remotePeerConnection = new webkitRTCPeerConnection(servers,{optional: [{RtpDataChannels: true}]});
    trace('Created remote peer connection object remotePeerConnection');
    remotePeerConnection.onicecandidate = function(event) {
        trace('remote ice callback');
        if (event.candidate) {
            //------------->
            localPeerConnection.addIceCandidate(event.candidate);
            trace('Remote ICE candidate: \n ' + event.candidate.candidate);
        }
    };
    remotePeerConnection.ondatachannel = function(event) {
        trace('Receive Channel Callback');
        receiveChannel = event.channel;
        receiveChannel.onopen = function(){trace('gotReceiveChannel:onopen');}
        receiveChannel.onclose = function(){trace('gotReceiveChannel:onclose');}
        receiveChannel.onmessage = function(event){trace('gotReceiveChannel:onmessage->'+event.data);};
    };

    localPeerConnection.createOffer(function(desc) {
        localPeerConnection.setLocalDescription(desc);
        trace('Offer from localPeerConnection \n' + desc.sdp);
        //------------->
        remotePeerConnection.setRemoteDescription(desc);
        remotePeerConnection.createAnswer(function(desc) {
            remotePeerConnection.setLocalDescription(desc);
            trace('Answer from remotePeerConnection \n' + desc.sdp);
            //------------->
            localPeerConnection.setRemoteDescription(desc);
        });
    });

}

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



