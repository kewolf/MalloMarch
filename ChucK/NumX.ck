OscRecv recv;
6449 => recv.port;
spork ~ recv.listen();

recv.event( "/left,   i,i,i, f,f,f,f, i, f,f,f,f,f" ) @=> OscEvent p1Event;
recv.event( "/middle, i,i,i, f,f,f,f, i, f,f,f,f,f" ) @=> OscEvent p2Event;
recv.event( "/right,  i,i,i, f,f,f,f, i, f,f,f,f,f" ) @=> OscEvent p3Event;


// SETUP UGENS:
SinOsc s => Pan2 a => ADSR envs => Echo echos => NRev revs => JCRev jcs => PitShift ps => dac; //Performer 1 Waves
SinOsc t => Pan2 b => ADSR envt => Echo echot => NRev revt => JCRev jct => PitShift pt => dac;
SinOsc u => Pan2 c => ADSR envu => Echo echou => NRev revu => JCRev jcu => PitShift pu => dac;

SinOsc v => Pan2 d => ADSR envv => Echo echov => NRev revv => JCRev jcv => PitShift pv => dac; //Performer 2 Waves
SinOsc w => Pan2 e => ADSR envw => Echo echow => NRev revw => JCRev jcw => PitShift pw => dac;
SinOsc x => Pan2 f => ADSR envx => Echo echox => NRev revx => JCRev jcx => PitShift px => dac;

SinOsc y => Pan2 g => ADSR envy => Echo echoy => NRev revy => JCRev jcy => PitShift py => dac; //Performer 3 Waves 
SinOsc z => Pan2 h => ADSR envz => Echo echoz => NRev revz => JCRev jcz => PitShift pz => dac;
SinOsc r => Pan2 i => ADSR envr => Echo echor => NRev revr => JCRev jcr => PitShift pr => dac;


//PARAMETERS FOR AUDIENCE

//Relative Pitch Bender - Called "Pitch"
//Performer 1
//Wave 1
130.813 => float pitchWave1; // Range 200 - 1000

//Wave 2
155.563 => float pitchWave2; // Range 200 - 1000

//Wave 3
195.998 => float pitchWave3; // Range 200 - 1000

//Performer 2
//Wave 1 
261.626 => float pitchWave4; // Range 200 - 1000

//Wave 2
311.127 => float pitchWave5; // Range 200 - 1000

//Wave 3
391.995 => float pitchWave6; // Range 200 - 1000

//Performer 3
//Wave 1 
523.251 => float pitchWave7; // Range 200 - 1000

//Wave 2
622.254 => float pitchWave8; // Range 200 - 1000

//Wave 3
783.991 => float pitchWave9; // Range 200 - 1000



//Relative Volume Modifier - Called "Volume"
//Performer 1
//Wave 1
500 => float gainWave1; // Range 0 - 5000

//Wave 2
500 => float gainWave2; // Range 0 - 5000

//Wave 3 
500 => float gainWave3; // Range 0 - 5000

//Performer 2
//Wave 1
500 => float gainWave4; // Range 0 - 5000

//Wave 2
500 => float gainWave5; // Range 0 - 5000

//Wave 3 
500 => float gainWave6; // Range 0 - 5000

//Performer 3
//Wave 1
500 => float gainWave7; // Range 0 - 5000

//Wave 2
500 => float gainWave8; // Range 0 - 5000

//Wave 3 
500 => float gainWave9; // Range 0 - 5000



//Basic Echo // Range 0 - 1 Called "Echo" 
//Performer 1
0.2 => float becho;

//Performer 2
0.2 => float becho2;

//Performer 3
0.2 => float becho3;

//Rev Filter // Range 0 - 1 Called "Ethereality"
//Performer 1 
1.0 => float revfil;

//Performer 2
1.0 => float revfil2;

//performer 3
1.0 => float revfil3;


//JC Filter // Range 0 - 1 Called "Glimmer"
//Performer 1
0.0 => float jcfil;

//Performer 2
0.0 => float jcfil2;

//Performer 3
0.0 => float jcfil3;

//Pitch Shift Range 0.5 - 4.0; 0.0 = no shift - Called "Shift"
//Performer 1
0.0 => float pshift;

//Performer 2
0.0 => float pshift2;

//Performer 3
0.0 => float pshift3; 

//Panning (NOT FOR AUDIENCE!!!)
-0.5 => float panPerformer1;
0.0 => float panPerformer2; 
0.5 => float panPerformer3;


// Spork the event listeners
spork ~ listenPerformer1(p1Event);
spork ~ listenPerformer2(p2Event);
spork ~ listenPerformer3(p3Event);

while(true){
    0.05::second => now;
}

function void listenPerformer1(OscEvent event){
    while (true) {
        event => now;
        PerformerMessage message;
        <<< "Player 1 Message" >>>;
        message.loadEvent(event);
        spork ~ playPerformer1(message);
        1::ms => now;
    }
}

function void listenPerformer2(OscEvent event){
    while (true) {
        event => now;
        PerformerMessage message;
        <<< "Player 2 Message" >>>;
        message.loadEvent(event);
        spork ~ playPerformer2(message);
        1::ms => now;
    }
}

function void listenPerformer3(OscEvent event){
    while (true) {
        event => now;
        PerformerMessage message;
        <<< "Player 3 Message" >>>;
        message.loadEvent(event);
        spork ~ playPerformer3(message);
        1::ms => now;
    }
}

