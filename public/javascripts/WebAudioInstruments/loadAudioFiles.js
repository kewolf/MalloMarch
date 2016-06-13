var nSnares = 10;
var nMarimbaSamples = 61;

function loadAudioFiles() {
    // get the snare samples from the server
    var requests = [];
    for (var i = 0; i < nSnares; i++) {
        var url = '/audio/snare' + i + '.wav';
        requests[i] = new XMLHttpRequest();
        requests[i].open('GET', url, true);
        requests[i].responseType = 'arraybuffer';
        requests[i].i = i;
        requests[i].onload = function () {
            console.log('loaded snare ' + i);
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
    request.open('GET', '/audio/reverb.wav', true);
    request.responseType = 'arraybuffer';
    request.onload = function () {
        console.log('loaded reverb impulse');
        audioContext.decodeAudioData(request.response, function (buffer) {
            for (var j = 0; j < nPlayers; j++) {
                players[j].setReverbBuffer(buffer);
            }
        }, function (e) {
            consolde.log("Error setting up the reverb buffer: " + e.err);
        });
    };
    request.send();

// get marimba samples
    var marimbaRequests = [];
    for (var i = 0; i < nMarimbaSamples; i++) {
        var marimbaUrl = '/audio/Marimba/PatchArena_marimba-0' + (36 + i) + '.wav';
        marimbaRequests[i] = new XMLHttpRequest();
        marimbaRequests[i].open('GET', marimbaUrl, true);
        marimbaRequests[i].responseType = 'arraybuffer';
        marimbaRequests[i].i = i;
        marimbaRequests[i].onload = function () {
            console.log('loaded marimba ' + i);
            var index = this.i;
            audioContext.decodeAudioData(marimbaRequests[index].response, function (buffer) {
                for (var j = 0; j < nPlayers; j++) {
                    players[j].pitched.addAudioSample(buffer, i);
                }
            }, function (e) {
                console.log("Error in decoding audio data: " + e.err);
            });
        };
        marimbaRequests[i].send();
    }
}


