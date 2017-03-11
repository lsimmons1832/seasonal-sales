var productContainer = document.getElementById("productContainer");

var productString = "";
var currentProduct;

function makeDOM(xhrData){

	for (var i = 0; i < xhrData.products.length; i++) {
		currentProduct = xhrData.products[i];

			productString += `<div><p>${currentProduct.id} </p>`;
		  productString += `<p>${currentProduct.name} </p>`;
		  productString += `<p>${currentProduct.price}</p>`;
		  productString += `<p>${currentProduct.category_id}</p>`;
  		productString += `</div>`;
  	}

	productContainer.innerHTML += productString;
		
}

function makeDepartmentDOM(xhrData){
	for (var i = 0; i < xhrData.products.length; i++) {
		currentDepartment = xhrData.products[i];

			productString += `<div><p>${currentDepartment.id} </p>`;
		  productString += `<p>${currentDepartment.name} </p>`;
		  productString += `<p>${currentDepartment.price}</p>`;
		  productString += `<p>${currentDepartment.category_id}</p>`;
  		productString += `</div>`;
  	}

	departmentContainer.innerHTML += DepartmentString;
		
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