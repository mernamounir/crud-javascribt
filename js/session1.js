
var searchInp = document.getElementById("searchInp");
var currentIndex = 0;
var productNameInp = document.getElementById("productName");
var productPriceInp = document.getElementById("productPrice");
var productCompanyInp = document.getElementById("productCompany");
var productDescInp = document.getElementById("productDesc");
var addBtn = document.getElementById("addBtn");
var searchRow = document.getElementById("searchRow");
var productsContainer ;
var alertContainer = document.getElementById("alertContainer");

alertContainer.style.display = "none";


if(localStorage.getItem("productsContainer") == null)
    {
        productsContainer = [];
    }
else
    {
        productsContainer =JSON.parse( localStorage.getItem("productsContainer"));
        displayData();

    }



function validateForm()
{
    var errors = "";
    var nameRegex = /^[A-Z][a-zA-Z]{2,8}$/;
    var priceRegex = /^[1-9][0-9]{4}$/
    if(nameRegex.test(productNameInp.value) == false)
        {
            errors +="<p>productName must start with upperCase </p>";
            alertContainer.style.display = "block";
            alertContainer.innerHTML = errors;
        }
     if(priceRegex.test(productPriceInp.value)==false)
        {
            errors +="<p>price must be between 10-10000 </p>";
            alertContainer.style.display = "block";
            alertContainer.innerHTML = errors;
            
        }
    
    if(errors.length > 0)
        {
            return false;
        }
    else
        {
            return true;
        }
 
}

addBtn.onclick = function()
{
        if(validateForm() == true)
        {    
            
    
            if(addBtn.innerHTML == "add product")
            {
                            addProduct();
                            displayData();
                            clearForm();
            }
            else
            {

                updateProduct();
                displayData();
                clearForm();
            }

        }
  
}


searchInp.onkeyup = function()
{
    searchProducts(searchInp.value)
}



function updateProduct()
{
    productsContainer[currentIndex].name = productNameInp.value;   
    productsContainer[currentIndex].price = productPriceInp.value;   
    productsContainer[currentIndex].company = productCompanyInp.value; 
    productsContainer[currentIndex].desc = productDescInp.value;   
    
        addBtn.innerHTML = "add product";
localStorage.setItem("productsContainer",JSON.stringify(productsContainer));

}

function searchProducts(term)
{
        var searchCols = "";
    
    for(var i= 0 ; i < productsContainer.length ;i++)
        {
            if(productsContainer[i].name.includes(term))
                {
                    
                searchCols +='<div class="col-md-3"> <div class="product"><h3>'+productsContainer[i].name+'</h3><p>'+productsContainer[i].desc+'</p><p class="text-danger">'+productsContainer[i].price+'</p> <p class="text-info">'+productsContainer[i].company+'</p><button class="btn btn-danger" onclick="deleteProduct('+i+')">delete</button></div></div>' 
                }
        }
    
    searchRow.innerHTML = searchCols;
}


function addProduct()
{
    var product = 
        {
            name:productNameInp.value,
            price:productPriceInp.value,
            company:productCompanyInp.value,
            desc:productDescInp.value
        }
    productsContainer.push(product);
    
localStorage.setItem("productsContainer",JSON.stringify(productsContainer));
    
}

function displayData()
{
    var cols="";
    for(var i = 0 ; i<productsContainer.length ; i++)
        {
        cols +='<div class="col-md-3"> <div class="product"><h3>'+productsContainer[i].name+'</h3><p>'+productsContainer[i].desc+'</p><p class="text-danger">'+productsContainer[i].price+'</p> <p class="text-info">'+productsContainer[i].company+'</p><button class="btn btn-danger mr-2" onclick="deleteProduct('+i+')">delete</button><button class="btn btn-info" onclick="setForm('+i+')">update</button></div></div>'    
        }
    document.getElementById("rowData").innerHTML = cols;
}

function setForm(i)
{
   productNameInp.value= productsContainer[i].name;
   productPriceInp.value= productsContainer[i].price;
   productCompanyInp.value= productsContainer[i].company;
   productDescInp.value= productsContainer[i].desc;
    
   addBtn.innerHTML = "update product";
    
   currentIndex = i;
}

function deleteProduct(id)
{
    
    productsContainer.splice(id,1);
localStorage.setItem("productsContainer",JSON.stringify(productsContainer));
    
    displayData();

}
function clearForm()
{
    
   var inputs= document.getElementsByClassName("form-control");
    
    for(var i= 0 ; i <inputs.length ; i++)
        {
            inputs[i].value = "";
        }
}