function void playPerformer1(PerformerMessage message){
    // Code that makes sound for player 1 (left)
    // Use these get() methods to get the values from the message:
    // message.id(), message.getVelocity(), message.getX(), .getY(), .getX()
    
    panPerformer1 => a.pan; //Performer 1 panning 
    panPerformer1 => b.pan;
    panPerformer1 => c.pan;
    
    envs.set(0.2:: second, 0.1:: second, 0.5, 0.1:: second); 
    envt.set(0.2:: second, 0.1:: second, 0.5, 0.1:: second);
    envu.set(0.2:: second, 0.1:: second, 0.5, 0.1:: second);
    
    s.gain((message.getVelocity())/gainWave1); 
    t.gain((message.getVelocity())/gainWave2);
    u.gain((message.getVelocity())/gainWave3);
    
    message.getX() + pitchWave1 => s.freq; 
    message.getX() + pitchWave2 => t.freq;
    message.getX() + pitchWave3 => u.freq;
    
    echos.delay(becho:: second); // 0 to 0.5
    echot.delay(becho:: second);
    echou.delay(becho:: second);
    
    revs.mix(revfil); // 0 to 1
    revt.mix(revfil);
    revu.mix(revfil);
    
    jcs.mix(jcfil); // 0 to 1
    jct.mix(jcfil);
    jcu.mix(jcfil);
    
    ps.shift(pshift); //0.5 to 4.0
    pt.shift(pshift);
    pu.shift(pshift);
    
    1 => envs.keyOn;
    1 => envt.keyOn;
    1 => envu.keyOn;
    0.1:: second => now;
    1 => envs.keyOff;
    1 => envt.keyOff;
    1 => envu.keyOff;
    
    message.printMessage();
}

function void playPerformer2(PerformerMessage message){
    // Code that makes sound for player 2 (left)
    // Use these get() methods to get the values from the message:
    // message.id(), message.getVelocity(), message.getX(), .getY(), .getX()
    
    panPerformer2 => d.pan; //Performer 2 panning 
    panPerformer2 => e.pan;
    panPerformer2 => f.pan;
    
    envs.set(0.2:: second, 0.1:: second, 0.5, 0.1:: second); 
    envt.set(0.2:: second, 0.1:: second, 0.5, 0.1:: second);
    envu.set(0.2:: second, 0.1:: second, 0.5, 0.1:: second);
    
    v.gain((message.getVelocity())/gainWave4); 
    w.gain((message.getVelocity())/gainWave5);
    x.gain((message.getVelocity())/gainWave6);
    
    message.getX() + pitchWave4 => v.freq; 
    message.getX() + pitchWave5 => w.freq;
    message.getX() + pitchWave6 => x.freq;
    
    echov.delay(becho2:: second); // 0 to 0.5
    echow.delay(becho2:: second);
    echox.delay(becho2:: second);
    
    revv.mix(revfil2); // 0 to 1
    revw.mix(revfil2);
    revx.mix(revfil2);
    
    jcv.mix(jcfil2); // 0 to 1
    jcw.mix(jcfil2);
    jcx.mix(jcfil2);
    
    pv.shift(pshift2); //0.5 to 4.0
    pw.shift(pshift2);
    px.shift(pshift2);
    
    1 => envs.keyOn;
    1 => envt.keyOn;
    1 => envu.keyOn;
    0.1:: second => now;
    1 => envs.keyOff;
    1 => envt.keyOff;
    1 => envu.keyOff;
    
    message.printMessage();
}

function void playPerformer3(PerformerMessage message){
    // Code that makes sound for player 3 (left)
    // Use these get() methods to get the values from the message:
    // message.id(), message.getVelocity(), message.getX(), .getY(), .getX()
    
    panPerformer3 => g.pan; //Performer 3 panning 
    panPerformer3 => h.pan;
    panPerformer3 => i.pan;
    
    envs.set(0.2:: second, 0.1:: second, 0.5, 0.1:: second); // Make all parameters for audience as well
    envt.set(0.2:: second, 0.1:: second, 0.5, 0.1:: second);
    envu.set(0.2:: second, 0.1:: second, 0.5, 0.1:: second);
    
    y.gain((message.getVelocity())/gainWave7); 
    z.gain((message.getVelocity())/gainWave8);
    r.gain((message.getVelocity())/gainWave9);
    
    message.getX() + pitchWave7 => y.freq; 
    message.getX() + pitchWave8 => z.freq;
    message.getX() + pitchWave9 => r.freq;
    
    echoy.delay(becho3:: second); // 0 to 0.5
    echoz.delay(becho3:: second);
    echor.delay(becho3:: second);
    
    revy.mix(revfil3); // 0 to 1
    revz.mix(revfil3);
    revr.mix(revfil3);
    
    jcy.mix(jcfil3); // 0 to 1
    jcz.mix(jcfil3);
    jcr.mix(jcfil3);
    
    py.shift(pshift3); //0.5 to 4.0
    pz.shift(pshift3);
    pr.shift(pshift3);
    
    1 => envs.keyOn;
    1 => envt.keyOn;
    1 => envu.keyOn;
    0.1:: second => now;
    1 => envs.keyOff;
    1 => envt.keyOff;
    1 => envu.keyOff;
    
    message.printMessage();
}