function deleteProduct(e){
  var buttonClicked = e.currentTarget;
  var productToDelete = buttonClicked.parentNode.parentNode;
  var tableOfProducts = productToDelete.parentNode;

  tableOfProducts.removeChild(productToDelete);
}

function getPriceByProduct(productNode){
  var productPrice = productNode.getElementsByClassName("product-price")[0].innerHTML;
  var productQuantity = productNode.getElementsByClassName("product-quantity")[0].value;
  var totalPrice = productPrice * productQuantity;

  return totalPrice;
}

function updatePriceByProduct(productPrice, index){
  document.getElementsByClassName("product-total")[index].innerHTML = productPrice.toFixed(2);
}

function getTotalPrice() {
  var products = document.getElementsByClassName("product");
  var totalPrice = 0;
  for (var i = 0; i < products.length; i++) {
    var productTotalPrice = getPriceByProduct(products[i]);
    updatePriceByProduct(productTotalPrice, i);
    totalPrice += productTotalPrice;
  }
  document.getElementById("total-price").innerHTML = totalPrice.toFixed(2);
}

function createDeleteButtonNode(){
  var productNode = document.createElement("div");
  var newButtonElement = document.createElement("button");
  var buttonText = document.createTextNode("Delete");

  newButtonElement.appendChild(buttonText);
  newButtonElement.className = "btn-delete";
  productNode.className = "col-xs-2";
  productNode.appendChild(newButtonElement);

  return productNode;
}

function createQuantityNode(){
  var productNode = document.createElement("div");
  var newLabelElement = document.createElement("label");
  var newInputElement = document.createElement("input");

  newLabelElement.innerHTML = "QTY:";
  newLabelElement.htmlFor = "quantity";
  newInputElement.type = "text";
  newInputElement.className = "product-quantity";
  newInputElement.value = "0";
  newInputElement.id = "quantity";
  productNode.className = "col-xs-3";
  productNode.appendChild(newLabelElement);
  productNode.appendChild(newInputElement);

  return productNode;
}

function createSpanNode(nodeClassName, spanClassName, value){
  var productNode = document.createElement("div");
  var spanElement = document.createElement("span");

  spanElement.innerHTML = value;
  spanElement.className = spanClassName;
  productNode.className = nodeClassName;
  if(isNaN(value) === false) {
    productNode.appendChild(document.createTextNode("$"));
  }
  productNode.appendChild(spanElement);

  return productNode;
}

function createNewProduct(){
  var newRowDiv = document.createElement("div");
  var newProductDiv = document.createElement("div");
  var productTableDiv = document.getElementById("product-table");
  var createRowDiv = document.getElementsByClassName("new-product")[0].parentNode;

  var newProductName = document.getElementById("new-product-name").value;
  var newProductPrice = document.getElementById("new-product-price").value;

  newProductDiv.className = "product";
  newProductDiv.appendChild(createSpanNode("col-xs-3", "product-name", newProductName));
  newProductDiv.appendChild(createSpanNode("col-xs-2", "product-price", newProductPrice));
  newProductDiv.appendChild(createQuantityNode());
  newProductDiv.appendChild(createSpanNode("col-xs-2", "product-total", "0.00"));
  newProductDiv.appendChild(createDeleteButtonNode());

  newRowDiv.className = "row";
  newRowDiv.appendChild(newProductDiv);
  productTableDiv.insertBefore(newRowDiv, createRowDiv);
}

window.onload = function(){
  var calculatePriceButton = document.getElementById("calc-prices-button");
  var createProductButton = document.getElementById("new-product-create");
  var deleteButtons = document.getElementsByClassName("btn-delete");

  calculatePriceButton.onclick = getTotalPrice;
  createProductButton.onclick = createNewProduct;

  for(var i = 0; i<deleteButtons.length ; i++){
    deleteButtons[i].onclick = deleteProduct;
  }
};