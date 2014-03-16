
pc1 = new webkitRTCPeerConnection(null,{optional: [{RtpDataChannels: true}]});
sendChannel = pc1.createDataChannel("sendDataChannel",{reliable: true});
sendChannel.onopen = function(event){console.log('sendChannel:onopen');};
sendChannel.onclose = function(event){console.log('sendChannel:onclose');};
sendChannel.onmessage = function(event){console.log('sendChannel:onmessage->'+event.data);};
signaling1.onMessage("addIceCandidate",function(e){
    var message = JSON.parse(e)
    if(message.candidate && message.candidate!=null){
        pc1.addIceCandidate(new RTCIceCandidate(message.candidate));
        console.log("pc1.addIceCandidate");
    }
})
signaling1.onMessage("setRemoteDescription",function(e){
    pc1.setRemoteDescription(new RTCSessionDescription(JSON.parse(e)), onPc1RemoteDescriptionSet, onError);
    console.log("pc1.setRemoteDescription");
});



pc2 = new webkitRTCPeerConnection(null,{optional: [{RtpDataChannels: true}]});
pc2.ondatachannel = function(event) {
    console.log('Receive Channel Callback');
    receiveChannel = event.channel;
    receiveChannel.onopen = function(){console.log('gotReceiveChannel:onopen');}
    receiveChannel.onclose = function(){console.log('gotReceiveChannel:onclose');}
    receiveChannel.onmessage = function(event){console.log('gotReceiveChannel:onmessage->'+event.data);};
};
signaling2.onMessage("addIceCandidate",function(e){
    var message = JSON.parse(e)
    if(message.candidate && message.candidate!=null){
        pc2.addIceCandidate(new RTCIceCandidate(message.candidate));
        console.log("pc1.addIceCandidate");
    }
})
signaling2.onMessage("setRemoteDescription",function(e){
   pc2.setRemoteDescription(new RTCSessionDescription(JSON.parse(e)), onPc2RemoteDescriptionSet, onError);
   console.log("pc2.setRemoteDescription");
});




pc1.onicecandidate = function(event) {
    if (event.candidate){
        //pc2.addIceCandidate(event.candidate);
        signaling2.emitMessage("addIceCandidate",JSON.stringify(event.candidate));
        //console.log("pc2.addIceCandidate"+ event.candidate.candidate)
    }
};

pc2.onicecandidate = function(event) {
    if (event.candidate){
        //pc1.addIceCandidate(event.candidate);
        signaling1.emitMessage("addIceCandidate",JSON.stringify(event.candidate));
        //console.log("pc1.addIceCandidate"+ event.candidate.candidate)
    }
};



function onOfferCreated(description) {
    pc1.setLocalDescription(description, onPc1LocalDescriptionSet(description), onError);
}
/////////////////////////////////////////////////////////////////////////////////////////
function onPc1LocalDescriptionSet(offer) {
    // after this function returns, pc1 will start firing icecandidate events
    //pc2.setRemoteDescription(offer, onPc2RemoteDescriptionSet, onError);
    signaling1.emitMessage("setRemoteDescription",JSON.stringify(offer));
}

function onPc2RemoteDescriptionSet() {
    pc2.createAnswer(onAnswerCreated, onError);
}

function onAnswerCreated(description) {
    pc2.setLocalDescription(description, onPc2LocalDescriptionSet(description), onError);
}
/////////////////////////////////////////////////////////////////////////////////////////
function onPc2LocalDescriptionSet(answer) {
    // after this function returns, you'll start getting icecandidate events on pc2
    //pc1.setRemoteDescription(answer, onPc1RemoteDescriptionSet, onError);
    signaling2.emitMessage("setRemoteDescription",JSON.stringify(answer));
}


function onError(err) {
    window.alert(err.message);
}
function onPc1RemoteDescriptionSet() {
    console.log("--------------------------------------------------------->")
}


pc1.createOffer(onOfferCreated, onError);