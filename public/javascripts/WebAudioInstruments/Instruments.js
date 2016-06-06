/* Player */

var Player = function (drumBuffer, reverbBuffer) {

    //common to all
    this.size = 50;
    this.decay = 0;

    //drummers
    this.nDrummers = 0;
    this.drumPitch = 50;
    this.dynamics = 0;

    //pitched percussion
    this.range = 0;
    this.vibrato = 0;
    this.trippiness = 0;

    //electronic
    this.grunge = 0;
    this.electronicPitch = 0;
    this.fatness = 0;

    //other stuff
    this.activeInstrument = 0;
    this.drumIndex = 0;
    this.drum = new Drum(drumBuffer);
}

Player.prototype.play = function (time) {
    switch (this.activeInstrument) {
        case 0:
            this.drum.play(time, this);
            break;
        default:
            console.log("default Player play was reached");
    }
}

/* Drum Corp */

var Drum = function (buffers)
{
    this.buffers = buffers;
    this.n_drummers = 1;
    this.size = 0;
    this.decay = 5;
    this.pitch = 2000;
    this.dynamics = 0;
};

Drum.prototype.play = function (time, player)
{
    //var coinFlip = Math.floor(Math.random() * 2);
    //console.log("Coin flip = " + coinFlip);
    var coinFlip = 0;

    this.source = audioContext.createBufferSource();
    this.source.buffer = this.buffers[coinFlip];
    this.source.detune.value = (player.drumPitch - 50) * 2000;

    this.reverb = audioContext.createConvolver();
    this.reverb.buffer = player.reverbBuffer;

    this.reverbGain = audioContext.createGain();
    this.reverbGain.gain.value = player.size / 100.0;

    this.dryGain = audioContext.createGain();
    this.dryGain.gain.value = 1 - (player.size / 100.0) * 0.25;

    this.source.connect(this.reverb);
    this.reverb.connect(this.reverbGain);
    this.reverbGain.connect(audioContext.destination);

    this.source.connect(this.dryGain);
    this.dryGain.connect(audioContext.destination);
    console.log("this.reverbGain.gain.value" + this.reverbGain.gain.value);

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