var reverbPath = '/audio/reverbImpulses/Large_Wide_Echo_Hall.wav';
var clickPath = '/audio/stick.mp3';

function loadAudioFiles(amIperformer) {

// get reverb impulse
    var request = new XMLHttpRequest();
    request.open('GET', reverbPath, true);
    request.responseType = 'arraybuffer';
    request.onload = function () {
        audioContext.decodeAudioData(request.response, function (buffer) {
            for (var j = 0; j < nPlayers; j++) {
                players[j].setReverbBuffer(buffer);
            }
        }, function (e) {
            console.log("Error setting up the reverb buffer: " + e.err);
        });
    };
    request.send();

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
}


