var sendChannel, receiveChannel;

var startButton = document.getElementById("startButton");
var sendButton = document.getElementById("sendButton");
var closeButton = document.getElementById("closeButton");
startButton.disabled = false;
sendButton.disabled = true;
closeButton.disabled = true;
startButton.onclick = createConnection;
sendButton.onclick = sendData;
closeButton.onclick = closeDataChannels;

function trace(text) {
    console.log((performance.now() / 1000).toFixed(3) + ": " + text);
}

function createConnection() {
    var servers = null;
    window.localPeerConnection = new webkitRTCPeerConnection(servers,{optional: [{RtpDataChannels: true}]});
    trace('Created local peer connection object localPeerConnection');
    sendChannel = localPeerConnection.createDataChannel("sendDataChannel",{reliable: false});
    trace('Created send data channel');
    localPeerConnection.onicecandidate = gotLocalCandidate;
    sendChannel.onopen = handleSendChannelStateChange;
    sendChannel.onclose = handleSendChannelStateChange;

    window.remotePeerConnection = new webkitRTCPeerConnection(servers,{optional: [{RtpDataChannels: true}]});
    trace('Created remote peer connection object remotePeerConnection');
    remotePeerConnection.onicecandidate = gotRemoteIceCandidate;
    remotePeerConnection.ondatachannel = gotReceiveChannel;

    localPeerConnection.createOffer(gotLocalDescription);

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
    localPeerConnection = null;
    remotePeerConnection = null;
    trace('Closed peer connections');
}

function gotLocalDescription(desc) {
    localPeerConnection.setLocalDescription(desc);
    trace('Offer from localPeerConnection \n' + desc.sdp);
    remotePeerConnection.setRemoteDescription(desc);
    remotePeerConnection.createAnswer(gotRemoteDescription);
}

function gotRemoteDescription(desc) {
    remotePeerConnection.setLocalDescription(desc);
    trace('Answer from remotePeerConnection \n' + desc.sdp);
    localPeerConnection.setRemoteDescription(desc);
}

function gotLocalCandidate(event) {
    trace('local ice callback');
    if (event.candidate) {
        remotePeerConnection.addIceCandidate(event.candidate);
        trace('Local ICE candidate: \n' + event.candidate.candidate);
    }
}

function gotRemoteIceCandidate(event) {
    trace('remote ice callback');
    if (event.candidate) {
        localPeerConnection.addIceCandidate(event.candidate);
        trace('Remote ICE candidate: \n ' + event.candidate.candidate);
    }
}

function gotReceiveChannel(event) {
    trace('Receive Channel Callback');
    receiveChannel = event.channel;
    receiveChannel.onmessage = function(event){trace('Received message: ' + event.data);};
    receiveChannel.onopen = function(){trace('Send channel state is: ' + sendChannel.readyState);};
    receiveChannel.onclose = function(){trace('Send channel state is: ' + sendChannel.readyState);};
}

