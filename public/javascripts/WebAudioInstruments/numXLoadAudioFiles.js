var reverbPath = '/audio/reverbImpulses/Large_Wide_Echo_Hall.wav';
var reverbBasePath = '/audio/chuck_reverb_impulses/';
var jcImpulse = 'jcrev.wav';
var nImpulse = 'jcrev.wav';
var clickPath = '/audio/stick.wav';
var clickPath2 = '/audio/stick2.wav';

function loadAudioFiles(amIperformer) {

// get reverb impulses
    var jcrequest = new XMLHttpRequest();
    jcrequest.open('GET', reverbBasePath + jcImpulse, true);
    jcrequest.responseType = 'arraybuffer';
    jcrequest.onload = function () {
        audioContext.decodeAudioData(jcrequest.response, function (buffer) {
            for (var j = 0; j < nPlayers; j++) {
                players[j].setJcReverbBuffer(buffer);
            }
        }, function (e) {
            console.log("Error setting up the jcReverb buffer: " + e.err);
        });
    };
    jcrequest.send();

    var nrequest = new XMLHttpRequest();
    nrequest.open('GET', reverbBasePath + nImpulse, true);
    nrequest.responseType = 'arraybuffer';
    nrequest.onload = function () {
        audioContext.decodeAudioData(nrequest.response, function (buffer) {
            for (var j = 0; j < nPlayers; j++) {
                players[j].setNReverbBuffer(buffer);
            }
        }, function (e) {
            console.log("Error setting up the nReverb buffer: " + e.err);
        });
    };
    nrequest.send();

    // get metronome click
    if (amIperformer) {
        var clickRequest = new XMLHttpRequest();
        clickRequest.open('GET', clickPath, true);
        clickRequest.responseType = 'arraybuffer';
        clickRequest.onload = function () {
            audioContext.decodeAudioData(clickRequest.response, function (buffer) {
                metronome.setClick(buffer);
                console.log("Loaded metronome click");
            }, function (e) {
                console.log("Error setting up the reverb buffer: " + e.err);
            });
        };
        clickRequest.send();
    }

    // get metronome click
    if (amIperformer) {
        var clickRequest2 = new XMLHttpRequest();
        clickRequest2.open('GET', clickPath2, true);
        clickRequest2.responseType = 'arraybuffer';
        clickRequest2.onload = function () {
            audioContext.decodeAudioData(clickRequest2.response, function (buffer) {
                metronome.setClick2(buffer);
                console.log("Loaded metronome click");
            }, function (e) {
                console.log("Error setting up the reverb buffer: " + e.err);
            });
        };
        clickRequest2.send();
    }
}


