const request = require('request-promise');
var cheerio = require('cheerio');
var fs = require('fs');
var http = require('http');
var yearList = require('./json-data/year.json');
var x = 0;

var completed_requests = 0;
var priceList = [];
yearList.forEach(function(element) {
	var currentUrl = element.year_url;
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
			$('.twelve table tr').each(function(num, e1) {
				if ( num % 2 == 0) {									
					var price = $(this).find('.product_description h2 b').text();
					var desc  = $(this).find('.product_description p').html();
					var obj = {};
					obj.price = price;
					obj.desc = desc;
					obj.model_id = element.model_id;
					obj.model_url = element.model_url;
					obj.brand_id = element.brand_id;
					obj.brand_url = element.brand_url;
					obj.year_url = currentUrl;
					priceList.push(obj) 
					console.log(obj);	
				}	
			});

			//console.log(element);
			//wait(7000); 

			completed_requests++;

console.log(completed_requests +'=='+ yearList.length)
			if (completed_requests == yearList.length) {
				var stingJson = JSON.stringify(priceList);
				fs.writeFileSync('./json-data/price.json', stingJson);
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