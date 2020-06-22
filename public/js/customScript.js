/*
Handler for when send money button is clicked
**/

$('#btnSendMoney').click(function(e) {
  e.preventDefault(); 
  var fb_user_id = $("#fb_user_id").val();
  var sender_account = $("#sender_account").val();
  var transfer_amount = $("#transfer_amount").val(); 
  var receiver_account = $("#receiver_account").val();

  validate_sender_act = validate_text_feild(sender_account, "#sender_account", "phone");
  validate_amount = validate_text_feild(transfer_amount, "#transfer_amount", "money");
  validate_receiver_act = validate_text_feild(receiver_account, "#receiver_account", "regalphanumeric");

  if(validate_sender_act && validate_amount && validate_receiver_act){
    sendMoneyAPI(fb_user_id,sender_account,transfer_amount,receiver_account);
  } else{
      displayErrorMsg("Invalid input entered");
  }
});

/*
Handler for when buy airtime button is clicked
**/

$('#btnRecharge').click(function(e) {
  e.preventDefault(); 

  var fb_user_id = $("#fb_user_id").val();
  var sender_wallet = $("#sender_wallet").val();
  var recharge_amount = $("#recharge_amount").val(); 
  var receiver_wallet = $("#receiver_wallet").val();

  validate_sender_wlt = validate_text_feild(sender_wallet, "#sender_wallet", "phone");
  validate_amount = validate_text_feild(recharge_amount, "#recharge_amount", "money");
  validate_receiver_wlt = validate_text_feild(receiver_wallet, "#receiver_wallet", "phone");

  if(validate_sender_wlt && validate_amount && validate_receiver_wlt){
    rechargeAirtimeAPI(fb_user_id,sender_wallet,recharge_amount,receiver_wallet);
  } else{
      displayErrorMsg("Invalid input entered");
  }
});

/*
Handler for when pay merchant button is clicked
**/

$('#btnPayMerchant').click(function(e) {
  e.preventDefault(); 

  var fb_user_id = $("#fb_user_id").val();
  var sender_wallet = $("#sender_wallet").val();
  var payment_amount = $("#payment_amount").val(); 
  var merchant_number = $("#merchant_number").val();

  validate_sender_wlt = validate_text_feild(sender_wallet, "#sender_wallet", "phone");
  validate_amount = validate_text_feild(payment_amount, "#payment_amount", "money");
  validate_merchant_number = validate_text_feild(merchant_number, "#merchant_number", "alphanumeric");

  if(validate_sender_wlt && validate_amount && validate_merchant_number){
    payMerchantAPI(fb_user_id,sender_wallet,payment_amount,merchant_number);
  } else{
      displayErrorMsg("Invalid input entered");
  }
});

function sendMoneyAPI(fb_user_id,sender_account,transfer_amount,receiver_account)
{ 
  showLoader();
  var data = {fb_user_id:fb_user_id, sender_account:sender_account, amount:transfer_amount, receiver_account:receiver_account};
  var serverUrl='https://new-move.herokuapp.com/sendmoney';
    $.ajax({ // jQuery Ajax
      url: serverUrl, // URL to the PHP file which will insert new value in the database
      method:'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
      timeout: 50000,
      cache: false,
      success: function(data)
      {
        console.log(data);
        $("#fb_user_id").val("");
        $("#sender_account").val("");
        $("#transfer_amount").val(""); 
        $("#receiver_account").val("");
        hideLoader();
        displaySuccessMsg(data.msg);
        if(data.code == "00"){
          window.location.href = "https://www.messenger.com/t/Moveservicegh";
        }
      },
      error: function (request, status, error)
      {
        hideLoader();
        console.log(error);
        displayErrorMsg("Error occured while processing your request. Please try again");

      }
    });
}

