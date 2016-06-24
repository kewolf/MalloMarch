var PitchedVoice = function () {
    this.adsrAmp = audioContext.createGain();
    this.adsrAmp.gain.value = 1.0;
    this.env = new WebAHDSR(audioContext, this.adsrAmp.gain);
    this.env.attackTime = 0.001;
    this.env.decayTime = 0.5;
    this.env.sustainValue = 0.0;

    this.lfoAmp = audioContext.createGain();
    this.lfoAmp.gain.value = 1.0;

    this.routeToLfoAmp = audioContext.createGain();
    this.routeToLfoAmp.gain.value = 1.0;

    this.dryAmp = audioContext.createGain();
    this.dryAmp.gain.value = 0.0;

    this.play = function (time, pitched, player, buffer) {
        this.source = audioContext.createBufferSource();
        this.source.buffer = buffer;
        this.source.connect(this.adsrAmp);
        this.adsrAmp.connect(this.routeToLfoAmp);
        this.routeToLfoAmp.connect(this.lfoAmp);
        this.lfoAmp.connect(player.out);
        this.dryAmp.connect(player.out);

        pitched.lfoOsc.connect(this.lfoAmp.gain);

        // apply parameters
        this.dryAmp.gain.value = 1.0 - player.vibrato / 100.0;
        this.lfoAmp.gain.value = player.vibrato / 100.0;

        var decayBase = 100.0;
        var decayScaling = 3.0;
        var minDecay = 0.1;
        this.env.decayTime = minDecay + Math.pow(decayBase, player.decay / 100.0 - 1.0) * decayScaling;

        this.env.on();
        this.source.start(AudioContext.currentTime);
    };

    this.stop = function () {
        this.source.stop();
    }
};

var Pitched = function () {
    this.lfoOsc = audioContext.createOscillator();
    this.lfoOsc.frequency.value = 5.0;
    this.lfoOsc.start();
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
    this.noteSequences[0] = [23, 26, 25, 28, 30, 31, 26];
    this.noteSequences[1] = [23, 35, 11, 18, 19, 14, 26, 21];
    this.noteSequences[2] = [17, 23, 15, 13, 11, 26];
    this.noteSequences[3] = [0, 8, 12, 20, 24];
    this.curNoteIndex = 0;


    this.addAudioSample = function (buffer, index) {
        this.buffers[index] = buffer;
    }

    Pitched.prototype.play = function (time, player) {

        this.curSequence = Math.floor(player.range / 25);
        console.log("curSequence: " + this.curSequence);
        this.curNoteIndex = (this.curNoteIndex + 1) % this.noteSequences[this.curSequence].length;

        this.voices[this.curVoice].play(time,
            this,
            player,
            this.buffers[this.noteSequences[this.curSequence][this.curNoteIndex]]);
        this.curVoice = (this.curVoice + 1) % this.nVoices;
    };

    this.unschedule = function () {
        this.voices[this.curVoice + (this.nVoices - 1) % nVoices].stop();
    }
};

