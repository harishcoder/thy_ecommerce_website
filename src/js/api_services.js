
function product_all(){
    return new Promise((resolve,reject)=>{
        $.ajax({
            type:'GET',
            url:" https://www.thyrocare.com/API_BETA/master.svc/asvnCqhd5Kgv@uOCAHDfGt)md5hBcNMfvPgYBeIXe3s=/ALL/products ",
            success:function(data){
                resolve(data);
            },
            error:function(err){
                reject(err);
            }
        })
    })
   
}

function getAppointmentSlot(date,pincode){
    return new Promise((resolve,reject)=>{
        $.ajax({
            type:'GET',
            url: `https://www.thyrocare.com/api_beta/ORDER.svc/${pincode}/${date}/GetAppointmentSlots`,
            success:function(data){
                resolve(data);
            },
            error:function(err){
                reject(err);
            }
        })
    })
}

function pincodeApi(pincode){
    return new Promise((resolve,reject)=>{
        $.ajax({
            type:'GET',
            url: `https://www.thyrocare.com/API_BETA/order.svc/asvnCqhd5Kgv@uOCAHDfGt)md5hBcNMfvPgYBeIXe3s=/${pincode}/PincodeAvailability`,
            success:function(data){
                resolve(data);
            },
            error:function(err){
                reject(err);
            }
        })
    })
}