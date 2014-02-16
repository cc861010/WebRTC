/* See also:
    http://www.html5rocks.com/en/tutorials/webrtc/basics/
    https://code.google.com/p/webrtc-samples/source/browse/trunk/apprtc/index.html

    https://webrtc-demos.appspot.com/html/pc1.html
*/

//var cfg = {"iceServers":[{"url":"stun:23.21.150.121"}]},
var cfg = {"iceServers":[{"url":"stun:stun.l.google.com:19302"}]},
    con = { 'optional': [{'DtlsSrtpKeyAgreement': true}, {'RtpDataChannels': true }] };

/* THIS IS ALICE, THE CALLER/SENDER */

var pc1 = new RTCPeerConnection(cfg, con),
    dc1 = null, tn1 = null;

// Since the same JS file contains code for both sides of the connection,
// activedc tracks which of the two possible datachannel variables we're using.
var activedc;

var pc1icedone = false;

$('#showLocalOffer').modal('hide');
$('#getRemoteAnswer').modal('hide');
$('#waitForConnection').modal('hide');
$('#createOrJoin').modal('show');

$('#createBtn').click(function() {
    $('#showLocalOffer').modal('show');
});

$('#joinBtn').click(function() {
    $('#getRemoteOffer').modal('show');
});

$('#offerSentBtn').click(function() {
    $('#getRemoteAnswer').modal('show');
});

$('#offerRecdBtn').click(function() {
    var offer = $('#remoteOffer').val();
    var offerDesc = new RTCSessionDescription(JSON.parse(offer));
    console.log("Received remote offer", offerDesc);
    writeToChatLog("Received remote offer", "text-success");
    handleOfferFromPC1(offerDesc);
    $('#showLocalAnswer').modal('show');
});

$('#answerSentBtn').click(function() {
    $('#waitForConnection').modal('show');
});

$('#answerRecdBtn').click(function() {
    var answer = $('#remoteAnswer').val();
    var answerDesc = new RTCSessionDescription(JSON.parse(answer));
    handleAnswerFromPC2(answerDesc);
    $('#waitForConnection').modal('show');
});

$('#fileBtn').change(function() {
    var file = this.files[0];
    console.log(file);

    sendFile(file);
});

function fileSent(file) {
    console.log(file + " sent");
}

function fileProgress(file) {
    console.log(file + " progress");
}

function sendFile(data) {
    if (data.size) {
	FileSender.send({
	    file: data,
	    onFileSent: fileSent,
	    onFileProgress: fileProgress,
	});
    }
}
function sendMessage() {
    if ($('#messageTextBox').val()) {
	var channel = new RTCMultiSession();
        writeToChatLog($('#messageTextBox').val(), "text-success");
        channel.send({message: $('#messageTextBox').val()});
        $('#messageTextBox').val("");

        // Scroll chat text area to the bottom on new input.
        $('#chatlog').scrollTop($('#chatlog')[0].scrollHeight);
    }

    return false;
};

function setupDC1() {
    try {
        var fileReceiver1 = new FileReceiver();
        dc1 = pc1.createDataChannel('test', {reliable:true});
        activedc = dc1;
        console.log("Created datachannel (pc1)");
        dc1.onmessage = function (e) {
            console.log("Got message (pc1)", e.data);
            if (e.data.size) {
                fileReceiver1.receive(e.data, {});
            }
            else {
                var data = JSON.parse(e.data);
                if (data.type === 'file') {
                    fileReceiver1.receive(e.data, {});
                }
                else {
                    writeToChatLog(data.message, "text-info");
                    // Scroll chat text area to the bottom on new input.
                    $('#chatlog').scrollTop($('#chatlog')[0].scrollHeight);
                }
            }
        };
    } catch (e) { console.warn("No data channel (pc1)", e); }
}

getUserMedia({'audio':true, fake:true}, function (stream) {
    console.log("Got local audio", stream);
    pc1.addStream(stream);
    setupDC1();
    pc1.createOffer(function (offerDesc) {
        console.log("Created local offer", offerDesc);
        pc1.setLocalDescription(offerDesc);
        $('#localOffer').html(JSON.stringify(offerDesc));
    }, function () { console.warn("Couldn't create offer"); });
}, function () { console.warn("No audio"); });

