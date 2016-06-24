var nSnares = 10;
var nMarimbaSamples = 61;
var nVibraphoneSamples = 37;

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
//     var marimbaRequests = [];
//     for (var k = 0; k < nMarimbaSamples; k++) {
//         var marimbaUrl = '/audio/Marimba/PatchArena_marimba-0' + (36 + k) + '.wav';
//         marimbaRequests[k] = new XMLHttpRequest();
//         marimbaRequests[k].open('GET', marimbaUrl, true);
//         marimbaRequests[k].responseType = 'arraybuffer';
//         marimbaRequests[k].k = k;
//         marimbaRequests[k].onload = function () {
//             var index = this.k;
//             audioContext.decodeAudioData(marimbaRequests[index].response, function (buffer) {
//                 for (var j = 0; j < nPlayers; j++) {
//                     players[j].pitched.addAudioSample(buffer, index);
//                 }
//             }, function (e) {
//                 console.log("Error in decoding audio data: " + e.err);
//             });
//         };
//         marimbaRequests[k].send();
//     }

    var vibraphoneRequests = [];
    for (var k = 0; k < nVibraphoneSamples; k++) {
        var vibraphoneUrl = '/audio/Vibraphone/vibraphone_' + (53 + k) + '.wav';
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
}


