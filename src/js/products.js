var productPackages = JSON.parse(localStorage.getItem("packages"));
var productTests = JSON.parse(localStorage.getItem("tests"));
var productPackageBody=' ';
var productTestsBody=' ';
var items = [];
if(localStorage.getItem('id')!= null){
    items = localStorage.getItem('id').split(',');
}

getProductPackages();
getProductTests();

function getProductPackages(){
    $.each(productPackages,(index,data)=>{
        productPackageBody+=`
        <div class='col-md-3'>
        <div class="card m-2 my-2">
            <div class="card-body">
                <h5 class="card-title">${data.disease_group}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${data.name}</h6>
                <h6 class="card-subtitle mb-2 text-muted">includes ${data.childs.length} tests.</h6>
                <img class="card-img-top" src="${data.image_location}" alt="Card image cap" style="width:100%;height:40%;">
                <p class="card-text my-2">Pay <i class="fa fa-rupee-sign"></i> ${data.rate.pay_amt} </p>
                 <div class="row buttons">
                <div class="col-md-6">
                <a href="#" class=" btn btn-success">Book Now</a>
                </div>
                <div class="col-md-6">
                <a class="btn color1 text-dark" onclick="addToCart('${data.code}');">Add to Cart</a>
                </div>
                </div>
                </div>
        </div>
        </div>`
    });

    $("#allPackages").html(productPackageBody);
}

function getProductTests(){
    $.each(productTests,(index,data)=>{
        productTestsBody += `
        <div class="col-md-2">
        <div class="card m-2">
        <div class="card-body testsButton">
            <h5 class="card-title">${data.disease_group}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${data.name}</h6>
            <p class="card-text my-2">Pay <i class="fa fa-rupee-sign"></i> ${data.rate.pay_amt} </p>
            <a href="#" class="card-link btn btn-success mb-1 ">Book Now</a>
            <a  class=" btn color text-dark" onclick="addToCart('${data.code}')">Add to cart</a>
        </div>
        </div>
        </div>
        `
    });
    $('#allProductTests').html(productTestsBody);
}

function addToCart(id){
    
    $(event.target).html('Go to Cart');
    $(event.target).css("background-color","#FF5733");
   // $(event.target).css("background-color","#FF5733");
   // $(event.target).attr("href","cart.html");
    $(event.target).removeAttr("onclick");
    items.push(id);
    localStorage.setItem('id',items);
}

