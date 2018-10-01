var html2json = require('html2json').html2json;
var fs = require('fs');
var R = require('ramda');

var test = `<div style="clear:both;"><div class="brand-container"><div class="alpha-letter">A</div><div><ul class="unstyled" style="margin:0;padding:0;"><li style="margin:0;padding:0 0 0 50px;"><a href="/bilrude/Alfa-Romeo/" class="brand-link">Alfa Romeo</a></li><li style="margin:0;padding:0 0 0 50px;"><a href="/bilrude/Audi/" class="brand-link">Audi</a></li></ul></div></div><div class="brand-container"><div class="alpha-letter">B</div><div><ul class="unstyled" style="margin:0;padding:0;"><li style="margin:0;padding:0 0 0 50px;"><a href="/bilrude/BMW/" class="brand-link">BMW</a></li></ul></div></div><div class="brand-container"><div class="alpha-letter">C</div><div><ul class="unstyled" style="margin:0;padding:0;"><li style="margin:0;padding:0 0 0 50px;"><a href="/bilrude/Chevrolet/" class="brand-link">Chevrolet</a></li><li style="margin:0;padding:0 0 0 50px;"><a href="/bilrude/Chrysler/" class="brand-link">Chrysler</a></li><li style="margin:0;padding:0 0 0 50px;"><a href="/bilrude/Citroën/" class="brand-link">Citroën</a></li></ul></div></div></div><div style="clear:both;"><div class="brand-container"><div class="alpha-letter">D</div><div><ul class="unstyled" style="margin:0;padding:0;"><li style="margin:0;padding:0 0 0 50px;"><a href="/bilrude/Dacia/" class="brand-link">Dacia</a></li><li style="margin:0;padding:0 0 0 50px;"><a href="/bilrude/Daewoo/" class="brand-link">Daewoo</a></li><li style="margin:0;padding:0 0 0 50px;"><a href="/bilrude/DAF/" class="brand-link">DAF</a></li><li style="margin:0;padding:0 0 0 50px;"><a href="/bilrude/Daihatsu/" class="brand-link">Daihatsu</a></li><li style="margin:0;padding:0 0 0 50px;"><a href="/bilrude/Dodge/" class="brand-link">Dodge</a></li></ul></div></div><div class="brand-container"><div class="alpha-letter">F</div><div><ul class="unstyled" style="margin:0;padding:0;"><li style="margin:0;padding:0 0 0 50px;"><a href="/bilrude/Fiat/" class="brand-link">Fiat</a></li><li style="margin:0;padding:0 0 0 50px;"><a href="/bilrude/Ford/" class="brand-link">Ford</a></li></ul></div></div><div class="brand-container"><div class="alpha-letter">H</div><div><ul class="unstyled" style="margin:0;padding:0;"><li style="margin:0;padding:0 0 0 50px;"><a href="/bilrude/Honda/" class="brand-link">Honda</a></li><li style="margin:0;padding:0 0 0 50px;"><a href="/bilrude/Hyundai/" class="brand-link">Hyundai</a></li></ul></div></div></div><div style="clear:both;"><div class="brand-container"><div class="alpha-letter">I</div><div><ul class="unstyled" style="margin:0;padding:0;"><li style="margin:0;padding:0 0 0 50px;"><a href="/bilrude/Iveco/" class="brand-link">Iveco</a></li></ul></div></div><div class="brand-container"><div class="alpha-letter">J</div><div><ul class="unstyled" style="margin:0;padding:0;"><li style="margin:0;padding:0 0 0 50px;"><a href="/bilrude/Jaguar/" class="brand-link">Jaguar</a></li><li style="margin:0;padding:0 0 0 50px;"><a href="/bilrude/Jeep/" class="brand-link">Jeep</a></li></ul></div></div><div class="brand-container"><div class="alpha-letter">K</div><div><ul class="unstyled" style="margin:0;padding:0;"><li style="margin:0;padding:0 0 0 50px;"><a href="/bilrude/Kia/" class="brand-link">Kia</a></li></ul></div></div></div><div style="clear:both;"><div class="brand-container"><div class="alpha-letter">L</div><div><ul class="unstyled" style="margin:0;padding:0;"><li style="margin:0;padding:0 0 0 50px;"><a href="/bilrude/Land-rover/" class="brand-link">Land rover</a></li><li style="margin:0;padding:0 0 0 50px;"><a href="/bilrude/Lexus/" class="brand-link">Lexus</a></li></ul></div></div><div class="brand-container"><div class="alpha-letter">M</div><div><ul class="unstyled" style="margin:0;padding:0;"><li style="margin:0;padding:0 0 0 50px;"><a href="/bilrude/Mazda/" class="brand-link">Mazda</a></li><li style="margin:0;padding:0 0 0 50px;"><a href="/bilrude/Mercedes/" class="brand-link">Mercedes</a></li><li style="margin:0;padding:0 0 0 50px;"><a href="/bilrude/Mini/" class="brand-link">Mini</a></li><li style="margin:0;padding:0 0 0 50px;"><a href="/bilrude/Mitsubishi/" class="brand-link">Mitsubishi</a></li></ul></div></div><div class="brand-container"><div class="alpha-letter">N</div><div><ul class="unstyled" style="margin:0;padding:0;"><li style="margin:0;padding:0 0 0 50px;"><a href="/bilrude/Nissan/" class="brand-link">Nissan</a></li></ul></div></div></div><div style="clear:both;"><div class="brand-container"><div class="alpha-letter">O</div><div><ul class="unstyled" style="margin:0;padding:0;"><li style="margin:0;padding:0 0 0 50px;"><a href="/bilrude/Opel/" class="brand-link">Opel</a></li></ul></div></div><div class="brand-container"><div class="alpha-letter">P</div><div><ul class="unstyled" style="margin:0;padding:0;"><li style="margin:0;padding:0 0 0 50px;"><a href="/bilrude/Peugeot/" class="brand-link">Peugeot</a></li><li style="margin:0;padding:0 0 0 50px;"><a href="/bilrude/Porsche/" class="brand-link">Porsche</a></li></ul></div></div><div class="brand-container"><div class="alpha-letter">R</div><div><ul class="unstyled" style="margin:0;padding:0;"><li style="margin:0;padding:0 0 0 50px;"><a href="/bilrude/Renault/" class="brand-link">Renault</a></li><li style="margin:0;padding:0 0 0 50px;"><a href="/bilrude/Rover/" class="brand-link">Rover</a></li></ul></div></div></div><div style="clear:both;"><div class="brand-container"><div class="alpha-letter">S</div><div><ul class="unstyled" style="margin:0;padding:0;"><li style="margin:0;padding:0 0 0 50px;"><a href="/bilrude/Seat/" class="brand-link">Seat</a></li><li style="margin:0;padding:0 0 0 50px;"><a href="/bilrude/Skoda/" class="brand-link">Skoda</a></li><li style="margin:0;padding:0 0 0 50px;"><a href="/bilrude/Smart/" class="brand-link">Smart</a></li><li style="margin:0;padding:0 0 0 50px;"><a href="/bilrude/Ssang-Yong/" class="brand-link">Ssang Yong</a></li><li style="margin:0;padding:0 0 0 50px;"><a href="/bilrude/Subaru/" class="brand-link">Subaru</a></li><li style="margin:0;padding:0 0 0 50px;"><a href="/bilrude/Suzuki/" class="brand-link">Suzuki</a></li><li style="margin:0;padding:0 0 0 50px;"><a href="/bilrude/Saab/" class="brand-link">Saab</a></li></ul></div></div><div class="brand-container"><div class="alpha-letter">T</div><div><ul class="unstyled" style="margin:0;padding:0;"><li style="margin:0;padding:0 0 0 50px;"><a href="/bilrude/Tesla/" class="brand-link">Tesla</a></li><li style="margin:0;padding:0 0 0 50px;"><a href="/bilrude/Toyota/" class="brand-link">Toyota</a></li></ul></div></div><div class="brand-container"><div class="alpha-letter">V</div><div><ul class="unstyled" style="margin:0;padding:0;"><li style="margin:0;padding:0 0 0 50px;"><a href="/bilrude/Volvo/" class="brand-link">Volvo</a></li><li style="margin:0;padding:0 0 0 50px;"><a href="/bilrude/VW/" class="brand-link">VW</a></li></ul></div></div></div><div style="clear:both;"><div class="brand-container"><div class="alpha-letter">x</div><div><ul class="unstyled" style="margin:0;padding:0;"><li style="margin:0;padding:0 0 0 50px;"><a href="/bilrude/x.div/" class="brand-link">x.div</a></li></ul></div></div>              </div>
            `;

var json = html2json(test);

/*const getDetails =R.path(['child']);
getDetails(json);
*/

json.child.forEach(function(e1, index) {
	var p1 = e1.child;
	for (i = 0; i <= p1.length; i++) {
		try {
			var stingJson = JSON.stringify(p1[i].child[1].child[0].child[1].child);
			console.log(index + '------------->' + stingJson);
		} catch (e) {
			reject(e);
		}
	}
	/*p1.forEach(function(e1) {
		var stingJson = JSON.stringify(e1.child);
		console.log(stingJson);

	});*/


	//fs.writeFileSync('./sample.json', stingJson);
});
//const getDetails = R.pick(['child', 'child'], getDetails);
/*var stingJson = JSON.stringify(json);
fs.writeFileSync('./sample.json', stingJson);*/