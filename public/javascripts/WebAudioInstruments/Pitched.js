var PitchedVoice = function () {
    this.amp = audioContext.createGain();
    this.amp.gain.value = 1.0;
    this.env = new WebAHDSR(audioContext, this.amp.gain);
    this.env.attackTime = 0.001;
    this.env.decayTime = 0.5;
    this.env.sustainValue = 0.0;
};

PitchedVoice.prototype.play = function (time, player, buffer) {
    this.source = audioContext.createBufferSource();
    this.source.buffer = buffer;
    this.source.connect(this.amp);
    this.amp.connect(player.out);

    // apply parameters
    this.env.attackTime = 0.01 + (player.decay / 100.0) * 2;
    this.env.on();
    this.source.start(AudioContext.currentTime);
};

PitchedVoice.prototype.stop = function () {
    this.source.stop();
}

var Pitched = function () {
    this.buffers = [];
    this.curVoice = 0;
    this.nVoices = 2;
    this.voices = [];
    for (var i = 0; i < this.nVoices; i++) {
        this.voices[i] = new PitchedVoice();
    }

    this.nSequences = 4;
    this.curSequence = 0;
    this.noteSequences = [];
    this.noteSequences[0] = [33, 36, 35, 38, 40, 41, 36];
    this.noteSequences[1] = [33, 36, 35, 38, 40, 41, 36];
    this.noteSequences[2] = [33, 36, 35, 38, 40, 41, 36];
    this.noteSequences[3] = [33, 36, 35, 38, 40, 41, 36];
    this.curNoteIndex = 0;
};

Pitched.prototype.addAudioSample = function (buffer, index) {
    this.buffers[index] = buffer;
}

Pitched.prototype.play = function (time, player) {

    this.voices[this.curVoice].play(time,
        player,
        this.buffers[this.noteSequences[this.curSequence][this.curNoteIndex]]);
    this.curVoice = (this.curVoice + 1) % this.nVoices;
    this.curNoteIndex = (this.curNoteIndex + 1) % this.noteSequences[this.curSequence].length;
};

Pitched.prototype.unschedule = function () {
    this.voices[this.curVoice + (this.nVoices - 1) % nVoices].stop();
}

