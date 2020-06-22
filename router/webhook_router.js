/**
 *@author Pages Coffie
 *@version Version 1.0
 *Created at 2018/07/15
 *Nsano Move-Bot Project
 */
        
var express = require('express');  
var request = require("request");
var voca = require('voca');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('de0fb1693e3843d8b5a9c7f9d85cdef4');
const Transaction = require('../model/transaction_model'); //reference of transaction object  
const UserSession = require('../model/user_session'); 
const Helper = require('../model/helper'); 
const CustomView = require('../model/custom_view'); 



var router = express.Router(); //create an instance of the router middleware from express

//default gateway response
router.get('/', function(req, res) { 
  res.send({message: "Welcome to Move Bot"});    
});

//test db connection route
// router.get('/testdb', function(req, res) { 
//   Transaction.getAllTransaction(function(error, row){
//     if(error){
//       res.send("Error occured while connecting to db");
//     }
//     res.send({msg: row});
//   });
// });

//0570837790
//Handler for send money POST request
router.post('/sendmoney', function(req, res){

  //try getting facebook user id
  if(req.body.fb_user_id != null  && req.body.fb_user_id != ""){
    try{

      var fb_user_id = req.body.fb_user_id;
      var amount = req.body.amount;
      var sender_wallet_number = req.body.sender_account;
      var receiver_wallet_number = req.body.receiver_account;

      //get user data and process transaction
      var user_data = UserSession.getUserData(fb_user_id);
      console.log("send money printing user data " + JSON.stringify(user_data));

      // if user data is not null, get details from the user object
      if(user_data != null){
        var sender_mno = Helper.getMobileNetworkOperator(sender_wallet_number);
        var chanel_option = user_data.transfer_option;

        if(chanel_option == "WALLET_TO_WALLET"){

            var receiver_mno = user_data.receiver_mno;
            receiver_mno = voca.substr(receiver_mno, 0, (voca.count(receiver_mno) - 8));
            Transaction.walletToWallet(sender_wallet_number, sender_mno, receiver_wallet_number, receiver_mno, amount, function(error, response, body){
            if(error){
              sendMessage(fb_user_id, {text:"Sorry we couldn't process your transaction. try again later"});
              res.send({msg: "Sorry we couldn't process your transaction. try again later"});
            }

             UserSession.clearSession(fb_user_id); //remove user from store
             var bodyObj = JSON.parse(body);
             sendMessage(fb_user_id, {text: bodyObj.msg});
            res.send(bodyObj);
           });
        } else if(chanel_option == "WALLET_TO_ACCOUNT"){

            var receiver_bank = user_data.receiver_bank;
            receiver_bank = receiver_bank.substring(0, (receiver_bank.length - 8));
            Transaction.walletToAccount(sender_wallet_number, sender_mno, receiver_wallet_number, receiver_bank, amount, function(error, response, body){
            if(error){
             // UserSession.clearSession(fb_user_id); //remove user from store
              sendMessage(fb_user_id, {text:"Sorry we couldn't process your transaction. try again later"});
              res.send({msg: "Sorry we couldn't process your transaction. try again later"});
            }

             UserSession.clearSession(fb_user_id); //remove user from store
             var bodyObj = JSON.parse(body);
             sendMessage(fb_user_id, {text: bodyObj.msg});
            res.send(bodyObj);
           });
        }
      } else{ //WHEN USER DATA RETURNS NULL
        res.send({msg: "User's session may have expired"});
      }
    }catch(error){
      res.send({msg: error.message})
    }

  } else{
      res.send({msg: "Cannot identify user or user's session may have expired"});
  }
});

//Handler for recharge airtime /data POST request
router.post('/recharge', function(req, res){

  //try getting facebook user id
  if(req.body.fb_user_id != null  && req.body.fb_user_id != ""){
    try{

      var fb_user_id = req.body.fb_user_id;
      var amount = req.body.amount;
      var sender_wallet_number = req.body.sender_wallet;
      var receiver_wallet_number = req.body.receiver_wallet;

      //get user data and process transaction
      var user_data = UserSession.getUserData(fb_user_id);
      console.log("recharge printing user data " + JSON.stringify(user_data));

      // if user data is not null, get details from the user object
      if(user_data != null){
        var sender_mno = Helper.getMobileNetworkOperator(sender_wallet_number);
        //var chanel_option = user_data.recharge_option;

            var receiver_mno = user_data.receiver_mno;
            receiver_mno = voca.substr(receiver_mno, 0, (voca.count(receiver_mno) - 8));
            Transaction.rechargeAirtime(sender_wallet_number, sender_mno, receiver_wallet_number, receiver_mno, amount, function(error, response, body){
            if(error){
              sendMessage(fb_user_id, {text:"Sorry we couldn't process your transaction. try again later"});
              res.send({msg: "Sorry we couldn't process your transaction. try again later"});
            }

             UserSession.clearSession(fb_user_id); //remove user from store
             var bodyObj = JSON.parse(body);
             sendMessage(fb_user_id, {text: bodyObj.msg});
            res.send(bodyObj);
           });
      } else{ //WHEN USER DATA RETURNS NULL
        res.send({msg: "User's session may have expired"});
      }
    }catch(error){
      res.send({msg: error.message})
    }

  } else{
      res.send({msg: "Cannot identify user or user's session may have expired"});
  }
});

