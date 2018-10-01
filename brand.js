const request = require('request-promise');
var cheerio = require('cheerio');
var fs = require('fs');
var http = require('http');
const urls = ["http://www.rudefix.dk"];
const promises = urls.map(url => request(url));
var carlist = [];
Promise.all(promises).then((data) => {
	var $ = cheerio.load(data[0]);
	$('.twelve li .brand-link').each(function(i, element) {
		var obj = {};
		obj.id = i + 1;
		obj.name = element.children[0].data;
		obj.href = element.attribs.href;
		//console.log(element.attribs.href);
		carlist.push(obj);
		//console.log(element.children[0].data);
	});
	var stingJson= JSON.stringify(carlist);
	fs.writeFileSync('./json/brand1.json', stingJson);
});