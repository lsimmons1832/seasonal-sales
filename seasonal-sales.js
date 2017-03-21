var productContainer = document.getElementById("productContainer");

var productString = "";
var currentProduct;

function makeDOM(xhrData){

	for (var i = 0; i < xhrData.products.length; i++) {
		currentProduct = xhrData.products[i];

			productString += `<div class="col-xs-6 col-md-3"><div class="thumbnail"><p>${currentProduct.id} </p>`;
		  productString += `<p>${currentProduct.name} </p>`;
		  productString += `<p>${currentProduct.price}</p>`;
		  productString += `<p>${currentProduct.category_id}</p>`;
  		productString += `</div></div>`;
  	}

	productContainer.innerHTML += productString;
		
}

var departmentContainer = document.getElementById("departmentContainer");

var departmentString = "";
var currentDepartment;

function makeDepartmentDOM(xhrData){
	for (var i = 0; i < xhrData.categories.length; i++) {
		currentDepartment = xhrData.categories[i];

			departmentString += `<div><p>${currentDepartment.id} </p>`;
		  departmentString += `<p>${currentDepartment.name} </p>`;
		  departmentString += `<p>Season Discount: ${currentDepartment.season_discount}</p>`;
		  departmentString += `<p>Discount Amount: ${currentDepartment.discount}</p>`;
  		departmentString += `</div>`;
				if (currentDepartment.id === currentProduct.category_id) {
				currentProduct.price = currentProduct.price - (currentProduct.price * currentDepartment.discount); //put a line to write to DOM
				console.log("You might be on to something", currentProduct.price);
				}
  	}

	departmentContainer.innerHTML += departmentString;
	productContainer.innerHTML += productString;
		
}


function executeAfterProductFileLoaded() {
	console.log("Yay, Your Product code works!");
	var data = JSON.parse(this.responseText);
	makeDOM(data);
}

function executeIfProductFileLoadFails() {
	console.log("Sorry, Your code is broken.");

}

function executeAfterDepartmentFileLoaded() {
	console.log("Yay, Your Deparment code works!");
	var data = JSON.parse(this.responseText);
	makeDepartmentDOM(data);
}

function executeIfDepartmentFileLoadFails() {
	console.log("Sorry, Your code is broken.");

}

var myRequest = new XMLHttpRequest();
myRequest.addEventListener("load", executeAfterProductFileLoaded);
myRequest.addEventListener("error", executeIfProductFileLoadFails);
myRequest.open("GET", "product.json");
myRequest.send();
console.log("Last line in JS file: ", Date.now());

var departmentLookup = new XMLHttpRequest();
departmentLookup.addEventListener("load", executeAfterDepartmentFileLoaded);
departmentLookup.addEventListener("error", executeIfDepartmentFileLoadFails);
departmentLookup.open("GET", "departments.json");
departmentLookup.send();
console.log("Last line in JS file: ", Date.now());
