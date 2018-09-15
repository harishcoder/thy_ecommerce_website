var packageBody =' ';
var testsBody = ' ';
var profileBody =' ';
var mainTestsBody=' ';
var profile = JSON.parse(localStorage.getItem("packages"));
var testsData = JSON.parse(localStorage.getItem("tests"));
var packageCount=0;
var testsCount = 0;

getProfile();
getTests();

$('.searchedPackages').hide();
$('.searchedTests').hide();
$(".viewAllPackage").hide();
$('.viewAllTests').hide();

function searchItem(){
    document.getElementById('packageSearched').innerHTML =' ';
    document.getElementById('testsSearched').innerHTML = ' ';
    var item = $.trim($('#search').val()).toUpperCase();
    
    $.each(profile,(index,data)=>{
       if(data.disease_group.indexOf(item)>-1){
        packageBody+=`
        <div class="card m-2">
            <div class="card-body">
                <h5 class="card-title">${data.disease_group}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${data.name}</h6>
                <h6 class="card-subtitle mb-2 text-muted">includes ${data.childs.length} tests.</h6>
                <img class="card-img-top" src="${data.image_location}" alt="Card image cap" style="width:100%;height:40%;">
                <p class="card-text my-2">Pay <i class="fa fa-rupee-sign"></i> ${data.rate.pay_amt} </p>
                <div class="row buttonHome">
                <div class="col-md-6">
                <a href="#" class=" btn btn-success">Book Now</a>
                </div>
                <div class="col-md-6">
                <a class="btn color1 text-dark" onclick="addToCart('${data.code}')>Add to Cart</a>
                </div>
                </div>
            </div>
        </div>`;
        }

    })

    $.each(testsData,(index,data)=>{
       if(data.disease_group.indexOf(item)>-1 || data.name.indexOf(item)>-1){
        testsBody+=`
        
       <div class="card m-2">
            <div class="card-body testButtonHome">
                <h5 class="card-title ">${data.disease_group}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${data.name}</h6>
                <p class="card-text my-2">Pay <i class="fa fa-rupee-sign"></i> ${data.rate.pay_amt} </p>
                <a href="#" class="card-link btn btn-success mb-1 ">Book Now</a>
                <a href="#" class=" btn color text-dark " onclick="addToCart('${data.code}')>Add to cart</a>
            </div>
                </div>
               `
            }
    })
    
    if(packageBody!=' '){
        $('.searchedPackages').show();
        $('.viewAllPackage').show();
        if(packageCount>0){
            $('.slider-package').slick('unslick');
        }
        document.getElementById('packageSearched').innerHTML = packageBody;
        packageSlider();
        packageCount++;
       // 
     }else{
        $('.searchedPackages').hide();
        $('.viewAllPackage').hide();
    }
    
    if(testsBody!=' '){
        $('.searchedTests').show();
        $(".viewAllTests").show();
        if(testsCount>0){
            $('.slider-tests').slick('unslick');
        }
        document.getElementById('testsSearched').innerHTML = testsBody;
        testsSlider();
        testsCount++;
    }else{
        $('.searchedTests').hide();
        $(".viewAllTests").hide();
        document.getElementById('testsSearched').innerHTML = '<h5>Not found</h5>'
    }
   
    packageBody =' ';
    testsBody = ' ';
}

function getProfile(){
    $.each(profile,(index,data)=>{
        profileBody+=`
        <div class="card m-2"">
            <div class="card-body">
                <h5 class="card-title">${data.disease_group}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${data.name}</h6>
                <h6 class="card-subtitle mb-2 text-muted">includes ${data.childs.length} tests.</h6>
                <img class="card-img-top" src="${data.image_location}" alt="Card image cap" style="width:100%;height:40%;">
                <p class="card-text my-2">Pay <i class="fa fa-rupee-sign"></i> ${data.rate.pay_amt} </p>
                <div class="row buttonHome">
                <div class="col-md-6">
                <a href="#" class=" btn btn-success">Book Now</a>
                </div>
                <div class="col-md-6">
                <a class="btn color1 text-dark" onclick="addToCart('${data.code}')">Add to Cart</a>
                </div>
                </div>
            </div>
        </div>
        `
    });

    document.getElementById('profile').innerHTML = profileBody;
}

