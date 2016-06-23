var Drum = function(buffer)
{
    this.buffer = buffer;
    this.amp = audioContext.createGain();
    this.amp.gain.value = 1.0;
    this.env = new WebAHDSR(audioContext, this.amp.gain);
    this.env.attackTime = 0.001;
    this.env.decayTime = 0.5;
    this.env.sustainValue = 0.0;

    this.play = function (time, player) {
        this.source = audioContext.createBufferSource();
        this.source.buffer = this.buffer;
        this.source.connect(this.amp);
        this.amp.connect(player.out);

        var randNum = Math.random();
        // apply parameters
        var randDetune = 0;
        var nDrummers = Math.ceil(player.nDrummers / 10.0);
        if (nDrummers > 1) {
            var range = player.nDrummers;
            randDetune = randNum * 2 * range - range;
        }

        //console.log('(player.drumPitch - 50)/100.0 * 2000 + randDetune: ' + ((player.drumPitch - 50)/100.0 * 2000 + randDetune));
        this.source.detune.value = (player.drumPitch - 50) / 100.0 * 2000 + randDetune;

        var dynamicsRatio = player.dynamics / 100.0;
        this.amp.gain.value = dynamicsRatio * randNum + (1 - dynamicsRatio);

        var decayBase = 100.0;
        var decayScaling = 3.0;
        this.env.decayTime = Math.pow(decayBase, player.decay / 100.0 - 1.0) * decayScaling;

        this.env.on();
        console.log("time: " + time);
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
    var nDrummers = Math.ceil(player.nDrummers / 10.0);
    for (var i = 0; i < Math.min(nDrummers, this.drums.length); i++)
    {
        var offset = 0;
        if (nDrummers > 1 && i > 0) {
            var range = nDrummers / 500.0;
            offset = Math.random() * 2 * range - range;
        }
        this.drums[i].play(time + offset, player);
    }
};

Drum_Corp.prototype.unschedule = function (player) {
    console.log('cancelling drum');
    if (this.drums != undefined) {
        for (var i = 0; i < Math.min(player.nDrummers, this.drums.length); i++) {
            if (this.drums[i].source != undefined)
                this.drums[i].source.stop();
        }

    }
};