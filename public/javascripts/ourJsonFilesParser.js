/**
 * Created by kewolf on 1/5/17.
 */

// Information loaded from JSON files
var instrumentPresets = [];
var channelPresets = {};
var nPresetChannels = 0;
var nPresetInstruments = 0;


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
