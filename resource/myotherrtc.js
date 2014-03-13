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
            localPeerConnection.addIceCandidate(event.candidate);
            trace('Remote ICE candidate: \n ' + event.candidate.candidate);
        }
    };
    remotePeerConnection.ondatachannel = function(event) {
        trace('Receive Channel Callback');
        receiveChannel = event.channel;
        receiveChannel.onmessage = function(event){trace('gotReceiveChannel:onmessage->'+event.data);};
        receiveChannel.onopen = function(){trace('gotReceiveChannel:onopen');}
        receiveChannel.onclose = function(){trace('gotReceiveChannel:onclose');}
    };

    localPeerConnection.createOffer(function(desc) {
        localPeerConnection.setLocalDescription(desc);
        trace('Offer from localPeerConnection \n' + desc.sdp);
        remotePeerConnection.setRemoteDescription(desc);
        remotePeerConnection.createAnswer(function(desc) {
            remotePeerConnection.setLocalDescription(desc);
            trace('Answer from remotePeerConnection \n' + desc.sdp);
            localPeerConnection.setRemoteDescription(desc);
        });
    });

}

function sendData(data) {
    sendChannel.send(data);
    trace('Sent data: ' + data);
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



