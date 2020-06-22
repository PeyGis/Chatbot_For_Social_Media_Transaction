/**
 *@author Pages Coffie
 *@version Version 1.0
 *Created at 2018/07/15
 *Nsano Move-Bot Project
 */
var request = require("request");

//A class to hold all transaction objects
var Transaction = {
	walletToWallet : function(sender_wallet, sender_mno, receiver_wallet, receiver_mno, amount, callback){
		
		//prepare JSON data to be passed to the API
		var requestData = {
		    "apiKey":"0657015ea18b7233bb2841dd0499cdf4f2fce88c",
		    "module":"transfer_2_wallet",
		    "details": {
		        "sender_wallet":sender_wallet,
		        "sender":sender_wallet,
		        "recipient_wallet":receiver_wallet,
		        "sender_mno":sender_mno,
		        "recipient_mno":receiver_mno,
		        "amount":amount,
		        "description":"" 
		    } ,
		    "apiVersion":"v1_0",
		    "group":"USSD"
		};

	    //make the HTTP request and return the response to the callback (err, response, body)
	    return request({
	    method: "POST",
	    url: "http://portals.nsano.com:5063",
	    body: JSON.stringify(requestData)
	  }, callback);

	},
	walletToAccount: function(sender_wallet, sender_mno, receiver_account, receiver_bank, amount, callback){
		//prepare JSON data to be passed to the API
		var requestData = {
		    "apiKey":"0657015ea18b7233bb2841dd0499cdf4f2fce88c",
		    "module":"transfer_2_account",
		    "details": {
		        "sender_wallet":sender_wallet,
		        "recipient_account":receiver_account,
		        "sender_mno":sender_mno,
		        "recipient_bank":receiver_bank,
		        "amount":amount,
		        "description":"" 
		    },
		    "apiVersion":"v1_0",
		    "group":"USSD"
		};

	    //make the HTTP request and return the response to the callback (err, response, body)
	    return request({
	    method: "POST",
	    url: "http://portals.nsano.com:5063",
	    body: JSON.stringify(requestData)
	  }, callback);
	},

	rechargeAirtime : function(sender_wallet, sender_mno, receiver_wallet, receiver_mno, amount, callback){
		
		//prepare JSON data to be passed to the API
		var requestData = {
		    "apiKey":"0657015ea18b7233bb2841dd0499cdf4f2fce88c",
		    "module":"buy_airtime",
		    "details": {
		        "sender_wallet":sender_wallet,
		        "recipient_wallet":receiver_wallet,
		        "sender_mno":sender_mno,
		        "recipient_mno":receiver_mno,
		        "amount":amount,
		        "description":"" 
		    } ,
		    "apiVersion":"v1_0",
		    "group":"USSD"
		};

	    //make the HTTP request and return the response to the callback (err, response, body)
	    return request({
	    method: "POST",
	    url: "http://portals.nsano.com:5063",
	    body: JSON.stringify(requestData)
	  }, callback);

	},
	payMerchant : function(sender_wallet, sender_mno, service_name, service_id, amount, user_merchant_id, callback){
		
		//prepare JSON data to be passed to the API
		var service_params = {
			"amount": amount,
			"msisdn": sender_wallet,
			"network": sender_mno
		};
		var requestData = {
		  "apiKey": "0657015ea18b7233bb2841dd0499cdf4f2fce88c",
		  "module": "pay_service",
		  "details": {
		    "sender_wallet": sender_wallet,
		    "sender_mno": sender_mno,
		    "service_name": service_name,
		    "service_id": service_id,
		    "service_details": JSON.stringify(service_params),
		    "amount": amount,
		    "description": "vodafoneTokenHere"
		  },
		  "apiVersion": "v1_0",
		  "group": "USSD"
		};

	    //make the HTTP request and return the response to the callback (err, response, body)
	    return request({
	    method: "POST",
	    url: "http://portals.nsano.com:5063",
	    body: JSON.stringify(requestData)
	  }, callback);
	}

};

module.exports = Transaction;