const request = require('request-promise');
var cheerio = require('cheerio');
var fs = require('fs');
var http = require('http');
var modelList = require('./json-data/models.json');
var x = 0;

//{"model_id":2,"name":"F type coupe","href":"http://www.rudefix.dk/bilrude/Jaguar/F-type-coupe/","brand_id":17,"brand_url":"http://www.rudefix.dk/bilrude/Jaguar/"}
var completed_requests = 0;
var yearList = [];
modelList.forEach(function(element) {
	var currentUrl = element.model_url;
	console.log(currentUrl)
	http.get(currentUrl, (resp) => { 

		let data = ''; 
		resp.on('data', (chunk) => {  
			data += chunk; 
		});
		resp.on('end', () => {
			var $ = cheerio.load(data);
			//let c = $('.twelve table tr');
			//console.log(c);
			//fs.writeFileSync('./json-data/year.json', c);
			$('.twelve table tr').each(function(i, e1) {
				var text = $(this).find('.year_contents').text();
				var gy = $(this).find('.btn').attr('href');
				var fy = `${currentUrl}${gy}`;
				var obj = {};
				obj.year = text;
				obj.href = fy;
				obj.model_id = element.model_id;
				obj.model_url = element.model_url;
				obj.brand_id = element.brand_id;
				obj.brand_url = element.brand_url;
				yearList.push(obj)
				//console.log(obj);	
						
			});

			//console.log(element);
			//wait(7000); 

			completed_requests++;

console.log(completed_requests +'=='+ modelList.length)
console.log(currentUrl);
			if (completed_requests == modelList.length) {
				var stingJson = JSON.stringify(yearList);
				fs.writeFileSync('./json-data/year.json', stingJson);
			}
		});

	}).on("error", (err) => { 
		console.log("Error: " + err.message);
	});

});

function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}