function getTests(){
    $.each(testsData,(index,data)=>{
        mainTestsBody += `
        <div class="card m-2"">
        <div class="card-body testButtonHome">
            <h5 class="card-title">${data.disease_group}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${data.name}</h6>
            <p class="card-text my-2">Pay <i class="fa fa-rupee-sign"></i> ${data.rate.pay_amt} </p>
            <a href="#" class="card-link btn btn-success mb-1 ">Book Now</a>
            <a href="#" class=" btn color text-dark " onclick="addToCart('${data.code}')">Add to cart</a>
        </div>
        </div>
        `
    });
    document.getElementById('allTests').innerHTML = mainTestsBody;
}

$('.slider-nav').slick({
    slidesToShow:5 ,
    slidesToScroll:5,
    arrows:true,
    dots: true,
    focusOnSelect: true,
    infinite:true,
    draggable:true
   // autoplay:true
});

  $('.tests-slider').slick({
    slidesToShow:6 ,
    slidesToScroll:6,
    arrows:true,
    dots: true,
    focusOnSelect: true,
    infinite:true,
    draggable:true,
    autoplay:true,
   
  });

  function packageSlider(){
    $('.slider-package').not('.slick-initialized').slick({
        slidesToShow:5 ,
        slidesToScroll:5,
        arrows:true,
        //dots: true,
        focusOnSelect: true,
        infinite:true,
        draggable:true
        
        });
  }

  function testsSlider(){
    $('.slider-tests').not('.slick-initialized').slick({
        slidesToShow:6 ,
        slidesToScroll:6,
        arrows:true,
       // dots: true,
        focusOnSelect: true,
        infinite:true,
        draggable:true
    });
  }
    
  function pincodeArea(){
    $('.navbar-nav li:nth-child(5)').remove();
      var pincode=localStorage.getItem('pincode');
      $(".navbar-nav").append(`<li class="nav-item mx-2" data-target="#pincodeChange" data-toggle="modal"><a class="nav-link" style="cursor:pointer;">Pincode: ${pincode}</a></li>`);
  }

  function pincodeNotAvailable(){
      $('.navbar-nav li:nth-child(5)').remove();
      $(".navbar-nav").append(`<li class="nav-item mx-2" data-target="#myModal" data-toggle="modal"><a class="nav-link" style="cursor:pointer;">Add Pincode</a></li>`)
  }


  $("#pinCodeForm").submit((e)=>{
    e.preventDefault();
    var pincode=$("#pincode").val();
    pincodeApi(pincode).then((data)=>{
        if(data.status=="Y"){
        localStorage.setItem('pincode',pincode);
        $("#myModal").modal("hide");
        swal({
            title: "Our services are available in your Area Pincode.",
            icon: "success",
            button: "Ok"
          });
        pincodeArea();
        }else if(data.status=="N"){
            swal({
                title: "Sorry! Our services are not available in your Area Pincode.",
                icon: "warning",
                button: "Ok"
              });
              pincodeNotAvailable();
        }else if(data.status==null){
            swal({
                title: "Please enter the valid Area Pincode.",
                icon: "warning",
                button: "Ok"
              });
              $('#myModal').modal('show');
        }
        
    })
});


   $("#pincodeChangeForm").submit((e)=>{
    e.preventDefault();
    var pincode=$("#changedPincode").val();
    pincodeApi(pincode).then((data)=>{
        $("#pincodeChange").modal("hide");
        if(data.status=="Y"){
            localStorage.setItem('pincode',pincode);
            
            swal({
                title: "Our services are available in your Area Pincode.",
                icon: "success",
                button: "Ok"
              });
            $('.navbar-nav li').last().remove();
            pincodeArea();
            }else if(data.status=="N"){
                swal({
                    title: "Sorry! Our services are not available in your Area Pincode.",
                    icon: "warning",
                    button: "Ok"
                  });
                  $('.navbar-nav li').last().remove();
                  localStorage.removeItem('pincode');
                  pincodeNotAvailable();
            }else if(data.status==null){
                swal({
                    title: "Please enter the valid Area Pincode.",
                    icon: "warning",
                    button: "Ok"
                  });
                  $('#pincodeChange').modal('show');
            }
        
})
});