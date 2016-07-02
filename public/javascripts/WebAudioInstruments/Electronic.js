var ElectronicVoice = function (electronic, player) {
    this.source = new WebDrum(audioContext);
    this.source.connect(player.out);
    electronic.modAmp.connect(this.source.tone.frequency);


    this.play = function (time, electronic, player) {

        // todo: apply parameters e.g. envelope and param
        // todo: how to deal with time?
        this.source.tone.frequency.value = electronic.drumFrequencies[Math.floor(player.fatness / 10.0)];
        this.source.noiseLevel.gain.value = player.grunge / 1000;
        this.source.noiseAmpEnv.decayTime = 0.01 + (player.decay / 100.0);
        this.source.toneAmpEnv.decayTime = 0.01 + (player.decay / 100.0) * 2;
        this.source.trigger();
    };

    this.stop = function () {
        this.source.stop();
    };

};

var Electronic = function (player) {

    this.baseFreq = 82.4069; // an e
    this.drumFrequencies =
        [this.baseFreq,
            this.baseFreq * 4.0 / 3.0,
            this.baseFreq * 3.0 / 2.0,
            this.baseFreq * 2,
            this.baseFreq * 2 * 4.0 / 3.0,
            this.baseFreq * 2 * 3.0 / 2.0,
            this.baseFreq * 3,
            this.baseFreq * 3 * 4.0 / 3.0,
            this.baseFreq * 3 * 3.0 / 2.0,
            this.baseFreq * 4
        ];
    this.curVoice = 0;
    this.nVoices = 2;
    this.voices = [];
    this.mod = audioContext.createOscillator();
    this.modAmp = audioContext.createGain();
    this.mod.connect(this.modAmp);
    this.mod.frequency.value = 400;
    this.mod.start(0);
    this.glideCounter = 0;

    for (var i = 0; i < this.nVoices; i++) {
        this.voices[i] = new ElectronicVoice(this, player);
    }

    //this.curSequence = 0;
    this.nSequences = 4;
    this.curSequence = Math.floor(player.electronicPitch / 10.0);
    this.sequences = [];
    this.sequences[0] = [0, 1, 2, 3];
    this.sequences[1] = [0, 7];
    this.sequences[2] = [0, 6, 1];
    this.sequences[3] = [0, 6, 7, 3];
    this.sequences[4] = [7, 6, 5, 4, 3, 1, 0];
    this.sequences[5] = [0, 0, 5, 1, 1, 3];
    this.sequences[6] = [1, 1, 4, 4, 3, 3, 7, 6];
    this.overtones = [2.0 / 3.0,            // 5th down?
        3.0 / 4.0,            // 4th down?
        1.0,                // unchanged
        4.0 / 3.0,            // 4th up
        3.0 / 2.0,            // 5th up
        2.0,                // octave up
        2.0 * 4.0 / 3.0,    // octave + 4th
        2.0 * 3.0 / 2.0];    // octave + 5th
    this.curNoteIndex = 0;


    this.play = function (time, player) {
        this.glideCounter = 0;
        this.curSequence = Math.floor(player.electronicPitch / (100.0 / this.sequences.length));
        this.curVoice = (this.curVoice + 1) % this.nVoices;
        this.curNoteIndex = (this.curNoteIndex + 1) % this.sequences[this.curSequence].length;

        this.modAmp.gain.value = 500 + player.grunge * 20;
        var newModFrequency = this.drumFrequencies[player.fatness - 1] * this.overtones[this.sequences[this.curSequence][this.curNoteIndex]];
        if (this.glideCounter % 3 == 0)
            this.mod.frequency.value = newModFrequency;
        else
            this.mod.frequency.setValueAtTime(newModFrequency, 0);
        this.glideCounter++;
        this.voices[this.curVoice].play(time, this, player);
    };


    // this.unschedule = function () {
    //     this.voices[this.curVoice + (this.nVoices - 1) % nVoices].stop();
    // };

};