//Handler for send money POST request
router.post('/paymerchant', function(req, res){

  //try getting facebook user id
  if(req.body.fb_user_id != null  && req.body.fb_user_id != ""){
    try{

      var fb_user_id = req.body.fb_user_id;
      var amount = req.body.amount;
      var sender_wallet_number = req.body.sender_wallet;
      var merchant_number = req.body.merchant_number;

      //get user data and process transaction
      var user_data = UserSession.getUserData(fb_user_id);
      console.log("pay merchant printing user data " + JSON.stringify(user_data));

      // if user data is not null, get details from the user object
      if(user_data != null){
        var sender_mno = Helper.getMobileNetworkOperator(sender_wallet_number);
        var merchant_name = user_data.merchant_name;

        if(merchant_name == "DSTV"){
            Transaction.payMerchant(sender_wallet_number, sender_mno, "DSTV", "DSTV21495116443399", amount, merchant_number, function(error, response, body){
            if(error){
              sendMessage(fb_user_id, {text:"Sorry we couldn't process your transaction. try again later"});
              res.send({msg: "Sorry we couldn't process your transaction. try again later"});
            }

             UserSession.clearSession(fb_user_id); //remove user from store
             var bodyObj = JSON.parse(body);
             sendMessage(fb_user_id, {text: bodyObj.msg});
            res.send(bodyObj);
           });
        } else if(merchant_name == "GOTV"){
            Transaction.payMerchant(sender_wallet_number, sender_mno, "DSTV", "GOTV21495116928492", amount, merchant_number, function(error, response, body){
            if(error){
             // UserSession.clearSession(fb_user_id); //remove user from store
              sendMessage(fb_user_id, {text:"Sorry we couldn't process your transaction. try again later"});
              res.send({msg: "Sorry we couldn't process your transaction. try again later"});
            }

             UserSession.clearSession(fb_user_id); //remove user from store
             var bodyObj = JSON.parse(body);
             sendMessage(fb_user_id, {text: bodyObj.msg});
            res.send(bodyObj);
           });
        }
      } else{ //WHEN USER DATA RETURNS NULL
        res.send({msg: "User's session may have expired"});
      }
    }catch(error){
      res.send({msg: error.message})
    }

  } else{
      res.send({msg: "Cannot identify user or user's session may have expired"});
  }
});