pc1.onicecandidate = function (e) {
    console.log("ICE candidate (pc1)", e);
    if (e.candidate) {
        //handleCandidateFromPC1(e.candidate)
        if (!pc1icedone) {
            document.localICECandidateForm.localICECandidate.value = JSON.stringify(e.candidate);
            pc1icedone = true;
        }
    }
};

function handleOnconnection() {
    console.log("Datachannel connected");
    writeToChatLog("Datachannel connected", "text-success");
    $('#waitForConnection').modal('hide');
    // If we didn't call remove() here, there would be a race on pc2:
    //   - first onconnection() hides the dialog, then someone clicks
    //     on answerSentBtn which shows it, and it stays shown forever.
    $('#waitForConnection').remove();
    $('#showLocalAnswer').modal('hide');
    $('#messageTextBox').focus();
}

pc1.onconnection = handleOnconnection;

function handleAnswerFromPC2(answerDesc) {
    console.log("Received remote answer: ", answerDesc);
    writeToChatLog("Received remote answer", "text-success");
    pc1.setRemoteDescription(answerDesc);
}

function handleCandidateFromPC2(iceCandidate) {
    pc1.addIceCandidate(iceCandidate);
}


/* THIS IS BOB, THE ANSWERER/RECEIVER */

var pc2 = new RTCPeerConnection(cfg, con),
    dc2 = null;

var pc2icedone = false;

pc2.ondatachannel = function (e) {
    var fileReceiver2 = new FileReceiver();
    var datachannel = e.channel || e; // Chrome sends event, FF sends raw channel
    console.log("Received datachannel (pc2)", arguments);
    dc2 = datachannel;
    activedc = dc2;
    dc2.onmessage = function (e) {
        console.log("Got message (pc2)", e.data);
        if (e.data.size) {
            fileReceiver2.receive(e.data, {});
        }
        else {
            var data = JSON.parse(e.data);
            if (data.type === 'file') {
                fileReceiver2.receive(e.data, {});
            }
            else {
                writeToChatLog(data.message, "text-info");
                // Scroll chat text area to the bottom on new input.
                $('#chatlog').scrollTop($('#chatlog')[0].scrollHeight);
            }
        }
    };
};

function handleOfferFromPC1(offerDesc) {
    pc2.setRemoteDescription(offerDesc);
    pc2.createAnswer(function (answerDesc) {
        writeToChatLog("Created local answer", "text-success");
        console.log("Created local answer: ", answerDesc);
        pc2.setLocalDescription(answerDesc);
        $('#localAnswer').html(JSON.stringify(answerDesc));
    }, function () { console.warn("No create answer"); });
}

pc2.onicecandidate = function (e) {
    console.log("ICE candidate (pc2)", e);
    if (e.candidate)
        handleCandidateFromPC2(e.candidate);
};

function handleCandidateFromPC1(iceCandidate) {
    pc2.addIceCandidate(iceCandidate);
}

pc2.onaddstream = function (e) {
    console.log("Got remote stream", e);
    var el = new Audio();
    el.autoplay = true;
    attachMediaStream(el, e.stream);
};

pc2.onconnection = handleOnconnection;

function getTimestamp() {
    var totalSec = new Date().getTime() / 1000;
    var hours = parseInt(totalSec / 3600) % 24;
    var minutes = parseInt(totalSec / 60) % 60;
    var seconds = parseInt(totalSec % 60);

    var result = (hours < 10 ? "0" + hours : hours) + ":" +
                 (minutes < 10 ? "0" + minutes : minutes) + ":" +
                 (seconds  < 10 ? "0" + seconds : seconds);

    return result;
}

function writeToChatLog(message, message_type) {
    document.getElementById('chatlog').innerHTML += '<p class=\"' + message_type + '\">' + "[" + getTimestamp() + "] " + message + '</p>';
}
