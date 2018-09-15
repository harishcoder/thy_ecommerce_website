var id = localStorage.getItem('id');
var idArr =id.split(',');
var profile = JSON.parse(localStorage.getItem("packages"));
var testsData = JSON.parse(localStorage.getItem("tests"));
var name,age,gender;
var cartBody =' ';
var benBody=' ';
var popularTestsBody=' ';
var count;
var cardTable =' ';
var orderDetails =' ';
var orderDetailsAmount=' ';
var countCart =0; 
var testsSelected;
var allTestsItem;
var selectedItemsDetails=' ';
var selectedItemsArray;




$('.table').hide();
$('.benAlert').hide();
$('#benCard').hide();
popularTests();
cartTableDetails();
checkBen();

function cartTableDetails(){
    console.log(id);
    
    if(id == ' '){
        cartBody =`<h3 class="text-center text-primary m-4">Your cart is empty...</h3>`;
        $('#cartDetails').html(cartBody);
    }else{
        var idArr =id.split(',');
        idArr = $.unique(idArr);
        
       // console.log(idArr);
        $.each(idArr,(index,data)=>{
            var singleId = data;
            $.each(profile,(index,data)=>{
                if(singleId == data.code){
                    $('.table').show();
                    cartBody+=`<tr>
                                <td>${data.code}</td>
                                <td>${data.group_name}</td>
                                <td>${data.childs.length}</td>
                                <td><i class="fa fa-rupee-sign"></i>${data.rate.pay_amt}</td>
                                <td style="cursor:pointer;" onclick="remove('${data.code}');">&#10060;</td>
                                </tr>`;
                }
            })
            $.each(testsData,(index,data)=>{
                if(singleId == data.code){
                    $('.table').show();
                    //console.log(data);
                    cartBody+=`<tr>
                                <td>${data.code}</td>
                                <td>${data.name}</td>
                                <td></td>
                                <td><i class="fa fa-rupee-sign"></i>${data.rate.pay_amt}</td>
                                <td style="cursor:pointer" onclick="remove('${data.code}')">&#10060;</td>
                                </tr>`;
                }
            })
        })
        $('#cartTable').html(cartBody);
        $('.benAlert').show();
    }

}

function checkBen(){
    var benCheck = JSON.parse(localStorage.getItem('benDetails'));
    if(benCheck.length >0){
        showBenDetails();
        return true;
    }else{
        
        return;
    }
}

function addBen(){
    var ben=[];
    name = $('.name').val().toUpperCase();
    age = $('.age').val().toUpperCase();
    gender = $('input[name="gender"]:checked').val().toUpperCase();
    if(countCart==0){
        var benDetails ={
            name:name,
            age:age,
            gender:gender,
            tests:testsSelected
        }; 
        
    }else{
        var benDetails ={
            name:name,
            age:age,
            gender:gender,
            tests:allTestsItem
        };
       
    }
   
   // console.log(benDetails);
    if(JSON.parse(localStorage.getItem('benDetails'))!= null){
        var benCheck = JSON.parse(localStorage.getItem('benDetails'));
        $.each(benCheck,(index,data)=>{
            ben.push(data);
           
        })
        ben.push(benDetails);
        
        localStorage.setItem('benDetails',JSON.stringify(ben));
        $('.card').hide();
        $('.orderDetails').empty();
      
    }else{
        ben.push(benDetails);
        localStorage.setItem('benDetails',JSON.stringify(ben));
        
    }
    showBenDetails();
    $('#selectAllTests').html('select all Tests');
    $('#selectAllTests').css("background-color","#353130");
    $('.name').val(' ');
    $('.age').val(' ');
}

function showBenDetails(){
    var selectedTestsAmount = [];
    selectedItemsArray=[];
    count=0;
    var amount;
    var totalAmount =0 ;
    orderDetails =' ';
    orderDetailsAmount=' ';
    selectedItemsDetails=' ';
    var benDet = JSON.parse(localStorage.getItem('benDetails'));
    console.log(benDet);
    $('.card').show();
      cardTable = `<table class="table ">
                        <thead>
                            <th>S.no.</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Tests Selected</th>
                            <th></th>
                        </thead>
                        <tbody id="orderDetails">

                        </tbody>
                    </table>`;
    $('#orderAmount').html(cardTable);
    $.each(benDet,(index,data)=>{
        amount=0;
        count++;
        orderDetails+=`
        <tr>
        <td>${count}</td>
        <td>${data.name}</td>
        <td>${data.age}</td>
        <td>${data.gender}</td>
        <td ><div class="container" id="selectedData${count}"></div></td>
        <td onclick="deleteBen(${count});" style="cursor:pointer;">&#10005;</td>
        </tr>
        `;
       
        $.each(data.tests,(index,data)=>{
             selectedItemsDetails+=`
            <div class="row">
            <div class="col-sm-4">
            <p>${data.name}</p>
            </div>
            <div class="col-sm-4">
            <h5>${data.amount}</h5>
            </div>
            <div class="col-sm-4">
            <p onclick="delTests(${index},${count})" style="cursor:pointer;">&#10005; </p>
            </div>
            </div>`;
            amount+=parseInt(data.amount);
         })
        selectedItemsArray.push(selectedItemsDetails);
        selectedTestsAmount.push(amount);
        
        selectedItemsDetails =' ';
    });
    $('#orderDetails').html(orderDetails);
    console.log(selectedTestsAmount);
    for(i=0;i<selectedItemsArray.length;i++){
        var k = i+1;
        $('#selectedData'+k).html(selectedItemsArray[i]);
    }
    $.each(selectedTestsAmount,(index,data)=>{
        totalAmount+=data;
    })
    orderDetailsAmount=` <p class="pull-right">* You can add one or more benficiery.</p>
                    <br><br>
                    <h5 class="m-3 cardTotalAmount">Total Amount to pay: ${totalAmount}  </h5>
                    <div class="card-footer text-muted">
                    <a href="orderForm.html" class="btn btn-primary">Click to proceed further</a>
                    </div>`;

    
   
    $('#orderAmount').append(orderDetailsAmount);
    localStorage.setItem('amount',totalAmount);
}


