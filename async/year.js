var cheerio = require('cheerio');
var fs = require('fs');
var async = require('async');
var modelList = require('./data/models.json');
var request = require('request');
var yearList = [];
var errorList = [];
async.map(modelList, function(list, callback) {
    let url = list.model_url;
    console.log(url);
    request(url, function(error, response, html) {
      // Some processing is happening here before the callback is invoked
      callback(error, {html,list});
    });
  }, function(err, results) {
    if (err) {
		// One of the iterations produced an error.
		// All processing will now stop.
		console.log('A file failed to process', err);
	} else {
		results.forEach(function(element) {
			var htmlList = element.html;
			var listData = element.list;
			//console.log("listData -->" , listData);
			var $ = cheerio.load(htmlList);
			var title = $(".underline-heading h2").html();
			//console.log("title :" , title.toLowerCase())
			if(title && title.toLowerCase() == 'fejl!'){
				errorList.push(listData);
			} else {
				$('.twelve table tbody tr').each(function(i) {
					var text = $(this).find('.year_contents').text();
					var gy = $(this).find('.btn').attr('href');
					var fy = `${listData.model_url}${gy}`;
					var obj = {};
					obj.year_id = i;
					obj.year = text;
					obj.year_url = fy;
					obj.model_id = listData.model_id;
					obj.model_url = listData.model_url;
					obj.brand_id = listData.brand_id;
					obj.brand_url = listData.brand_url;
					//console.log(obj);
					yearList.push(obj);
				});
			}

		});
		
		//console.log(yearList);
		console.log("Total = ", results.length, "errorList--->" , errorList.length, "successList--->" , yearList.length);

		console.log('All files have been processed successfully');
		var stingJson = JSON.stringify(yearList);
		fs.writeFileSync('./async/data/years.json', stingJson);

		var errorListJson = JSON.stringify(errorList);
		fs.writeFileSync('./async/data/error-years.json', errorListJson);
	}
  });