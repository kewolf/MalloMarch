/* Player */
var Player = function () {

    this.pitch1 = 500;
    this.pitch2 = 490;
    this.pitch3 = 510;
    this.x_pos = 0;
    this.volume = 1;
    this.echo = 0;
    this.ethereality = 0;
    this.glimmer = 0;
    this.shift = 0;

    //the output chain, starting from the destination, instruments connect to this.out
    this.mainGain = audioContext.createGain();
    this.mainGain.connect(audioContext.destination);

    this.muteGain = audioContext.createGain();
    this.muteGain.connect(this.mainGain);

    this.panner = audioContext.createPanner();
    this.panner.connect(this.muteGain);

    // Pitch shift copied from https://github.com/urtzurd/html-audio/blob/gh-pages/static/js/pitch-shifter.js
    this.hannWindow = function (length) {
        var window = new Float32Array(length);
        for (var i = 0; i < length; i++) {
            window[i] = 0.5 * (1 - Math.cos(2 * Math.PI * i / (length - 1)));
        }
        return window;
    };
    this.pitchShifterProcessor;
    var validGranSizes = [256, 512, 1024, 2048, 4096, 8192],
        grainSize = validGranSizes[1],
        // pitchRatio = 4.0,
        overlapRatio = 0.50,
        spectrumFFTSize = 128,
        spectrumSmoothing = 0.8,
        sonogramFFTSize = 2048,
        sonogramSmoothing = 0;

    if (audioContext.createScriptProcessor) {
        this.pitchShifterProcessor = audioContext.createScriptProcessor(grainSize, 1, 1);
    } else if (audioContext.createJavaScriptNode) {
        this.pitchShifterProcessor = audioContext.createJavaScriptNode(grainSize, 1, 1);
    }

    this.pitchShifterProcessor.buffer = new Float32Array(grainSize * 2);
    this.pitchShifterProcessor.grainWindow = this.hannWindow(grainSize);
    this.pitchShifterProcessor.pitchRatio = 4.0;
    this.pitchShifterProcessor.onaudioprocess = function (event) {
        var linearinterpolation = function (a, b, t) {
            return a + (b - a) * t;
        };

        var inputData = event.inputBuffer.getChannelData(0);
        var outputData = event.outputBuffer.getChannelData(0);

        for (i = 0; i < inputData.length; i++) {

            // Apply the window to the input buffer
            inputData[i] *= this.grainWindow[i];

            // Shift half of the buffer
            this.buffer[i] = this.buffer[i + grainSize];

            // Empty the buffer tail
            this.buffer[i + grainSize] = 0.0;
        }

        // Calculate the pitch shifted grain re-sampling and looping the input
        var grainData = new Float32Array(grainSize * 2);
        for (var i = 0, j = 0.0;
             i < grainSize;
             i++, j += this.pitchRatio) {

            var index = Math.floor(j) % grainSize;
            var a = inputData[index];
            var b = inputData[(index + 1) % grainSize];
            grainData[i] += linearinterpolation(a, b, j % 1.0) * this.grainWindow[i];
        }

        // Copy the grain multiple times overlapping it
        for (i = 0; i < grainSize; i += Math.round(grainSize * (1 - overlapRatio))) {
            for (j = 0; j <= grainSize; j++) {
                this.buffer[i + j] += grainData[j];
            }
        }

        // Output the first half of the buffer
        for (i = 0; i < grainSize; i++) {
            outputData[i] = this.buffer[i];
        }
    };
    //
    this.pitchShifterProcessor.connect(this.panner);

    // NRev
    this.nReverbGain = audioContext.createGain();
    this.nReverbGain.connect(this.pitchShifterProcessor);
    // this.nReverbGain.connect(this.panner);

    this.nReverb = audioContext.createConvolver();
    this.nReverb.connect(this.nReverbGain);

    this.nDryGain = audioContext.createGain();
    this.nDryGain.connect(this.pitchShifterProcessor);
    // this.nDryGain.connect(this.panner);

    // JCRev
    this.jcReverbGain = audioContext.createGain();
    this.jcReverbGain.connect(this.nDryGain);
    this.jcReverbGain.connect(this.nReverb);

    this.jcReverb = audioContext.createConvolver();
    this.jcReverb.connect(this.jcReverbGain);

    this.jcDryGain = audioContext.createGain();
    this.jcDryGain.connect(this.nDryGain);
    this.jcDryGain.connect(this.nReverb);

    // Echo
    this.delay = audioContext.createDelay();
    this.delay.delayTime.value = 0.5;

    this.feedback = audioContext.createGain();
    this.feedback.gain.value = 0.8;

    this.delay.connect(this.feedback);
    this.feedback.connect(this.delay);

    this.delayDry = audioContext.createGain();
    this.delayDry.connect(this.jcReverb);
    this.delayDry.connect(this.jcDryGain);
    this.delay.connect(this.jcReverb);
    this.delay.connect(this.jcDryGain);

    //create output for instruments to connect to
    this.out = audioContext.createGain();
    this.out.connect(this.delay);
    this.out.connect(this.delayDry);

    this.voice1 = new NumXVoice(this);
    this.voice2 = new NumXVoice(this);
    this.voice3 = new NumXVoice(this);

    // -1 is hard left 1 is hard right
    this.setPanPosition = function (position)
    {
        var x = position,
            y = 0,
            z = 1 - Math.abs(x);
        this.panner.setPosition(x,y,z);
    };

    // methods for muting and unmuting
    this.mute = function () {
        this.muteGain.gain.value = 0;
    };

    this.unmute = function () {
        this.muteGain.gain.value = 1;
    };

    this.setNReverbBuffer = function (buffer) {
        //console.log('loaded reverb impulse');
        this.nReverb.buffer = buffer;
    };

    this.setJcReverbBuffer = function (buffer) {
        //console.log('loaded reverb impulse');
        this.jcReverb.buffer = buffer;
    };

    this.schedule = function (time, params) {
        this.x_pos = parseFloat(params['x_pos']);
        console.log('x_pos: ' + this.x_pos);
        this.setPitch1(this.pitch1);
        this.setPitch2(this.pitch2);
        this.setPitch3(this.pitch3);
        this.voice1.play(time, params['velocity'], this);
        this.voice2.play(time, params['velocity'], this);
        this.voice3.play(time, params['velocity'], this);
        // this.env.on();
        //console.log("scheduled audio for time: " + time);
    };

// todo: needed for backward compatibility (for now)
    this.play = function (time) {
        this.schedule(time);
    };

    this.unschedule = function () {
        // this.voice1.stop();
        // this.voice2.stop();
        // this.voice3.stop();
    };

    this.getParameters = function () {
        var params = {};
        params['pitch1'] = this.pitch1;
        params['pitch2'] = this.pitch2;
        params['pitch3'] = this.pitch3;
        params['volume'] = this.volume;
        params['echo'] = this.echo;
        params['ethereality'] = this.ethereality;
        params['glimmer'] = this.glimmer;
        params['shift'] = this.shift;
        return params;
    };

    this.setParameters = function (params) {
        console.log(params);
        this.setPitch1(params['pitch1']);
        this.setPitch2(params['pitch2']);
        this.setPitch3(params['pitch3']);
        this.setVolume(params['volume']);
        this.setEcho(params['echo']);
        this.setEthereality(params['ethereality']);
        this.setGlimmer(params['glimmer']);
        this.setShift(params['shift']);
    };

    //setters for the individual parameters
    this.setPitch1 = function (pitch) {
        pitch = parseFloat(pitch);
        this.pitch1 = pitch;
        this.voice1.setPitch(pitch + this.x_pos);
    };
    this.setPitch2 = function(pitch) {
        pitch = parseFloat(pitch);
        this.pitch2 = pitch;
        this.voice2.setPitch(pitch + this.x_pos);
    };
    this.setPitch3 = function(pitch) {
        pitch = parseFloat(pitch);
        this.pitch3 = pitch;
        this.voice3.setPitch(pitch + this.x_pos);
    };
    this.setVolume = function(volume) {
        volume = parseFloat(volume);
        this.volume = volume;
        if (volume < 0.02) {
            this.mainGain.gain.value = 0;
        } else {
            this.mainGain.gain.value = volume;
        }
    };
    this.setEcho = function(val) {
        val = parseFloat(val);
        this.echo = val;
        this.delay.delayTime.value = val / 200.00;
    };
    this.setEthereality = function(val) {
        val = parseFloat(val);
        this.ethereality = val;
        this.nReverbGain.gain.value = val / 100.0;
        this.nDryGain.gain.value = 1 - (val / 100.0) * 0.5;
    };
    this.setGlimmer = function(val) {
        val = parseFloat(val);
        this.glimmer = val;
        this.jcReverbGain.gain.value = val / 100.0;
        this.jcDryGain.gain.value = 1 - (val / 100.0) * 0.5;
    };
    this.setShift = function(val) {
        val = parseFloat(val);
        this.shift = val;
        this.pitchShifterProcessor.pitchRatio = Math.pow(2,3*val/100.0-1);
    };
};