//Hander to process request from Facebook Messenger when user clicks on Visit Website to continue transaction 
router.get('/transaction/:senderId/:apiKey/:transType',function(req,res){
  var userId = req.params.senderId;
  var apiKey = req.params.apiKey;
  var transType = req.params.transType || "index";

  if (userId != '' && apiKey != '' && transType != ''){
    //makes sure its an authorizes apikey
      if(apiKey == "015ea1065733bcd5841e88c052gh9cdf4f8"){

        var user_data = UserSession.getUserData(userId);

        var sender_mno = "";
        var receiver_mno = "TIGO";
        var amount = "1";
        var toReturn;
        //validate user data
        if(user_data != null){

          //check for the transaction type performed by this user
          if(transType == "sendmoney"){
            try{

              sender_mno = user_data.sender_mno;
              sender_mno = sender_mno.substring(0, (sender_mno.length - 8));
              amount = user_data.transfer_amount;
              var chanel_option = user_data.transfer_option;

              //CHECK FOR THE CHANNEL OPTION TOO
              if(chanel_option == "WALLET_TO_ACCOUNT"){
                receiver_mno = user_data.receiver_bank;
                receiver_mno = receiver_mno.substring(0, (receiver_mno.length - 8));
              } else{ //THEN THIS IS A WALLET TO WALLET REQUEST
                receiver_mno = user_data.receiver_mno;
                receiver_mno = receiver_mno.substring(0, (receiver_mno.length - 8));
              }
              toReturn = {
                amount: amount,
                receiver_mno: receiver_mno,
                sender_mno : sender_mno,
                user_id: userId
              };
            } catch(error){
              transType = "index";
              toReturn = {};
            }
          } else if(transType == "recharge"){
            try{
              amount = user_data.recharge_amount;
              receiver_mno = user_data.receiver_mno;
              receiver_mno = receiver_mno.substring(0, (receiver_mno.length - 8));
              
              toReturn = {
                amount: amount,
                receiver_mno: receiver_mno,
                user_id: userId
              };
            }catch(error){
              transType = "index";
              toReturn = {};
            }

          } else if(transType == "paymerchant"){
            try{
              amount = user_data.payment_amount;
              merchant_name = user_data.merchant_name;            
              toReturn = {
                amount: amount,
                merchant_name: merchant_name,
                user_id: userId
              };
            }catch(error){
              transType = "index";
              toReturn = {};
            }
            
          } else{
            transType = "index";
            toReturn = {};
          }

        } //END IF USER DATA IS NULL
        else{
          transType = "index";
          toReturn={};
        }
        res.render('pages/'+transType, toReturn); 
      }else{ //when invalid API KEY is passed
        //res.sendStatus(403);
        res.render('pages/index', {}); 
      }
  }
});

  // a route to fetch news articles from an API
  router.get('/news', function(req, res){
    newsapi.v2.topHeadlines({
      category: 'business',
      country: 'us'
    }).then(response => {
      console.log(response);
      res.send(response.articles);
    });

  });

  //Facebook Webhook setup. Used for verification
  router.get("/webhook", function (req, res) {
    if (req.query["hub.verify_token"] === "move_app_webhook_token") {
      console.log("Verified webhook");
      res.status(200).send(req.query["hub.challenge"]);
    } else {
      console.error("Verification failed. The tokens do not match.");
      res.sendStatus(403);
    }
  });

  // Handle all callbacks from Messenger
  router.post("/webhook", function (req, res) {
    // Making sure this is a page subscription
    if (req.body.object == "page") {

      // Iterate over each entry
      req.body.entry.forEach(function(entry) {

        // Iterate over each messaging event
        entry.messaging.forEach(function(event) {
          //if event is a postback
          if (event.postback) {
            processPostback(event);
          }
          //if event is a message
          if (event.message) {

            //if the message is a quick reply
            if(event.message.quick_reply){
              processQuickReply(event);

              //else handle predefined commands
            }else{
              var user_input = event.message.text;
              user_input = user_input.toLowerCase();
              var senderId = event.sender.id;


              //HANDLE TRANSACTION RELATED COMMAND
              if(user_input == "hi"){
                sendMessage(senderId, {text: "Hello how may I help you?"});
              } else if (user_input == "thank you" || user_input == "thanks"){
                sendMessage(senderId, {text: "You are welcome"});
              } else if (user_input == "send money"){
                var operators = CustomView.showNetworkOperators("Select your network to send money from");
                UserSession.saveSession(senderId, "state", "SENDER_NETWORK_PAYLOAD");
                UserSession.saveSession(senderId, "transaction_type", "sendmoney");
                sendMessage(senderId, operators);
              } else if (user_input == "airtime" || user_input == "recharge"){
                UserSession.saveSession(senderId, "transaction_type", "recharge");
                UserSession.saveSession(senderId, "state", "RECHARGE_OPTION_PAYLOAD");
                var recharge_channel = CustomView.rechargeOption();
                sendMessage(senderId, recharge_channel);
              } else if (user_input == "pay" || user_input == "merchant"){
                UserSession.saveSession(senderId, "transaction_type", "paymerchant");
                UserSession.saveSession(senderId, "state", "PAY_MERCHANT_PAYLOAD");
                var show_merchants = CustomView.showMerchants();
                sendMessage(senderId, show_merchants);
              } else if (user_input == "start"){
                var startView = CustomView.startConversation("Welcome to Move");
                UserSession.clearSession(senderId); //remove user from store
                sendMessage(senderId, startView);
              } else if(user_input == "exit" || user_input == "cancel"){
                var message = "Thank you for using Move Bot. I'm available anytime to address your need";
                UserSession.clearSession(senderId); //remove user from store
                sendMessage(senderId, {text: message});
              } else if (user_input == "help"){
                sendMessage(senderId, {text: "I am trained to perform the following commands \nsend  money\nrecharge\nmerchant\npay\nairtime\nstart\nexit"});
              } else if (user_input == "ok" || user_input== "okay"){
                sendMessage(senderId, {text: "yeah"});
              } 
              /*
              *Process Frequently asked questions here
              *Idea is to define some keywords for specific questions
              */

              // what is move
              else if(voca.includes(user_input, "move") && voca.includes(user_input, "what")){
                sendMessage(senderId, {text: "Move is a mobile money platform that allows customers to conveniently transfer funds, purchase airtime and pay merchants. Customers can send money from their wallet to any wallet or to a bank account"});
              } 
              // who can use move
              else if(voca.includes(user_input, "move") && voca.includes(user_input, "who") && voca.includes(user_input, "use")){
                sendMessage(senderId, {text: "Any valid registered Mobile money user in Ghana can access and use the Move platform."});
              } // Do I need to register before I can use Move
              else if(voca.includes(user_input, "move") && voca.includes(user_input, "need") && voca.includes(user_input, "register") && voca.includes(user_input, "use")){
                sendMessage(senderId, {text: "No. There’s no registration required for Move. Simply Dial *718# and Move!"});
              }
              // Are there any charges applied on the transaction?
              else if(voca.includes(user_input, "charge") && voca.includes(user_input, "transaction")){
                sendMessage(senderId, {text: "You will be charges 1.5 % of the amount you’re moving from your wallet to any wallet or account."});
              } // What’s the maximum amount I can move for a transaction?
              else if(voca.includes(user_input, "max") && voca.includes(user_input, "amount") && voca.includes(user_input, "transaction")){
                sendMessage(senderId, {text: "You can move up to GHC 1000 per transaction."});
              } // What’s the maximum amount I can move in a day?
              else if(voca.includes(user_input, "max") && voca.includes(user_input, "amount") && voca.includes(user_input, "day")){
                sendMessage(senderId, {text: "You can move up to GHC 2,000 in a day"});
              } // How can I contact Move?
              else if(voca.includes(user_input, "move") && voca.includes(user_input, "contact")){
                sendMessage(senderId, {text: "You can reach us on our WhatsApp line 0545442469. Or you can call our support team on 0303976999"});
              }
              //END OF FAQs
              else{

              //Logic to handle state of the user's interaction with the bot 
              var state = UserSession.getUserState(senderId);
              if(state != null){

                switch(state){
                  //After user(sender) has selected his network and is about to choose the channel option 
                  case "CHANNEL_SELECTION_PAYLOAD":

                    if(user_input == "account"){
                      let message = CustomView.showBanks();
                      UserSession.saveSession(senderId, "state", "ACCOUNT_PAYLOAD");
                      UserSession.saveSession(senderId, "transfer_option", "WALLET_TO_ACCOUNT");
                      sendMessage(senderId, message);

                    } else if (user_input == "wallet"){
                      var operators = CustomView.showNetworkOperators("Select receipient's network");
                      UserSession.saveSession(senderId, "state", "WALLET_PAYLOAD");
                      UserSession.saveSession(senderId, "transfer_option", "WALLET_TO_WALLET");
                      sendMessage(senderId, operators);

                    } else{  //when user after selecting send money doesn't provide a valid input
                      sendMessage(senderId, {text: "You requested to transfer money but it appears your typed a wrong input.\nType help to display the commands I understand"});
                    }
                    break;

                  //Handle merchants
                  case "PAY_MERCHANT_PAYLOAD":

                    if(voca.includes(user_input, "dstv")){
                      let message = {
                        "text": "Alright, your request to pay DSTV is received. Kindly enter the amount"
                      };

                    UserSession.saveSession(senderId, "state", "MERCHANT_AMOUNT_PAYLOAD"); 
                    UserSession.saveSession(senderId, "merchant_name", "DSTV"); 
                    sendMessage(senderId, message);

                    } else if (voca.includes(user_input, "gotv")){
                      let message = {
                        "text": "Alright, your request to pay GOTV is received. Kindly enter the amount"
                      };

                    UserSession.saveSession(senderId, "state", "MERCHANT_AMOUNT_PAYLOAD"); 
                    UserSession.saveSession(senderId, "merchant_name", "GOTV"); 
                    sendMessage(senderId, message);

                    } else{  //when user after selecting pay merchant doesn't provide a valid input
                      sendMessage(senderId, {text: "Oops!!! The merchant you entered isn't supported yet. I can only help you pay your DSTV and GOTV bills."});
                    }
                    break;

                  case "NETWORK_OPERATOR_PAYLOAD":
                    //validate recipient's number
                    if(user_input.match(/^[0-9]{10,12}$/)){
                      let message = {
                        "text": "Good, you requested to transfer money to " + event.message.text + ". Please enter the amount"
                      };
                      UserSession.saveSession(senderId, "state", "TRANSFER_WALLET_AMOUNT_PAYLOAD"); 
                      UserSession.saveSession(senderId, "receiver_wallet_number", event.message.text); 
                      sendMessage(senderId, message);
                    } else{
                      let message = {
                        "text": "Hmmmm, looks like you entered an incorrect phone number. Kindly try again"
                      };
                      sendMessage(senderId, message);
                    }
                    break;  

                  case "TRANSFER_AMOUNT_PAYLOAD":
                    //validate amount
                    if(user_input.match(/^[0-9.]+$/)){
                      //catch when amount is above GHS 1000
                      if(parseInt(user_input) > 1000){
                        let max_amount = {
                        "text": "Oops you can only move up to GH¢ 1000 per transaction. Please reduce the amount"
                      };
                      sendMessage(senderId, max_amount);
                      } else{
                        let security_issue = {
                        "text": "We'll need a few details and security checks before we process your request. Would you like to continue?"
                        };
                        sendMessage(senderId, security_issue);

                        setTimeout(function () {
                          let message = CustomView.securityOptIn();

                          UserSession.saveSession(event.sender.id, "state", "TRANSFER_WEBSITE_LINK");
                          UserSession.saveSession(event.sender.id, "transfer_amount", user_input);  
                          sendMessage(event.sender.id, message);  
                        }, 500); 
                      }
                    } else{
                      let message = {
                        "text": "Oops, you entered an incorrect amount. For instance, type 50 if you want to transfer GH¢ 50"
                      };

                      sendMessage(senderId, message);
                    } 
                    break; 

                  case "RECHARGE_AMOUNT_PAYLOAD":
                    //validate amount
                    if(user_input.match(/^[0-9.]+$/)){

                       //catch when amount is above GHS 1000
                      if(parseInt(user_input) > 1000){
                        let max_amount = {
                        "text": "Hmmmm, I can only help you move up to GH¢ 1000 per transaction. Please reduce the amount"
                      };
                      sendMessage(senderId, max_amount);
                      } else{

                        var security_issue = {};
                        var user_data = UserSession.getUserDataWithKey(senderId, "receiver_mno");
                        user_data = user_data.substring(0, (user_data.length - 8));
                        var recharge_option = UserSession.getUserDataWithKey(senderId, "recharge_option") || "airtime/data";

                        if(user_data != null || typeof user_data != 'undefined'){
                          security_issue = {
                            "text": " You're about to purchase "+recharge_option.toLowerCase()+" worth GH¢ " + user_input +" to " + user_data + " user. For security reasons, we'll collect your wallet details on our secured page. Click on the link below to continue or type exit to cancel"
                            };
                        } else{
                          security_issue = {
                            "text": " You're about to purchase "+recharge_option.toLowerCase()+" worth GH¢ " + user_input +" to the above network operator. For security reasons, we'll collect your wallet account details on our secured page. Click on the link below to continue or type exit to cancel"
                            };
                        }
                        sendMessage(senderId, security_issue);

                        setTimeout(function () {

                          UserSession.saveSession(senderId, "recharge_amount", user_input);
                          UserSession.saveSession(senderId, "state", "RECHARGE_WEBSITE_LINK");
                          var move_site = "https://new-move.herokuapp.com/transaction/"+ senderId + "/015ea1065733bcd5841e88c052gh9cdf4f8/recharge";
                          let message = CustomView.linkToMoveWebsite(move_site);
                          sendMessage(senderId, message);
                        }, 500); 
                      }
                    } else{
                      let message = {
                        "text": "Hmmmm, Looks like you entered an incorrect amount. Lemme help you. Example, for GH¢ 15 airtime topup, simply enter 15"
                      };

                      sendMessage(senderId, message);
                    } 
                    break; 

                  case "MERCHANT_AMOUNT_PAYLOAD":
                    //validate amount
                    if(user_input.match(/^[0-9.]+$/)){
                       //catch when amount is above GHS 1000
                      if(parseInt(user_input) > 1000){
                        let max_amount = {
                        "text": "Uhhmm there's a little problem. You can only move up to GH¢ 1000 per transaction. Please reduce the amount"
                      };
                      sendMessage(senderId, max_amount);
                      }else{
                        var security_issue = {};
                        var user_data = UserSession.getUserDataWithKey(senderId, "merchant_name");

                        if(user_data != null || typeof user_data != 'undefined'){
                          security_issue = {
                            "text": " You're about to pay GH¢ " + user_input +" to your " + user_data + " account. For security reason, we'll collect your merchant account information on our secured page. Click on the link below to continue your payment or type exit to cancel"
                            };
                        } else{
                          security_issue = {
                            "text": " You're about to pay GH¢ " + user_input +" to the above merchant. For security reason, we'll collect your merchant account information on our secured page. Click on the link below to continue your payment or type exit to cancel"
                            };
                        }
                        sendMessage(senderId, security_issue);

                        setTimeout(function() {
                          UserSession.saveSession(senderId, "payment_amount", user_input);  
                          var move_site = "https://new-move.herokuapp.com/transaction/"+ senderId + "/015ea1065733bcd5841e88c052gh9cdf4f8/paymerchant";
                          let message = CustomView.linkToMoveWebsite(move_site);
                          sendMessage(senderId, message);
                        }, 500);
                      }

                    } else{
                      let message = {
                        "text": "Oops... Looks like you entered an incorrect amount. To pay GH¢ 15 to DSTV or GOTV, just enter 15"
                      };

                      sendMessage(senderId, message);
                    } 
                    break;

                  case "RECOMMEND_FRIEND_PAYLOAD":

                    //validate phone number
                    var reg1 = /^233+\d{9}$/;
                    var reg2 = /^0+\d{9}$/;
                    if(reg1.test(user_input) || reg2.test(user_input)){
                        let message = {
                        "text": "Your request is received. We'll notify you when it's fully processed"
                      };
                      sendMessage(senderId, message);
                      
                    } else{
                      let message = {
                        "text": "Oops... Looks like you entered an incorrect number."
                      };

                      sendMessage(senderId, message);
                    } 
                    break;

                  default:
                  trainedModel(event);
                  break;
                }
              } else {
                  trainedModel(event);
                }

              } //END ELSE PREDEFINED COMMANDS
            }
          } //end event.message
        });
    });

      res.sendStatus(200); //send response status to Messenger
    }
  });

