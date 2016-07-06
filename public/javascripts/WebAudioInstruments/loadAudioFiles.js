var nSnares = 10;
var nVibraphoneSamples = 37;
var reverbPath = '/audio/reverbImpulses/Large_Wide_Echo_Hall.wav';
var clickPath = '/audio/stick.mp3';

function loadAudioFiles(amIperformer) {
    // get the snare samples from the server
    var requests = [];
    for (var i = 0; i < nSnares; i++) {
        var url = '/audio/snaresWav/snare' + i + '.wav';
        requests[i] = new XMLHttpRequest();
        requests[i].open('GET', url, true);
        requests[i].responseType = 'arraybuffer';
        requests[i].i = i;
        requests[i].onload = function () {
            var index = this.i;
            audioContext.decodeAudioData(requests[index].response, function (buffer) {
                var curSnare = "snare" + index;
                for (var j = 0; j < nPlayers; j++) {
                    players[j].drum_corp.addDrum(buffer);
                }
            }, function (e) {
                console.log("Error in decoding audio data: " + e.err);
            });
        };
        requests[i].send();
    }

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

    var vibraphoneRequests = [];
    for (var k = 0; k < nVibraphoneSamples; k++) {
        var vibraphoneUrl = '/audio/VibraphoneMp3/vibraphone_' + (53 + k) + '.mp3';
        vibraphoneRequests[k] = new XMLHttpRequest();
        vibraphoneRequests[k].open('GET', vibraphoneUrl, true);
        vibraphoneRequests[k].responseType = 'arraybuffer';
        vibraphoneRequests[k].k = k;
        vibraphoneRequests[k].onload = function () {
            var index = this.k;
            audioContext.decodeAudioData(vibraphoneRequests[index].response, function (buffer) {
                for (var j = 0; j < nPlayers; j++) {
                    players[j].pitched.addAudioSample(buffer, index);
                }
            }, function (e) {
                console.log("Error in decoding audio data: " + e.err);
            });
        };
        vibraphoneRequests[k].send();
    }

    var vibraphoneRevRequests = [];
    for (var k = 0; k < nVibraphoneSamples; k++) {
        var vibraphoneRevUrl = '/audio/reverseVibMp3/vibraphone_' + (53 + k) + '_rev.mp3';
        vibraphoneRevRequests[k] = new XMLHttpRequest();
        vibraphoneRevRequests[k].open('GET', vibraphoneRevUrl, true);
        vibraphoneRevRequests[k].responseType = 'arraybuffer';
        vibraphoneRevRequests[k].k = k;
        vibraphoneRevRequests[k].onload = function () {
            var index = this.k;
            audioContext.decodeAudioData(vibraphoneRevRequests[index].response, function (buffer) {
                for (var j = 0; j < nPlayers; j++) {
                    players[j].pitched.addReverseAudioSample(buffer, index);
                }
            }, function (e) {
                console.log("Error in decoding audio data: " + e.err);
            });
        };
        vibraphoneRevRequests[k].send();
    }
}


