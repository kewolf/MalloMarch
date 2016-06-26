var Drum = function(buffer)
{
    this.buffer = buffer;
    this.envAmp = audioContext.createGain();
    this.envAmp.gain.value = 1.0;
    this.env = new WebAHDSR(audioContext, this.envAmp.gain);
    this.env.attackTime = 0.001;
    this.env.decayTime = 0.5;
    this.env.sustainValue = 0.0;

    this.dynamicsAmp = audioContext.createGain();
    this.nDrummersAmp = audioContext.createGain();

    this.play = function (time, drum_corp, player) {
        this.source = audioContext.createBufferSource();
        this.source.buffer = this.buffer;
        this.source.connect(this.envAmp);
        this.envAmp.connect(this.dynamicsAmp);
        this.dynamicsAmp.connect(this.nDrummersAmp);
        this.nDrummersAmp.connect(player.out);

        // apply parameters
        var randNum = Math.random();
        //this.source.detune.value = (player.drumPitch - 50) / 100.0 * 2000;
        this.source.playbackRate.value = 1 + (player.drumPitch / 100.00 - 1 / 2) / 1.5;

        var decayBase = 100.0;
        var decayScaling = 3.0;
        var minDecay = 0.1;
        this.env.decayTime = minDecay + Math.pow(decayBase, player.decay / 100.0 - 1.0) * decayScaling;

        var randVolRatio = 0.20;
        this.dynamicsAmp.gain.value = randVolRatio * randNum + (1 - randVolRatio);
        this.nDrummersAmp.gain.value = 1 - (drum_corp.nDrummers - 1) / 20;

        this.env.on();
        this.source.start(time);
    }
};

var Drum_Corp = function ()
{
    this.drums = [];
};

Drum_Corp.prototype.addDrum = function (buffer) {
    this.drums.push(new Drum(buffer));
};

Drum_Corp.prototype.play = function (time, player)
{
    if(player.dynamics > 1) {
        var range = Math.ceil(player.dynamics / 10.0);
        var high;
        var low;
        if (player.nDrummers + range / 2.0 > 10.0) {
            high = 10;
            low = 10 - (range - 1);
        } else if (player.nDrummers - range / 2.0 < 0) {
            high = 1 + (range - 1);
            low = 0;
        } else {
            high = Math.floor(player.nDrummers + range / 2.0);
            low = Math.ceil(nDrummer - range / 2.0);
        }
        this.nDrummers = low + Math.floor(Math.random() * (high - low));
    } else {
    this.nDrummers = Math.ceil(player.nDrummers / 10.0);
    }
    for (var i = 0; i < Math.min(this.nDrummers, this.drums.length); i++)
    {
        var offset = 0;
        if (this.nDrummers > 1 && i > 0) {
            var range = this.nDrummers / 500.0;
            offset = Math.random() * 2 * range - range;
        }
        this.drums[i].play(time + offset, this, player);
    }
};

Drum_Corp.prototype.unschedule = function (player) {
    console.log('cancelling drum');
    if (this.drums != undefined) {
        for (var i = 0; i < Math.min(this.nDrummers, this.drums.length); i++) {
            if (this.drums[i].source != undefined)
                this.drums[i].source.stop();
        }

    }
};