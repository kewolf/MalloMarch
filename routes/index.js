var express = require('express');
var router = express.Router();


/* GET home page - right now our version1.jade file */
router.get('/', function (req, res, next) {
    res.render('numXaudience', {title: 'Num X'});
});

router.get('/playerInterface', function (req, res, next) {
    res.render('numXperformer', {title: 'Num X Performer Interface'});
});

router.get('/conductorInterface', function (req, res, next) {
    res.render('numXconductor', {title: 'Num X Performer Interface'});
});

router.get('/v1', function (req, res, next) {
    res.render('version1', {title: 'MalLo March'});
});

router.get('/serverMasterControl', function (req, res, next) {
    res.render('server', {title: 'Server Master Control'});
});

router.get('/replay', function (req, res, next) {
    res.render('ICAD_MM_Playback', {title: 'MalLo March Replay'});
});

router.get('/playbackControl', function (req, res, next) {
    res.render('ICAD_MM_Playback_Controller', {title: 'Mallo March Playback Controller'});
});

router.get('/reid', function (req, res, next) {
    res.render('reid_playground', {title: 'playtime'});
});

router.get('/katie', function (req, res, next) {
    res.render('katie_playground', {title: 'playtime'});
});


///* GET home page. */
//router.get('/version1', function(req, res, next) {
//  res.render('version1', { title: 'Version 1' });
//});

module.exports = router;
