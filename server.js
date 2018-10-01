const request = require('request-promise');
var cheerio = require('cheerio');
var fs = require('fs');

var http = require('http');


/*
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
	fs.writeFileSync('./sample.json', stingJson);
});*/

var carlist = [{
	"id": 1,
	"name": "Alfa Romeo",
	"href": "/bilrude/Alfa-Romeo/"
}, {
	"id": 2,
	"name": "Audi",
	"href": "/bilrude/Audi/"
}, {
	"id": 3,
	"name": "BMW",
	"href": "/bilrude/BMW/"
}, {
	"id": 4,
	"name": "Chevrolet",
	"href": "/bilrude/Chevrolet/"
}, {
	"id": 5,
	"name": "Chrysler",
	"href": "/bilrude/Chrysler/"
}, {
	"id": 6,
	"name": "Citroën",
	"href": "/bilrude/Citroën/"
}, {
	"id": 7,
	"name": "Dacia",
	"href": "/bilrude/Dacia/"
}, {
	"id": 8,
	"name": "Daewoo",
	"href": "/bilrude/Daewoo/"
}, {
	"id": 9,
	"name": "DAF",
	"href": "/bilrude/DAF/"
}, {
	"id": 10,
	"name": "Daihatsu",
	"href": "/bilrude/Daihatsu/"
}, {
	"id": 11,
	"name": "Dodge",
	"href": "/bilrude/Dodge/"
}, {
	"id": 12,
	"name": "Fiat",
	"href": "/bilrude/Fiat/"
}, {
	"id": 13,
	"name": "Ford",
	"href": "/bilrude/Ford/"
}, {
	"id": 14,
	"name": "Honda",
	"href": "/bilrude/Honda/"
}, {
	"id": 15,
	"name": "Hyundai",
	"href": "/bilrude/Hyundai/"
}, {
	"id": 16,
	"name": "Iveco",
	"href": "/bilrude/Iveco/"
}, {
	"id": 17,
	"name": "Jaguar",
	"href": "/bilrude/Jaguar/"
}, {
	"id": 18,
	"name": "Jeep",
	"href": "/bilrude/Jeep/"
}, {
	"id": 19,
	"name": "Kia",
	"href": "/bilrude/Kia/"
}, {
	"id": 20,
	"name": "Land rover",
	"href": "/bilrude/Land-rover/"
}, {
	"id": 21,
	"name": "Lexus",
	"href": "/bilrude/Lexus/"
}, {
	"id": 22,
	"name": "Mazda",
	"href": "/bilrude/Mazda/"
}, {
	"id": 23,
	"name": "Mercedes",
	"href": "/bilrude/Mercedes/"
}, {
	"id": 24,
	"name": "Mini",
	"href": "/bilrude/Mini/"
}, {
	"id": 25,
	"name": "Mitsubishi",
	"href": "/bilrude/Mitsubishi/"
}, {
	"id": 26,
	"name": "Nissan",
	"href": "/bilrude/Nissan/"
}, {
	"id": 27,
	"name": "Opel",
	"href": "/bilrude/Opel/"
}, {
	"id": 28,
	"name": "Peugeot",
	"href": "/bilrude/Peugeot/"
}, {
	"id": 29,
	"name": "Porsche",
	"href": "/bilrude/Porsche/"
}, {
	"id": 30,
	"name": "Renault",
	"href": "/bilrude/Renault/"
}, {
	"id": 31,
	"name": "Rover",
	"href": "/bilrude/Rover/"
}, {
	"id": 32,
	"name": "Seat",
	"href": "/bilrude/Seat/"
}, {
	"id": 33,
	"name": "Skoda",
	"href": "/bilrude/Skoda/"
}, {
	"id": 34,
	"name": "Smart",
	"href": "/bilrude/Smart/"
}, {
	"id": 35,
	"name": "Ssang Yong",
	"href": "/bilrude/Ssang-Yong/"
}, {
	"id": 36,
	"name": "Subaru",
	"href": "/bilrude/Subaru/"
}, {
	"id": 37,
	"name": "Suzuki",
	"href": "/bilrude/Suzuki/"
}, {
	"id": 38,
	"name": "Saab",
	"href": "/bilrude/Saab/"
}, {
	"id": 39,
	"name": "Tesla",
	"href": "/bilrude/Tesla/"
}, {
	"id": 40,
	"name": "Toyota",
	"href": "/bilrude/Toyota/"
}, {
	"id": 41,
	"name": "Volvo",
	"href": "/bilrude/Volvo/"
}, {
	"id": 42,
	"name": "VW",
	"href": "/bilrude/VW/"
}, {
	"id": 43,
	"name": "x.div",
	"href": "/bilrude/x.div/"
}];

var prefix = 'http://www.rudefix.dk';
var urls = [];
/*carlist.forEach(function(data) {
	var url = prefix + data.href;
	urls.push(url);
})*/
/*var carlist = [{
	"id": 43,
	"name": "x.div",
	"href": "/bilrude/x.div/"
}];*/


var check = [];
var completed_requests = 0;
carlist.forEach(function(element) {
	var currentUrl = prefix + element.href;
	http.get(currentUrl, (resp) => { 
		element.models = [];

		let data = ''; 
		resp.on('data', (chunk) => {  
			data += chunk; 
		});
		resp.on('end', () => {
			var $ = cheerio.load(data);
			completed_requests++;

			$('.twelve div').each(function(i, e1) {
				if (e1.attribs.class == 'underline-heading') {
					//console.log(e1.children[0].children);
				} else {
					/*console.log("------------>" + currentUrl)
					console.log(e1.children[0].children);*/
					var obj = {};
					obj.name = e1.children[0].children[0].data;
					obj.href = currentUrl + e1.children[0].attribs.href;
					element.models.push(obj);
				}
			});

			if (completed_requests == carlist.length) {
				console.log("------------>" + completed_requests);
				var stingJson = JSON.stringify(carlist);
				fs.writeFileSync('./sample.json', stingJson);
			}

			/*check.sort(sortNumber);
			console.log(check);*/


		});

	}).on("error", (err) => { 
		console.log("Error: " + err.message);
	});

});

function sortNumber(a, b) {
	return a - b;
}
/*
const promises = urls.map(url => request(url));
Promise.all(promises).then((data) => {
	console.log("hello")
 var $ = cheerio.load(data[0]);
 var brand ;
 $('.twelve div').each(function(i, element) {
 	if(element.attribs.class =='underline-heading'){
 		console.log(element.children[0].children);
 	}
 	
		
	});
});
console.log(urls);*/