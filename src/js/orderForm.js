var orderDetails = JSON.parse(localStorage.getItem('benDetails'));
var amount=localStorage.getItem('amount');
var orderBen=' ';
var orderSummary =' ';
var appointmentSlot=' ';
var orderSummaryArray=[];
var c;
var pincode;
var appDate;
var homeCharges;
var reportCharges;
console.log(orderDetails);
$("#timeSlots").hide();
$.each(orderDetails,(index,data)=>{
    orderSummary=' ';
    orderBen+=`<div class="row mt-2">
                    <div class="col-md-5">
                    <h5>${data.name}</h5>
                    </div>
                    <div class="col-md-4">
                    <p>${data.age} years</p>
                    </div>
                    <div class="col-md-3">
                    <p>${data.gender}</p>
                    </div>
                    </div>
                    <div class="row" id="benTestsDetails${index+1}">
                    </div>
                    <hr>
                    `;
    $.each(data.tests,(index,data)=>{
       orderSummary+=`<div class=col-md-8>${data.name}</div>
                     <div class=col-md-4>${data.amount}</div>`;
        })
        orderSummaryArray.push(orderSummary);
    c++;
})

$('#orderSummaryDetails').html(orderBen);
 $.each(orderSummaryArray,(index,data)=>{
     var c= index+1;
     $('#benTestsDetails'+c).html(data);
 })

 var footer =`<br><br>
                <div class="card-footer">
                <h5>Total Amount : ${amount}</h5>
                </div>`
 $('.card-body').append(footer);

$("#appointment").datepicker({
    dateFormat: "yy-mm-dd",
    minDate: new Date(),
    changeMonth: true,
    onSelect: function (selected) {
        var reg=new RegExp("^[1-9][0-9]{5}$");
        appDate=selected;
        console.log(appDate);
        pincode=$("#pincode").val();
        if(pincode ==""){
            $('#pincode').after('<p>Please enter pincode first and then select date.</p>');
        }else if(!reg.test(pincode)){
            $("#pincode").after("<p>Please enter valid pincode</p>")
        }else{
            getAppointmentSlot(selected,pincode).then((data)=>{
                console.log(data.LSlotDataRes);
                if(data.LSlotDataRes.length!=0){
                    $("#appointment").next().remove();
                    $("#timeSlots").show();
                    $.each(data.LSlotDataRes,(index,data)=>{
                        appointmentSlot+=`<option value="${data.Slot}">${data.Slot}</option>`;
                    })
                
                $('#timeSlotOption').after(appointmentSlot);
                appointmentSlot=' ';
                }else{
                    $('#appointment').after('<p>No time-slot is available for this date.Please select other date.</p>')
                }
            })
        }
    }
});

$('#pincode').keypress(()=>{
    $('#pincode').siblings('p').remove();
})

$('input[name="homeCollection"]').click(()=>{
    homeCharges = $('input[name="homeCollection"]:checked').val();
    if(homeCharges=='yes'){
        $('#collectionCharges').append('<p class="ml-5">* Charges will be applicable.</p>')
    }else{
        $('#collectionCharges').children('p').remove();
    }
})

$('input[name="reports"]').click(()=>{
    reportCharges = $('input[name="reports"]:checked').val();
    if(reportCharges=='yes'){
        $('#reportsCharges').append('<p class="ml-5">* Rs.50 will be charged.</p>')
    }else{
        $('#reportsCharges').children('p').remove();
    }
})

$("#name").focusout(()=>{
    $("#name").siblings('p').remove();
    var reg = new RegExp("[A-Za-z]{3}");
    var name=$("#name").val();
    if(name.length!=0){
        if(!reg.test(name)){
            $("#name").after("<p>Please enter valid name.</p>");
        }
    }else{
            $("#name").after("<p>This field is required.</p>");
    }
})


$("#pincode").focusout(()=>{
    $("#pincode").next('p').remove();
    var reg=new RegExp("^[1-9][0-9]{5}$");
    pincode=$("#pincode").val();
    if(pincode.length!=0){
        if(!reg.test(pincode)){
            $("#pincode").after("<p>Please enter valid pincode</p>");
        }
    }else{
        $("#pincode").after("<p>This field is required</p>");
    }
})

$("#mobile").focusout(()=>{
    $("#mobile").next('p').remove();
    var reg=new RegExp("^([+][9][1]|[9][1]|[0]){0,1}([7-9]{1})([0-9]{9})$");
    var mobile=$("#mobile").val();
    if(mobile.length!=0){
        if(!reg.test(mobile)){
            $("#mobile").after("<p>Please enter valid mobile number.</p>");
        }
    }else{
        $("#mobile").after("<p>This field is required</p>");
    }
})

$("#email").focusout(()=>{
    $("#email").next('p').remove();
    var reg=new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");
    var email=$("#email").val();
    if(email.length!=0){
        if(!reg.test(email)){
            $("#email").after("<p>Please enter valid email id.</p>");
        }
    }else{
        $("#email").after("<p>This field is required</p>");
    }
})

//$("#formValidation").validate();
$('form').submit((e)=>{
    var bendata=' ';
    var benDataBen=' ';
    e.preventDefault();
    var date = new Date();
    var components = [
        date.getYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
    ];

    var id = components.join("");

    $.each(orderDetails,(index,data)=>{
        if(data.gender = "MALE"){
            var gen="M";
        }else{
            var gen="F";
        }
        benDataBen+=`<Ben_details><Name>${data.name}</Name>
                                <Age>${data.age}</Age>
                                <Gender>${gen}</Gender>
                                </Ben_details>`;
    })
        
        benData=`<NewDataSet>${benDataBen}</NewDataSet>`;
    
    var name=$("#name").val();
    var address=$("#address").val();
    var timeSlot= $("#slotOptions option:selected").val();
    var mobile=$("#mobile").val();
    var email=$("#email").val();
    var serviceType=$("#service").val();
    var offerCode=$("#offer").val();
    var payType = $("#payment").val();
    var benCount = $("#ben").val();
    
    var personDetails={
        order_by:name,
        address:address,
        mobile:mobile,
        email:email,
        service_type:serviceType,
        report_code:offerCode,
        pay_type:payType,
        benCount:benCount,
        hc:homeCharges,
        reports:reportCharges,
        pincode:pincode,
        rate:amount,
        orderid:id,
        bendataxml:benData
    }

    console.log(personDetails);

 })
 