//function to process quick replies sent to messenger
function processQuickReply(event) {
  var senderId = event.sender.id;
  var reply_payload = event.message.quick_reply.payload;

  if(reply_payload === "MTN_PAYLOAD" || reply_payload === "TIGO_PAYLOAD" || reply_payload === "VODAFONE_PAYLOAD" || reply_payload === "AIRTEL_PAYLOAD"){
    //get user state and process quick reply it accordingly
    var state = UserSession.getUserState(senderId);
    if(state != null){
      var trans_type = UserSession.getUserDataWithKey(senderId, "transaction_type");

      if(typeof trans_type != 'undefined' || trans_type != null){
        switch(trans_type){

          case "sendmoney":
            //Just after user selected his / her network operator quick reply
            if(state == "SENDER_NETWORK_PAYLOAD"){
                let message = CustomView.transferChannel();

                UserSession.saveSession(senderId, "state", "CHANNEL_SELECTION_PAYLOAD");
                UserSession.saveSession(senderId, "sender_mno", reply_payload); 
                sendMessage(senderId, message);
                //after displaying network for buy airtime/ data
            } else{
                network = reply_payload.substring(0, (reply_payload.length - 8));
                let message = {
                  "text": "Good, You requested to transfer money to " +  network + " user. Please enter the amount"
                };
                UserSession.saveSession(senderId, "state", "TRANSFER_AMOUNT_PAYLOAD"); 
                UserSession.saveSession(senderId, "receiver_mno", reply_payload); 
                sendMessage(senderId, message);
              }

            break;

          case "recharge":
            if(state == "RECHARGE_OPTION_PAYLOAD"){
              var message = {};
              var recharge_option = UserSession.getUserDataWithKey(senderId, "recharge_option");
              if (typeof recharge_option != 'undefined' || recharge_option != null){
                 message = {
                  "text": "Enter the amount of " +  recharge_option.toLowerCase() + " you want to purchase"
                };
              } else{
                message = {
                  "text": "Please enter the amount of data / airtime you requested to purchase"
                }
              }
              UserSession.saveSession(senderId, "state", "RECHARGE_AMOUNT_PAYLOAD"); 
              UserSession.saveSession(senderId, "receiver_mno", reply_payload); 
              sendMessage(senderId, message);
            } else{
              var message = "I seem not to understand this recharge request. Type recharge or airtime to start a new transaction";
              sendMessage(senderId, {text: message});
            }
            break;

          default:
            var message = "sorry I can't help you with this request. Type help to access the command I understand";
            sendMessage(senderId, {text: message});
            break;
        }
      } else{
        var message = "Sorry I cannot process your request. Please type start to begin a new transaction";
        sendMessage(senderId, {text: message});
      }
  }else{  //when user state returns null
    var message = "I understand you want to ask something but I'm sorry I can't help you. Type help to access the command I understand";
    sendMessage(senderId, {text: message});
  }
} 
//When user clicks on bank / account option
else if(reply_payload === "ACCESS_BANK_PAYLOAD" || reply_payload === "UNIBANK_PAYLOAD" || reply_payload ==="FIDELITY_BANK_PAYLOAD"){
  user_bank = reply_payload.substring(0, (reply_payload.length - 8));
  user_bank = voca.replaceAll(user_bank, '_', ' ');
  let message = {
    "text": "Good, You requested to transfer money to " +  user_bank + " user. Please enter the amount"
  };

  UserSession.saveSession(senderId, "state", "TRANSFER_AMOUNT_PAYLOAD"); 
  UserSession.saveSession(senderId, "receiver_bank", reply_payload); 
  sendMessage(senderId, message);

} //when user wants to pay a merchant, handle the response here
 else if(reply_payload === "DSTV_PAYLOAD" || reply_payload === "GOTV_PAYLOAD"){
  user_merchant = reply_payload.substring(0, (reply_payload.length - 8));
  let message = {
    "text": "Alright, your request to pay " +  user_merchant + " is received. Kindly enter the amount"
  };

  UserSession.saveSession(senderId, "state", "MERCHANT_AMOUNT_PAYLOAD"); 
  UserSession.saveSession(senderId, "merchant_name", user_merchant); 
  sendMessage(senderId, message);


} //when user selects recommend friend 
else if(reply_payload === "RECOMMEND_FRIEND_PAYLOAD"){
    let message = {
    "text": "Enter your friends number and get instant points"
  };
  UserSession.saveSession(senderId, "state", "RECOMMEND_FRIEND_PAYLOAD"); 
  sendMessage(senderId, message);

}//when user clicks on check your point 
else if(reply_payload === "CHECK_POINT_PAYLOAD"){
  let message = {
    "text": "I understand you want to check your points but this feature is not yet implemented. Check back soon"
  };
  UserSession.saveSession(senderId, "state", "CHECK_POINT_PAYLOAD"); 
  sendMessage(senderId, message);
} 
 //PROCESS FAQs HERE 
// what is move
  else if(reply_payload === "WHAT_MOVE_PAYLOAD"){
    sendMessage(senderId, {text: "Move is a mobile money platform that allows customers to conveniently transfer funds, purchase airtime and pay merchants. Customers can send money from their wallet to any wallet or to a bank account"});
  } 
  // who can use move
  else if(reply_payload === "MOVE_USERS_PAYLOAD"){
    sendMessage(senderId, {text: "Any valid registered Mobile money user in Ghana can access and use the Move platform."});
  } // Do I need to register before I can use Move
  else if(reply_payload === "MOVE_REGISTRATION_PAYLOAD"){
    sendMessage(senderId, {text: "No. There’s no registration required for Move. Simply Dial *718# and Move!"});
  }
  // Are there any charges applied on the transaction?
  else if(reply_payload === "MOVE_CHARGES_PAYLOAD"){
    sendMessage(senderId, {text: "You will be charges 1.5 % of the amount you’re moving from your wallet to any wallet or account."});
  } // What’s the maximum amount I can move for a transaction?
  else if(reply_payload === "MAX_TRANSACTION_PAYLOAD"){
    sendMessage(senderId, {text: "You can move up to GHC 1000 per transaction. Also, you can move up to GHC 2,000 in a day"});
  } // How can I contact Move?
  else if(reply_payload === "MOVE_CONTACT_PAYLOAD"){
    sendMessage(senderId, {text: "You can reach us on our WhatsApp line 0545442469. Or you can call our support team on 0303976999"});
  } //What happens if money transferred is not delivered to the wallet I intended to send to?
  else if(reply_payload === "TRANS_REVERSAL_PAYLOAD"){
    sendMessage(senderId, {text: "When your transaction doesn't go through well, the money will be refunded to the sender"});
  }
  else{
      let message = {
    "text": "It's either I dont understand your request or this feature is still in development"
  };
  sendMessage(senderId, message);
    }
}

