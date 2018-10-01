var cheerio = require('cheerio');
var fs = require('fs');
var http = require('http');
var brandList = require('./json-data/brand.json')

var completed_requests = 0;
modelList = [];
console.log(brandList);
console.log("console.log(brandList);");
brandList.forEach(function(element) {
	var currentUrl = element.brand_url;
	console.log(currentUrl);

	http.get(currentUrl, (resp) => { 
		let data = ''; 
		resp.on('data', (chunk) => {  
			data += chunk; 
		});
		resp.on('end', () => {
			//console.log(data);
			var $ = cheerio.load(data);
			completed_requests++;

			$('.twelve div').each(function(i, e1) {
				if (!(e1.attribs.class == 'underline-heading')) {					
					var obj = {};
					obj.model_id = i + 1;
					obj.name = e1.children[0].children[0].data;
					obj.model_url = currentUrl + e1.children[0].attribs.href;
					obj.brand_id = element.brand_id;
					obj.brand_url = element.brand_url;
					modelList.push(obj);
				}
			});

			if (completed_requests == brandList.length) {
				console.log("------------>" + completed_requests);
				var stingJson = JSON.stringify(modelList);
				fs.writeFileSync('./json-data/models.json', stingJson);
			}
		});

	}).on("error", (err) => { 
		console.log("Error: " + err.message);
	});

});