function rechargeAirtimeAPI(fb_user_id,sender_wallet,recharge_amount,receiver_wallet)
{
  showLoader();
  var data = {fb_user_id:fb_user_id, sender_wallet:sender_wallet, amount:recharge_amount, receiver_wallet:receiver_wallet};
  var serverUrl='https://new-move.herokuapp.com/recharge';
    $.ajax({ // jQuery Ajax
      url: serverUrl, // URL to the PHP file which will insert new value in the database
      method:'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
      timeout: 50000,
      cache: false,
      success: function(data)
      {
        hideLoader();
        console.log(data);
        $("#fb_user_id").val("");
        $("#sender_wallet").val("");
        $("#recharge_amount").val(""); 
        $("#receiver_wallet").val("");

        displaySuccessMsg(data.msg);
        if(data.code == "00"){
          window.location.href = "https://www.messenger.com/t/Moveservicegh";
        }
      },
      error: function (request, status, error)
      { 
        hideLoader();
        console.log(error);
        displayErrorMsg("Error occured while processing your request. Please try again");
      }
    });
}

function payMerchantAPI(fb_user_id,sender_wallet,payment_amount,merchant_number)
{
  showLoader();
  var data = {fb_user_id:fb_user_id, sender_wallet:sender_wallet, amount:payment_amount, merchant_number:merchant_number};
  var serverUrl='https://new-move.herokuapp.com/paymerchant';
    $.ajax({ // jQuery Ajax
      url: serverUrl, // URL to the PHP file which will insert new value in the database
      method:'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
      timeout: 50000,
      cache: false,
      success: function(data)
      {
        hideLoader();
        console.log(data);
        $("#fb_user_id").val("");
        $("#sender_wallet").val("");
        $("#payment_amount").val(""); 
        $("#merchant_number").val("");

        displaySuccessMsg(data.msg);
        if(data.code == "00"){
          window.location.href = "https://www.messenger.com/t/Moveservicegh";
        }
      },
      error: function (request, status, error)
      { 
        hideLoader();
        console.log(error);
        displayErrorMsg("Error occured while processing your request. Please try again");
      }
    });
}

function displayErrorMsg(msg){

    $("#erorMessage").html("<div class='alert alert-danger alert-dismissable fade in'><p class='text-left'>"+
        msg+"</p></div>");
    setTimeout(function() {
     $("#erorMessage").html("");
    }, 4000);
}

function displaySuccessMsg(msg){

    $("#erorMessage").html("<div class='alert alert-success alert-dismissable fade in'><p class='text-left'>"+
        msg+"</p></div>");
    setTimeout(function() {
     $("#erorMessage").html("");
    }, 4000);
}

function showLoader(){
  $("#loader").html("<img width='70' height='70' src='/images/loader.gif'>");
}
function hideLoader(){
  $("#loader").html("");

}

function validate_text_feild(value, element, inputType){

  var regemail = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  var regname = /^[a-zA-Z]+([\s\-]?[a-zA-Z])*$/;
  var regphone = /^233+\d{9}$/;
  var regph = /^0+\d{9}$/;
  var regnumeric = /^([0-9])+$/;
  var regalphanumeric = /^([0-9]|[a-zA-Z])+([0-9a-zA-Z]+)$/;
  var regmoney = /^([0-9.])+$/;

  if (inputType == 'name'){
    res = regname.test(value);
  }
  else if (inputType == 'phone'){
    res = regphone.test(value) || regph.test(value);
  }
  else if (inputType == 'email'){
    res = regemail.test(value);
  }
  else if (inputType == 'alphanumeric'){
    res = regalphanumeric.test(value);
  }
  else if (inputType == 'number'){
    res = regnumeric.test(value);
  }
  else if (inputType == 'money'){
    res = regmoney.test(value);
  }
  else{
    res = true;
  }

  if((value == "" || value == undefined) || res == false){
      if (inputType == 'empty'){
        return true;
      }

      $(element).removeAttr("border-bottom");
      $(element).removeAttr("box-shadow");
      $(element).css("border-bottom", "1px solid #FF0000");
      $(element).css("box-shadow", "0 1px 0 0 #FF0000");
      return false;
    }else{
      $(element).removeAttr("border-bottom");
      $(element).removeAttr("box-shadow");
      $(element).css("border-bottom", "1px solid #00E700");
      $(element).css("box-shadow", "0 1px 0 0 #00E700");
      return true;
    }
}