var express = require('express');
var router = express.Router();


/* GET home page - right now our version1.jade file */
router.get('/', function (req, res, next) {
    res.render('version1', {title: 'Version 1'});
});

///* GET home page. */
//router.get('/version1', function(req, res, next) {
//  res.render('version1', { title: 'Version 1' });
//});

module.exports = router;
