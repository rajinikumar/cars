const request = require('request-promise');
var cheerio = require('cheerio');
var fs = require('fs');
var http = require('http');
var model = require('./data/model');
var modelList = model.data;
var x = 0;
/*var d = [];
for (i = 0; i < 43; i++) {
	var obj = {};
	obj.id = i + 1;
	obj.year = "";
	d.push(obj);
}

var stingJson = JSON.stringify(d);
fs.writeFileSync('./json/checkyear.json', stingJson);

return;*/

var completed_requests = 0;
modles = modelList[x].models;
console.log(modles);
modles.forEach(function(element) {
	var currentUrl = element.href;
	console.log(currentUrl)
	http.get(currentUrl, (resp) => { 
		element.years = [];

		let data = ''; 
		resp.on('data', (chunk) => {  
			data += chunk; 
		});
		resp.on('end', () => {
			var $ = cheerio.load(data);
			completed_requests++;

			$('.twelve table tr').each(function(i, e1) {
				var year = e1.children[0].children[0].children[0].data;
				var u = year.replace(/\s/g, '');
				var fu = `${currentUrl}${u}/`;
				console.log(element.name + '-------------------');
				console.log(fu);
				console.log(year);
				var obj = {};
				obj.year = year;
				obj.href = fu;
				element.years.push(obj);
			});

			console.log(element);
			wait(7000); 


			if (completed_requests == modles.length) {
				var stingJson = JSON.stringify(modles);
				fs.writeFileSync('./json/year.json', stingJson);
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