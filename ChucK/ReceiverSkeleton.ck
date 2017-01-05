OscRecv recv;
6449 => recv.port;
spork ~ recv.listen();

recv.event( "/left,   i,i,i, f,f,f,f, i, f,f,f,f,f" ) @=> OscEvent p1Event;
recv.event( "/middle, i,i,i, f,f,f,f, i, f,f,f,f,f" ) @=> OscEvent p2Event;
recv.event( "/right,  i,i,i, f,f,f,f, i, f,f,f,f,f" ) @=> OscEvent p3Event;


// SETUP UGENS:
SinOsc s => ADSR envs => Echo echos => NRev revs => JCRev jcs => PitShift ps => dac;
SinOsc t => ADSR envt => Echo echot => NRev revt => JCRev jct => PitShift pt => dac;
SinOsc u => ADSR envu => Echo echou => NRev revu => JCRev jcu => PitShift pu => dac;

//Parameters For Audience:
//Relative Pitch Bender
//Wave 1
800 => float pitchWave1; // Range 200 - 1000

//Placeholder
float pitchPerformer2; 

//Wave 2
1000 => float pitchWave2; // Range 200 - 1000

//Wave 3
1200 => float pitchWave3; // Range 200 - 1000

//Relative Volume Modifier 
//Wave 1
3000 => float gainWave1; // Range 3000 - 15000

//Wave 2
3000 => float gainWave2; // Range 3000 - 15000

//Wave 3 
3000 => float gainWave3; // Range 3000 - 15000

//Basic Echo 
0.2 => float becho;

//Rev Filter
0.0 => float revfil;

//JC Filter
1.0 => float jcfil;

//Pitch Shift 
0.0 => float pshift;



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
    
    envs.set(0.2:: second, 0.1:: second, 0.5, 0.1:: second); // Make all parameters for audience as well
    envt.set(0.2:: second, 0.1:: second, 0.5, 0.1:: second);
    envu.set(0.2:: second, 0.1:: second, 0.5, 0.1:: second);
    
    s.gain((message.getVelocity())/gainWave1); // Make these changable by audience
    t.gain((message.getVelocity())/gainWave2);
    u.gain((message.getVelocity())/gainWave3);
    
    message.getX() + pitchWave1 => s.freq; // Make these changable by audience
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
    
    pitchPerformer2 => s.freq;
    s.gain(0.5);
    100::ms => now;
    s.gain(0.0);
    
    message.printMessage();
}

function void playPerformer3(PerformerMessage message){
    // Code that makes sound for player 3 (left)
    // Use these get() methods to get the values from the message:
    // message.id(), message.getVelocity(), message.getX(), .getY(), .getX()
    
    Math.random2(80, 100) => Std.mtof => s.freq;
    s.gain(0.5);
    100::ms => now;
    s.gain(0.0);
    
    message.printMessage();
}
