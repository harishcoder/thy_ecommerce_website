var packages = [];
var tests = [];
var offers = [];

onStartUp();

function onStartUp(){
     product_all().then((data)=>{
         var dataArray = Object.entries(data);
         console.log(dataArray);
         packages.push(dataArray[1][1].PROFILE);
         tests.push(dataArray[1][1].TESTS);
         offers.push(dataArray[1][1].OFFER);
        // console.log(packages);
         localStorage.setItem("packages",JSON.stringify(packages[0]));
         localStorage.setItem("tests",JSON.stringify(tests[0]));
         localStorage.setItem("offers",JSON.stringify(offers[0]));
        });
}

$(window).on('load',()=>{
    if(localStorage.getItem('pincode')==null){
        $('#myModal').modal('show');
    }else{
        $("#myModal").hide();
        pincodeArea();
    }
    
});

$("#pinCodeForm").submit((e)=>{
    e.preventDefault();
    var pincode=$("#pincode").val();
    pincodeApi(pincode).then((data)=>{
        localStorage.setItem('pincode',pincode);
        $("#myModal").modal("hide");
        swal({
            title: "Our services are available in your Area Pincode.",
            icon: "success",
            button: "Ok"
          });
        pincodeArea();
    })
});