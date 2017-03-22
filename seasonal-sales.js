var productContainer = document.getElementById("productContainer");

var productString = "";
var currentProduct;
var product = [];

function makeDOM(xhrData){
	product = xhrData.products;
		for (var i = 0; i < xhrData.products.length; i++) {
		currentProduct = xhrData.products[i];

			productString += `<div class="col-xs-6 col-md-3"><div class="thumbnail"><p class="hidden">${currentProduct.id} </p>`;
		  productString += `<p>${currentProduct.name} </p>`;
		  productString += `<p>${currentProduct.price}</p>`;
		  productString += `<p class"hidden">${currentProduct.category_id}</p>`;
  		productString += `</div></div>`;
  	}

	productContainer.innerHTML += productString;
		
}

var departmentContainer = document.getElementById("departmentContainer");

var departmentString = "";
var currentDepartment;
var departmentArray = [];

function makeDepartmentDOM(xhrData){
	for (var i = 0; i < xhrData.categories.length; i++) {
		currentDepartment = xhrData.categories[i];

			departmentString += `<div><p class"hidden">${currentDepartment.id} </p>`;
		  departmentString += `<p>${currentDepartment.name} </p>`;
		  departmentString += `<p>Season Discount: ${currentDepartment.season_discount}</p>`;
		  departmentString += `<p>Discount Amount: ${currentDepartment.discount}</p>`;
  		departmentString += `</div>`;
				// if (currentDepartment.id === currentProduct.category_id) {
				// currentProduct.price = currentProduct.price - (currentProduct.price * currentDepartment.discount); //put a line to write to DOM
				// console.log("You might be on to something", currentProduct.price);
				// }
  	}

	// departmentContainer.innerHTML += departmentString;
	// productContainer.innerHTML += productString;
		
}

function executeAfterDepartmentFileLoaded() {
	console.log("Yay, Your Deparment code works!");
	var data = JSON.parse(this.responseText);
	departmentArray = data.categories;
	}

function executeIfDepartmentFileLoadFails() {
	console.log("Sorry, Your code is broken.");

}

function executeAfterProductFileLoaded() {
	console.log("Yay, Your Product code works!");
	var data = JSON.parse(this.responseText);
	dataHandler(data);
}

function executeIfProductFileLoadFails() {
	console.log("Sorry, Your code is broken.");

}


var departmentLookup = new XMLHttpRequest();
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


// var seasonSelected = document.getElementsByClassName("dropdown");
// seasonSelected.addEventListener("change", function(event){
// 	if (event.target.selected === true){
// 		currentProduct.category_id = currentDepartment.name;
// 		currentProduct.price = currentProduct.price - (currentProduct.price * currentDepartment.discount);
// 		console.log(currentProduct);
// 	}

// });

function dataHandler(data){
		product = data.products;
		product.forEach(function(product){
		console.log("Im in forEach");
	for (var i = 0; i < departmentArray.length; i++) {
		if (product.category_id === departmentArray[i].id) {
			
		}
	}
});
	makeDOM(data);
}