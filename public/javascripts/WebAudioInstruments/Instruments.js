var Drum = function (buffers)
{
    this.buffers = buffers;
    this.n_drummers = 1;
    this.size = 0;
    this.decay = 5;
    this.pitch = 2000;
    this.dynamics = 0;
};

Drum.prototype.play = function (time, drumIndex)
{
    this.source = audioContext.createBufferSource();
    this.source.buffer = this.buffers[drumIndex];
    this.source.connect(audioContext.destination);
    this.source.detune.value = (this.pitch - 2000);
    this.source.start(AudioContext.currentTime);
};

// function loadSnareSound() {
//     var localBuffer;
//     var url = 'http://localhost:3000/audio/snare0.wav';
//     var request = new XMLHttpRequest();
//     request.open('GET', url, true);
//     request.responseType = 'arraybuffer';
//
//     request.onload = function() {
//         audioContext.decodeAudioData(request.response, function(buffer) {
//             localBuffer = buffer;
//         }, function(e) {
//             console.log("Error in decoding audio data: " + e.err);
//         });
//     };
//     request.send();
//     return localBuffer;
// }