//function to process postbacks sent to messenger
function processPostback(event) {
  var senderId = event.sender.id;
  var payload = event.postback.payload;

  //when a user clicks on the GET STARTED button or the LET'S MOVE button
  if (payload === "Greeting" || payload === "MOVE_PAYLOAD") {
    // Get user's first name from the User Profile API
    // and include it in the greeting
    request({
      url: "https://graph.facebook.com/v2.6/" + senderId,
      qs: {
        access_token: process.env.PAGE_ACCESS_TOKEN,
        fields: "first_name"
      },
      method: "GET"
    }, function(error, response, body) {
      var greeting = "";
      if (error) {
        console.log("Error getting user's name: " +  error);
      } else {
        var bodyObj = JSON.parse(body);
        name = bodyObj.first_name;
        greeting = "Hi " + name + ". Welcome to Move";
      }

    var message = CustomView.startConversation(greeting);
    //save user state
    UserSession.saveSession(senderId, "state", "INITIALIZATION");
    //finally send the message
    sendMessage(senderId, message);
  }); 
  }
  //when user clicks on EXIT button
  else if(payload === "EXIT_PAYLOAD"){
    var message = "Thank you for using Move Bot. Hope to see you back here";

    UserSession.clearSession(senderId); //remove user from store
    sendMessage(senderId, {text: message});
  } 
  //when user clicks on send money or transfer button
  else if(payload === "TRANSFER_PAYLOAD"){
    var operators = CustomView.showNetworkOperators("Select your network to send money from");
    UserSession.saveSession(senderId, "state", "SENDER_NETWORK_PAYLOAD");
    UserSession.saveSession(senderId, "transaction_type", "sendmoney");
    sendMessage(senderId, operators);
  }
  //When user selects account option
  else if(payload === "ACCOUNT_PAYLOAD"){
    let message = CustomView.showBanks();
    UserSession.saveSession(senderId, "state", "ACCOUNT_PAYLOAD");
    UserSession.saveSession(senderId, "transfer_option", "WALLET_TO_ACCOUNT");
    sendMessage(senderId, message);
  }
    //When user selects wallet option
    else if(payload === "WALLET_PAYLOAD"){
      var operators = CustomView.showNetworkOperators("Select receipient's network");
      UserSession.saveSession(senderId, "state", "WALLET_PAYLOAD");
      UserSession.saveSession(senderId, "transfer_option", "WALLET_TO_WALLET");
      sendMessage(senderId, operators);
    }
    //When user selects recharge data or airtime
    else if(payload === "RECHARGE_PAYLOAD"){
      var recharge_channel = CustomView.rechargeOption();
      UserSession.saveSession(senderId, "state", "RECHARGE_OPTION_PAYLOAD");
      UserSession.saveSession(senderId, "transaction_type", "recharge");
      sendMessage(senderId, recharge_channel);
    }
        //When user selects topup airtime option
    else if(payload === "AIRTIME_PAYLOAD"){
      var operators = CustomView.showNetworkOperators("Which network are your purchasing airtime for?");
      UserSession.saveSession(senderId, "state", "RECHARGE_OPTION_PAYLOAD");
      UserSession.saveSession(senderId, "recharge_option", "AIRTIME");
      sendMessage(senderId, operators);
    }
        //When user selects buy data option
    else if(payload === "DATA_PAYLOAD"){
      var operators = CustomView.showNetworkOperators("Which network are your buying data for?");
      UserSession.saveSession(senderId, "state", "RECHARGE_OPTION_PAYLOAD");
      UserSession.saveSession(senderId, "recharge_option", "DATA");

      sendMessage(senderId, operators);
    }
    //when user selects pay merchant
    else if(payload === "PAY_MERCHANT_PAYLOAD"){
      let message = CustomView.showMerchants();
      UserSession.saveSession(senderId, "state", "PAY_MERCHANT_PAYLOAD"); 
      UserSession.saveSession(senderId, "transaction_type", "paymerchant");
      sendMessage(senderId, message);
    } 
    else if(payload === "HELP_PAYLOAD"){
    sendMessage(senderId, {text: "I am trained to help you with the following commands \nsend  money\nrecharge\nmerchant\nairtime\nstart\nexit"});
    }
     //when user selects tell a friend
    else if(payload === "TELL_FRIEND_PAYLOAD"){
      let message = CustomView.TellAFriendView();
      UserSession.saveSession(senderId, "state", "TELL_FRIEND_PAYLOAD"); 
      UserSession.saveSession(senderId, "transaction_type", "tell_a_friend");
      sendMessage(senderId, message);
    } 
    else if(payload === "MOVE_FAQS_PAYLOAD"){
      let message = CustomView.moveInfo();
      UserSession.saveSession(senderId, "state", "MOVE_FAQS_PAYLOAD");   
      sendMessage(senderId, message);
    } 
    else if(payload === "PAYMENT_SYSTEM_PAYLOAD"){
      let message = CustomView.paymentSystem();
      sendMessage(senderId, message);
    } 
    else if(payload === "FINANCE_NEWS_PAYLOAD"){
      let message = CustomView.financeNews();
      sendMessage(senderId, message);
    } 
    else if(payload === "YES_CONTINUE_SECURITY_PAYLOAD"){
      //get user data and customize response
      let security_issue = {
          "text": "We'll collect your account information on our secured website due to security reasons. Click on the link below to continue or type exit to cancel"
          };
      sendMessage(senderId, security_issue);

      setTimeout(function() {
        var trans_type = UserSession.getUserDataWithKey(senderId, "transaction_type");
        var move_site = "";
        if(typeof trans_type != 'undefined' || trans_type != null){
          move_site = "https://new-move.herokuapp.com/transaction/"+ senderId + "/015ea1065733bcd5841e88c052gh9cdf4f8/"+trans_type;
        } else{
          move_site = "https://new-move.herokuapp.com/transaction/"+ senderId + "/015ea1065733bcd5841e88c052gh9cdf4f8/index";
        }
        let message = CustomView.linkToMoveWebsite(move_site);
        sendMessage(senderId, message);
      }, 500);

    } 
    else if(payload === "NO_CONTINUE_SECURITY_PAYLOAD"){
      var message = "Sorry, you cancelled your transaction. Type start to begin a new transaction";
      UserSession.clearSession(senderId); //remove user from store
      sendMessage(senderId, {text: message});
    } else{
      var message = "Your request is yet to be implemented. Type help to access the commands I understand";
      sendMessage(senderId, {text: message});
    }
  } //END PROCESS POSTBACK FUNCTION

// sends message to user
function sendMessage(recipientId, message) {
  request({
    url: "https://graph.facebook.com/v2.6/me/messages",
    qs: {access_token: process.env.PAGE_ACCESS_TOKEN},
    method: "POST",
    json: {
      recipient: {id: recipientId},
      message: message,
    }
  }, function(error, response, body) {
    if (error) {
      console.log("Error sending message: " + response.error);
    }
  });
}

//if the bot does not understand the request, show this default template
function trainedModel(event){
  var senderId = event.sender.id;
  var message = CustomView.trainedModel();
  sendMessage(senderId, message);
}

module.exports = router;  //export the router to index page for used by express app