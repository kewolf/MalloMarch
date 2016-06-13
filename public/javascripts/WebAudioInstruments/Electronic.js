var ElectronicVoice = function (player) {
    this.source = new WebDrum(audioContext);
    this.source.connect(player.out);
};

ElectronicVoice.prototype.play = function (time, param) {

    // todo: apply parameters e.g. envelope and param
    // todo: how to deal with time?
    this.source.trigger();
};

var Electronic = function (player) {
    this.curVoice = 0;
    this.nVoices = 2;
    this.voices = [];
    for (var i = 0; i < this.nVoices; i++) {
        this.voices[i] = new ElectronicVoice(player);
    }

    this.nSequences = 4;
    this.curSequence = 0;
    this.sequences = [];
    this.sequences[0] = [33, 36, 35, 38, 40, 41, 36];
    this.sequences[1] = [33, 36, 35, 38, 40, 41, 36];
    this.sequences[2] = [33, 36, 35, 38, 40, 41, 36];
    this.sequences[3] = [33, 36, 35, 38, 40, 41, 36];
    this.curNoteIndex = 0;
};

Electronic.prototype.play = function (time, player) {
    player.reverbGain.gain.value = player.size / 100.0;
    player.dryGain.gain.value = 1 - (player.size / 100.0) * 0.25;

    this.voices[this.curVoice].play(time,
        this.sequences[this.curSequence][this.curNoteIndex]);
    this.curVoice = (this.curVoice + 1) % this.nVoices;
    this.curNoteIndex = (this.curNoteIndex + 1) % this.sequences[this.curSequence].length;
};