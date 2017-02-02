var express = require('express');
var router = express.Router();
var request = require('request');
var inClass = false;
var queryUrl = 'http://wasjustthinking.com/class.php';
var roster = [];
/* GET home page. */
router.get('/', function(req, res, next) {
	// roster = req.body.rosterUpdate;
	res.render('index', { title: 'DigitalCrafts Nov. Cohort'});
});

router.get('/rosterSearch', function(req, res, next) {
	res.render('rosterSearch', {title: 'Roster Search'})
});

router.post('/studentSearch', function(req, res, next) {
	var searchString = req.body.studentSearch;
	request.get(queryUrl, (error, response, searchData)=>{
		searchData = JSON.parse(searchData);
		// console.log(typeof(searchData))
		searchData.map((currName, index)=>{
			if(searchData.indexOf(searchString) > -1){
				inClass = true;
			}
		});
		res.render('studentSearch', {title: 'Search Results', searchString: searchString, inClass: inClass});
	});
});

module.exports = router;
