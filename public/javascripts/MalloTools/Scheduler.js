var Scheduler = function (players) {
    self.preThreshold = 0.01 //schedule 20 ms in advance
    self.postThreshhold = 0.03 //30 ms after
    self.waitPeriod = 0.2 //
    self.players = players;
    self.curPredictions = [];
    self.lastPlayTime = []
    for (var i = 0; i < players.length; i++) {
        self.curPredictions.push(0);
        self.lastPlayTime = [];
    }
}

Scheduler.prototype.check = function () {
    for (var i = 0; i < players.length; i++) {
        var curTime = audioContext.currentTime;
        if (self.curPredictions[i] > curTime - self.preThreshold
            && self.curPredictions[i] < curTime + self.postThreshold
            && (curTime < self.lastPlayedTime[i]
            || curTime > self.lastPlayedTime[i] + self.waitPeriod)) {
            if (curTime < self.lastPlayedTime[i]) {
                players[i].unschedule();
            }
            players[i].schedule(self.curPredictions[i]);
            self.lastPlayedTime[i] = self.curPredictions[i];
        }
    }
}