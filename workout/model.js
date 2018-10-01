require('es6-promise').polyfill();
require('isomorphic-fetch');
var cheerio = require('cheerio');
var brand = require('../data/brand').data;
const R = require('ramda');
var prefix = 'http://www.rudefix.dk';


let urls = R.map(R.prop('href'))(brand);

const request = require('request-promise');
const promises = urls.map(url => request(prefix+url));
Promise.all(promises).then(dataProcess);

function dataProcess(lists){
	console.log(lists[0]);
		return new Promise(function(resolve, reject) {
			if (lists) {
				var completed_requests = 0;
				var listData = [];
				lists.forEach(function(element) {
					var $ = cheerio.load(element);
					$('.twelve div').each(function(i, e1) {
//							console.log(e1);
						if (!(e1.attribs.class == 'underline-heading')) {								
							var obj = {};
							obj.name = e1.children[0].children[0].data;
							obj.href = e1.children[0].attribs.href;
							//element.models.push(obj);
							console.log(obj);
						}
					});
				});
				//if(lists.length == count){
					resolve("Stuff worked!");
			//	}										
			} else {
				console.log('not worked');
				reject(Error("It broke"));
			}
		});		
}

function logError(error){
	console.log(error);
}
