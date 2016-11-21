var express = require('express');
var router = express.Router();


/* GET home page - right now our version1.jade file */
router.get('/', function (req, res, next) {
    res.render('version1', {title: 'MalLo March'});
});

router.get('/replay', function (req, res, next) {
    res.render('version2', {title: 'MalLo March Replay'});
});


router.get('/reid', function (req, res, next) {
    res.render('reid_playground', {title: 'playtime'});
});

router.get('/katie', function (req, res, next) {
    res.render('katie_playground', {title: 'playtime'});
});

router.get('/serverMasterControl', function (req, res, next) {
    res.render('server', {title: 'Server'});
});

router.get('/playbackControl', function (req, res, next) {
    res.render('playback', {title: 'Playback Controller'});
});

///* GET home page. */
//router.get('/version1', function(req, res, next) {
//  res.render('version1', { title: 'Version 1' });
//});

module.exports = router;
