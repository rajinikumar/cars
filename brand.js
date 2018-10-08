const request = require('request-promise');
var cheerio = require('cheerio');
var fs = require('fs');
var http = require('http');
const urls = ["http://www.rudefix.dk"];
var prefix = 'http://www.rudefix.dk';
const promises = urls.map(url => request(url));
var carlist = [];
var count = 1;

Promise.all(promises).then((data) => {
	var $ = cheerio.load(data[0]);
	$('.twelve li .brand-link').each(function(i, element) {
		var obj = {};
		obj.brand_id = count;
		obj.brand_name = element.children[0].data;
		obj.brand_url = prefix+element.attribs.href;
		//console.log(element.attribs.href);
		count++;
		carlist.push(obj);
		//console.log(element.children[0].data);
	});
	var stingJson= JSON.stringify(carlist);
	fs.writeFileSync('./async/data/brand.json', stingJson);
});
