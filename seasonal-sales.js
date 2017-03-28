var departmentContainer = document.getElementById("departmentContainer");
var productContainer = document.getElementById("productContainer");

var departmentString = "";
var currentDepartment;
var departmentArray = [];
var products = [];

function makeDOM(season_discount){
var productString = "";
			for (var i = 0; i < products.length; i++) {

			productString += `<div class="col-xs-6 col-md-3"><div class="thumbnail"><p class="hidden">${products[i].id} </p>`;
		  productString += `<p>${products[i].name} </p>`;
		  if(season_discount === products[i].dept_seasonaldisc){
		  	productString += `<p>${products[i].season_price.toFixed(2)}</p>`;
			}else {
				productString += `<p>${products[i].price}</p>`;
			}
		  productString += `<p class="hidden">${products[i].category_id}</p>`;
  		productString += `</div></div>`;
  	}

	productContainer.innerHTML = productString;
}



function executeAfterDepartmentFileLoaded() {
	console.log("Yay, Your Deparment code works!");
	var data = JSON.parse(this.responseText);
	departmentArray = data.categories;
	}

function executeIfDepartmentFileLoadFails() {
	console.log("Sorry, Your code is broken.");

}



var departmentLookup = new XMLHttpRequest();
function executeAfterProductFileLoaded() {
	console.log("Yay, Your Product code works!");
	var data = JSON.parse(this.responseText);
	dataHandler(data);
}

function executeIfProductFileLoadFails() {
	console.log("Sorry, Your code is broken.");
}
departmentLookup.addEventListener("load", executeAfterDepartmentFileLoaded);
departmentLookup.addEventListener("error", executeIfDepartmentFileLoadFails);
departmentLookup.open("GET", "departments.json");
departmentLookup.send();
console.log("Last line in JS file: ", Date.now());

var myRequest = new XMLHttpRequest();
myRequest.addEventListener("load", executeAfterProductFileLoaded);
myRequest.addEventListener("error", executeIfProductFileLoadFails);
myRequest.open("GET", "product.json");
myRequest.send();
console.log("Last line in JS file: ", Date.now());


function dataHandler(data){
		products = data.products;
		products.forEach(function(product){
		
	for (var i = 0; i < departmentArray.length; i++) {
		if (product.category_id === departmentArray[i].id) {
			product["dept_id"] = departmentArray[i].id;
			product["dept_name"] = departmentArray[i].name;
			product["dept_seasonaldisc"] = departmentArray[i].season_discount;
			product["dept_discount"] = departmentArray[i].discount;
	    product["season_price"] = product.price - (product.price * departmentArray[i].discount);
			
		}
	}
});
	makeDOM("none");
}

var season = document.getElementById("season");

season.addEventListener("change", function(e){
	var selectedSeason = e.target.value;
	makeDOM(selectedSeason);
});

console.log("did my object change?", products);
// season.addEventListener("change", funtion(e){
// 	if (season.value == "summer") {
// 		console.log("I'm doing stuff");
// 	}
// });