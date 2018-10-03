const request = require('request-promise');
var cheerio = require('cheerio');
var fs = require('fs');
var http = require('http');
var yearList = require('./json-data/year.json');
var x = 0;
var count = 0;

var completed_requests = 0;
var priceList = [];
var errorList = [];
yearList.forEach(function (element) {
	var currentUrl = element.year_url;
	http.get(currentUrl, (resp) => {

		let data = '';
		resp.on('data', (chunk) => {
			data += chunk;
		});
		resp.on('end', () => {
			var $ = cheerio.load(data);
			//let c = $('.twelve table tr');

			$('.twelve table tr').each(function (num, e1) {
				if (num % 2 == 0) {
					var price = $(this).find('.product_description h2 b').text();
					var desc = $(this).find('.product_description p').html();
					var obj = {};
					obj.price_id = count;
					obj.price = price;
					obj.desc = desc;
					obj.year_id = element.year_id;
					obj.model_id = element.model_id;
					obj.model_url = element.model_url;
					obj.brand_id = element.brand_id;
					obj.brand_url = element.brand_url;
					obj.year_url = currentUrl;
					count++;
					priceList.push(obj)
				}
			});


			completed_requests++;

			console.log(completed_requests + '==' + yearList.length)
			if (completed_requests == yearList.length) {
				var stingJson = JSON.stringify(priceList);
				fs.writeFileSync('./json-data/price.json', stingJson);
				console.log("Error List below")
				console.log(JSON.stringify(errorList));

			}
		});

	}).on("error", (err) => {
		errorList.push(currentUrl);
		console.log(currentUrl)
		console.log("Error------------------------------------------------------------------------->>: " + err.message);

	});

});
