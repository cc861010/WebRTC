var pc1, pc2, offer, answer;

pc1 = new webkitRTCPeerConnection(null,{optional: [{RtpDataChannels: true}]});
sendChannel = pc1.createDataChannel("sendDataChannel",{reliable: true});
sendChannel.onopen = function(event){console.log('sendChannel:onopen');};
sendChannel.onclose = function(event){console.log('sendChannel:onclose');};
sendChannel.onmessage = function(event){console.log('sendChannel:onmessage->'+event.data);};


pc2 = new webkitRTCPeerConnection(null,{optional: [{RtpDataChannels: true}]});
pc2.ondatachannel = function(event) {
    console.log('Receive Channel Callback');
    receiveChannel = event.channel;
    receiveChannel.onopen = function(){console.log('gotReceiveChannel:onopen');}
    receiveChannel.onclose = function(){console.log('gotReceiveChannel:onclose');}
    receiveChannel.onmessage = function(event){console.log('gotReceiveChannel:onmessage->'+event.data);};
};


pc1.onicecandidate = function(event) {
    if (event.candidate){ pc2.addIceCandidate(event.candidate); console.log("pc2.addIceCandidate"+ event.candidate.candidate)}
};

pc2.onicecandidate = function(event) {
    if (event.candidate){ pc1.addIceCandidate(event.candidate); console.log("pc1.addIceCandidate"+ event.candidate.candidate)}
};




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
    console.log("--------------------------------------------------------->")
}


pc1.createOffer(onOfferCreated, onError);