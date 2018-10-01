require('es6-promise').polyfill();
require('isomorphic-fetch');
// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

const urls = [
	'https://dog.ceo/api/breeds/list',
	'https://dog.ceo/api/breeds/image/random'
  ];
  
  Promise.all(urls.map(url =>
	fetch(url)
	  .then(checkStatus)                 
	  .then(parseJSON)
	  .catch(error => console.log('There was a problem!', error))
  ))
  .then(data => {
	const breedList = data[0].message;
	const randomImage = data[1].message;
	
	console.log(breedList);
	console.log(randomImage);
  })
  
  // ------------------------------------------
  //  HELPER FUNCTIONS
  // ------------------------------------------
  
  function checkStatus(response) {
	if (response.ok) {
	  return Promise.resolve(response);
	} else {
	  return Promise.reject(new Error(response.statusText));
	}
  }
  
  function parseJSON(response) {
	return response.json();
  }
  
  