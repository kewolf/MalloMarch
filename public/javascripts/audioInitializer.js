var audioContext;

var scheduler;
var syncClient;
var stayAwake;

//sequencer - used to play sounds at a specific interval
// NOT Synchronized
var sequencerID = 0;
var tutorialSequencer = 0;

//metronome - used to play sounds at a specific interval
// ALL Metronomes are synchronized with each other
var metronome;


// Infromation gathered loaded from JSON files
var instrumentPresets = [];
var channelPresets = {};
var nPresetChannels = 0;
var nPresetInstruments = 0;


//DOM elements we need:
//#notSupported


function setupAudio() {
    try {
        // Fix up for prefixing
        if (isAudioContextSupported()) {
            //console.log("Web Audio is supported!");
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
    } catch (e) {
        $('#notSupported').show();
        alert('You need webaudio support - try another browser or device');
    }
}


function isAudioContextSupported() {
    // This feature is still prefixed in Safari
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    return window.AudioContext;
}


function playSound(time) {
    //console.log("Play Sound");
    var beepGain = audioContext.createGain();
    var beepLevel = audioContext.createGain();
    beepLevel.gain.value = 0.4;
    var envelope = new WebAHDSR(audioContext, beepGain.gain);
    var oscillator = audioContext.createOscillator();
    oscillator.frequency.value = 400;
    oscillator.connect(beepGain);
    beepGain.connect(beepLevel);
    beepLevel.connect(audioContext.destination);
    envelope.on();
    oscillator.start(time);
    oscillator.stop(time + 0.5);    // you can set this to zero, but I left it here for testing.
}

function playSoundNow() {
    playSound(audioContext.currentTime);
}


function calcTimeOffset(serverTime, clientTime) {
    var receive_time = audioContext.currentTime;
    var instant_offset = serverTime / 1000.0 - (receive_time + clientTime) / 2;
    syncClient.addTimeOffset(instant_offset);
    // console.log("instant_offset: " + instant_offset + ", syncClient.getOffset(): " + syncClient.getOffset());
}


function schedulePrediction(address, time) {
    //todo: schedule the event
    var offset = syncClient.getOffset();
    var offset = syncClient.getOffset();
    var instr;
    if (address == "/left") {
        instr = 0;
    }
    if (address == "/middle") {
        instr = 1;
    }
    if (address == "/right") {
        instr = 2;
    }
    scheduler.curPredictions[instr] = (time / 1000.0) - offset;
    //console.log("diff: " + (scheduler.curPredictions[instr] - audioContext.currentTime));
    //console.log("currentTime: " + audioContext.currentTime + ", scheduler.curPredictions[instr]: " + scheduler.curPredictions[instr]);
}

// initalizes the time synchronizer and scheduler
function initSyncAndScheduler(socket, amIperformer, isSeqOn, logger) {
    syncClient = new SyncClient();
    if (syncClient != undefined) {
        console.log("syncClient is defined");

        if (amIperformer) {
            metronome.setSyncClient(syncClient);
        }

        scheduler = new Scheduler(players, audioContext, logger, syncClient);
    } else {
        console.log("syncClient is undefined");
    }
    var timeSyncInterval = 500;
    // starts time sync
    setInterval(function () {
        socket.emit('time_req', {
            clientTime: audioContext.currentTime,
        });
    }, timeSyncInterval);

    var schedulerInterval = 20;
    // checks scheduler
    setInterval(function () {
        //players[0].schedule(audioContext.currentTime+.5);
        scheduler.checkSchedule();
    }, schedulerInterval);

    if (isSeqOn) {
        switchSequencerOn(true);
    }

    stayAwake = setInterval(function () {
        //console.log("stay awake!");
        location.href = location.href; //try refreshing
        window.setTimeout(window.stop, 0); //stop it soon after
    }, 25000);

}

function getClientTime() {
    syncClient.getTime();
}

function switchSequencerOn(isOn) {
    if (isOn) {
        sequencerID = setInterval(function () {
            console.log('Timer, ' + tutorialSequencer);
            if (tutorialSequencer == 0) {
                scheduler.setPrediction(audioContext.currentTime + 0.01, 0);
            } else if (tutorialSequencer == 1) {
                scheduler.setPrediction(audioContext.currentTime + 0.01, 1);
            } else if (tutorialSequencer == 2) {
                scheduler.setPrediction(audioContext.currentTime + 0.01, 2);
            } else if (tutorialSequencer == 3) {
                //scheduler.setPrediction(audioContext.currentTime + 0.01, 0);
                //scheduler.setPrediction(audioContext.currentTime + 0.01, 1);
                //scheduler.setPrediction(audioContext.currentTime + 0.01, 2);
            }
            tutorialSequencer++;
            if (tutorialSequencer == 4) {
                tutorialSequencer = 0;
            }
        }, 500);
    } else {
        clearInterval(sequencerID);
    }
}

function setupMetronome(tempo) {
    metronome = new Metronome(audioContext);
    metronome.setTempo(tempo);
}

function switchMetronomeOn(isOn) {
    if (isOn) {
        // make sound
        ///metronome.stop();
        metronome.start();
        //console.log("Metro make sound");
    } else {
        //console.log("Metro stop makein sound");
        metronome.stop();
    }
}

function dontStayAwake() {
    clearInterval(stayAwake);
}


//Functions for Loading and parsing json files:

function loadInstrumentsfile(callback) {
    //console.log("load Instr File");
    var request = new XMLHttpRequest();
    //request.overrideMimeType("application/json");
    request.open('GET', '/json/instruments.json', true); // Replace 'my_data' with the path to your file
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(request.responseText);
        }
    };
    request.send(null);
}

function loadPresetsfile(callback) {
    //console.log("load Presets File");
    var request = new XMLHttpRequest();
    request.open('GET', '/json/channels.json', true);
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(request.responseText);
        }
    };
    request.send(null);
}


function parseInstruments(response) {
    //Parse JSON string into object
    instrumentPresets = JSON.parse(response);
    nPresetInstruments = 0;
    for (var inst in instrumentPresets) {
        nPresetInstruments++;
    }

}
function parseChannels(response) {
    var presetsJSON = JSON.parse(response);
    ch_index = 0;
    for (var channel in presetsJSON) {
        instr_index = 0;
        channelPresets[ch_index] = {}
        for (var instrument in presetsJSON[channel]) {
            //may not have to do this... access using variables names...
            channelPresets[ch_index][instr_index] = presetsJSON[channel][instrument];
            instr_index++;
        }
        ch_index++;
    }
    nPresetChannels = ch_index;
}