function remove(id){
    $(event.target).closest('tr').remove();
    var index = idArr.indexOf(id);
    //console.log(index);
    idArr.splice(index,1);
    //console.log(idArr)
    localStorage.setItem('id',idArr);
    
    
}   


function popularTests(){
    $.each(profile,(index,data)=>{
        popularTestsBody += `
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
    </div>`
    })

    $('#popularTests').html(popularTestsBody);
    popularTestsSlider();
}   


function popularTestsSlider(){
    $('.cart-slider').slick({
        slidesToShow:1,
        slidesToScroll:1,
        arrows:false,
       // dots: true,
        focusOnSelect: true,
        infinite:true,
        draggable:true,
        autoplay:true
    });
}

function deleteBen(count){
    $(event.target).closest('tr').remove();
    var benData = JSON.parse(localStorage.getItem('benDetails'));
    benData.splice(count-1,1);
    localStorage.setItem('benDetails',JSON.stringify(benData));
    benData =  JSON.parse(localStorage.getItem('benDetails'));
    //$('.cardTotalAmount').html(`<h5 class="m-3 cardTotalAmount">Total Amount: ${totalAmount()} &#10005; ${benData.length} = ${totalAmount()*benData.length} </h5>`);
    showBenDetails();
    if(benData.length == 0){
        $('#benCard').hide();  
    }
}

function allTests(){
    allTestsItem=[];
    var selectedItem;
    idTests = localStorage.getItem('id');
    $('#selectAllTests').html('all Tests Selected');
    $('#selectAllTests').css("background-color","#d11b36");

    var idTestsArr =idTests.split(',');
    var selectedItem
         $.each(idTestsArr,(index,data)=>{
        var singleId = data;
        $.each(profile,(index,data)=>{
            if(singleId == data.code){
                selectedItem ={
                   name:data.group_name,
                   amount:data.rate.pay_amt
               }
               allTestsItem.push(selectedItem);
            }
            
        })
        $.each(testsData,(index,data)=>{
            if(singleId == data.code){
                 selectedItem ={
                    name:data.group_name,
                    amount:data.rate.pay_amt
                }
                allTestsItem.push(selectedItem);
            }
            
            })
     })
    countCart++;
}

function selectTests(){
    id = localStorage.getItem('id');
    var modalBody=' ';
    var idArr =id.split(',');
    idArr = $.unique(idArr);
    
    $.each(idArr,(index,data)=>{
        var singleId = data;
        $.each(profile,(index,data)=>{
            if(singleId == data.code){
                modalBody+=`<ul class="list-group ">
                <li class="list-group-item d-flex flex-row justify-content-between align-middle">
                <p>${data.code}</p>
                <h5>${data.group_name}</h5>
                <input type="checkbox"  class="mt-2" name="tests" value="${data.code}"> 
                </li>
              </ul>`;
            }
        })
        $.each(testsData,(index,data)=>{
            if(singleId == data.code){
                modalBody+=`<ul class="list-group ">
                <li class="list-group-item d-flex flex-row justify-content-between align-middle">
                <p>${data.code}</p>
                <h5>${data.group_name}</h5>
                <input type="checkbox" class="mt-2" name="tests" value="${data.code}" > 
                </li>
              </ul>`;
            }
            })
        })

        $('.modal-body').html(modalBody);
}

function selectedTests(){
    testsSelected=[];

    var selectedItem
    var  testSelected = $("input[name='tests']:checked").map(function() {return this.value;}).get();
     $.each(testSelected,(index,data)=>{
        var singleId = data;
        $.each(profile,(index,data)=>{
            if(singleId == data.code){
                selectedItem ={
                   name:data.group_name,
                   amount:data.rate.pay_amt
               }
               testsSelected.push(selectedItem);
            }
            
        })
        $.each(testsData,(index,data)=>{
            if(singleId == data.code){
                 selectedItem ={
                    name:data.group_name,
                    amount:data.rate.pay_amt
                }
                testsSelected.push(selectedItem);
            }
            
            })
     })
     countCart=0;
}

function delTests(index,count){
    $(event.target).closest('.row').remove();
    var i = count-1;
    var delBenDetails = JSON.parse(localStorage.getItem('benDetails'));
    delBenDetails[i].tests.splice(index,1);
    localStorage.setItem('benDetails',JSON.stringify(delBenDetails));
    showBenDetails();
}