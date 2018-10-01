const request = require('request-promise');
var cheerio = require('cheerio');
var fs = require('fs');
var http = require('http');
var brand = require('./data/brand');

var carlist = brand.data;

var prefix = 'http://www.rudefix.dk';

var completed_requests = 0;
carlist.forEach(function(element) {
	var currentUrl = prefix + element.href;
	console.log(currentUrl);
	http.get(currentUrl, (resp) => { 
		element.models = [];

		let data = ''; 
		resp.on('data', (chunk) => {  
			data += chunk; 
		});
		resp.on('end', () => {
			//console.log(data);
			var $ = cheerio.load(data);
			completed_requests++;

			$('.twelve div').each(function(i, e1) {
				console.log(e1);
				if (!(e1.attribs.class == 'underline-heading')) {
					
					var obj = {};
					obj.name = e1.children[0].children[0].data;
					obj.href = currentUrl + e1.children[0].attribs.href;
					element.models.push(obj);
				}
			});

			if (completed_requests == carlist.length) {
				console.log("------------>" + completed_requests);
				var stingJson = JSON.stringify(carlist);
				fs.writeFileSync('./json/model1.json', stingJson);
			}
		});

	}).on("error", (err) => { 
		console.log("Error: " + err.message);
	});

});