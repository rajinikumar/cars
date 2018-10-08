var cheerio = require('cheerio');
var fs = require('fs');
var async = require('async');
var brandList = require('./data/brand.json');
var request = require('request');
var modelList = [];
async.map(brandList, function(list, callback) {
    let url = list.brand_url;
    console.log(url);
    request(url, function(error, response, html) {
      // Some processing is happening here before the callback is invoked
      callback(error, {html,list});
    });
  }, function(err, results) {
    if (err) {
		// One of the iterations produced an error.
		// All processing will now stop.
		console.log('A file failed to process', result.err);
	} else {
		results.forEach(function(element, index) {
			var htmlList = element.html;
			var listData = element.list;
			var $ = cheerio.load(htmlList);
			$('.twelve div').each(function(i) {
				if (!((this).attribs.class == 'underline-heading')) {					
					var obj = {};
					obj.model_id = i;
					obj.name = (this).children[0].children[0].data;
					obj.model_url = listData.brand_url + (this).children[0].attribs.href;
					obj.brand_id = listData.brand_id;
					obj.brand_url = listData.brand_url;
					modelList.push(obj);
				}
			});
		});
		
		//console.log(modelList);
		console.log('All files have been processed successfully');
		var stingJson = JSON.stringify(modelList);
		fs.writeFileSync('./async/data/models.json', stingJson);
	}
  });