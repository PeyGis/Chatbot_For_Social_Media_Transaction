/**
 *@author Pages Coffie
 *@version Version 1.0
 *Created at 2018/07/15
 *Nsano Move-Bot Project
 */
 //A class that creates view for user actions and intents
var CustomView = {

	startConversation: function(text){
	    let message = {
	      attachment: {
	        type: "template",
	        payload: {
	          template_type: "generic",
	          elements: [
	          {
	            title: text,
	            subtitle: "I am your finance assistant. Pick an option or swipe right for more",
	            image_url: "https://new-move.herokuapp.com/images/movelogo.png",
	            buttons: [{
	              type: "postback",
	              title: "Send Money",
	              payload: "TRANSFER_PAYLOAD"
	            }, {
	              type: "postback",
	              title: "Buy Data / Airtime",
	              payload: "RECHARGE_PAYLOAD"
	            },
	            {
	              type: "postback",
	              title: "Pay Merchant",
	              payload: "PAY_MERCHANT_PAYLOAD"
	            }]
	          },
	          {
	            title: "Welcome to Move",
	            subtitle: "Your finance assistant. How may we help you?",
	            image_url: "https://new-move.herokuapp.com/images/movelogo.png",
	            buttons: [ {
	              type: "postback",
	              title: "Tell a friend",
	              payload: "TELL_FRIEND_PAYLOAD"
	            },
	            {
	              type: "postback",
	              title: "Help",
	              payload: "HELP_PAYLOAD"
	            },
	            {
	              type: "postback",
	              title: "Exit Move",
	              payload: "EXIT_PAYLOAD"
	            }]
	          },
	          ]
	        }
	      }
	    };
	    return message;
	},

	transferChannel: function(){
		let message = {
          attachment: {
            type: "template",
            payload: {
              template_type: "generic",
              elements: [
              {
                title: "Send money to",
                subtitle: "Select channel option",
                buttons: [{
                  type: "postback",
                  title: "Wallet",
                  payload: "WALLET_PAYLOAD"
                }, {
                  type: "postback",
                  title: "Account",
                  payload: "ACCOUNT_PAYLOAD"
                }]
              },
              ]
            }
          }
        };
        return message;
	},
	rechargeOption: function(){
		let message = {
	      attachment: {
	        type: "template",
	        payload: {
	          template_type: "generic",
	          elements: [
	          {
	            title: "Select recharge otion",
	            subtitle: "either topup aitime or buy data",
	            buttons: [{
	              type: "postback",
	              title: "Topup Airtime",
	              payload: "AIRTIME_PAYLOAD"
	            }, {
	              type: "postback",
	              title: "Buy Data",
	              payload: "DATA_PAYLOAD"
	            }]
	          },
	          ]
	        }
	      }
	    };
	    return message;
	},

	securityOptIn: function(){
	    let message = {
	      attachment: {
	        type: "template",
	        payload: {
	          template_type: "generic",
	          elements: [
	          {
	            title: "Security Check",
	            subtitle: "Click Yes to continue or No to cancel",
	            buttons: [{
	              type: "postback",
	              title: "Yes, continue",
	              payload: "YES_CONTINUE_SECURITY_PAYLOAD"
	            }, {
	              type: "postback",
	              title: "No",
	              payload: "NO_CONTINUE_SECURITY_PAYLOAD"
	            }]
	          },
	          ]
	        }
	      }
	    };
	    return message;
	},

	confirmWalletTransfer: function(text){
		let message = {
          attachment: {
            type: "template",
            payload: {
              template_type: "generic",
              elements: [
              {
                title: "Confirm Transfer",
                subtitle: text,
                buttons: [{
                  type: "postback",
                  title: "Yes, continue",
                  payload: "YES_CONFIRM_WALLET_PAYLOAD"
                }, {
                  type: "postback",
                  title: "No, not now",
                  payload: "NO_CONFIRM_WALLET_PAYLOAD"
                }]
              },
              ]
            }
          }
        };
        return message;
	},

	confirmAccountTransfer: function(text){
		let message = {
          attachment: {
            type: "template",
            payload: {
              template_type: "generic",
              elements: [
              {
                title: "Confirm Transfer",
                subtitle: text,
                buttons: [{
                  type: "postback",
                  title: "Yes, continue",
                  payload: "YES_CONFIRM_ACCOUNT_PAYLOAD"
                }, {
                  type: "postback",
                  title: "No, not now",
                  payload: "NO_CONFIRM_ACCOUNT_PAYLOAD"
                }]
              },
              ]
            }
          }
        };
        return message;

	},
	showBanks: function(){
		let message = {
	      "text": "Select Bank",
	      "quick_replies":[
	      {
	        "content_type":"text",
	        "title":"Access Bank",
	        "payload":"ACCESS_BANK_PAYLOAD"
	      },
	      {
	        "content_type":"text",
	        "title":"UniBank",
	        "payload":"UNIBANK_PAYLOAD"
	      },
	      {
	        "content_type":"text",
	        "title":"Fidelity Bank",
	        "payload":"FIDELITY_BANK_PAYLOAD"
	      }
	      ]
	    };
	    return message;
	},

	showMerchants: function(){
		let message = {
	      "text": "Select your merchant",
	      "quick_replies":[
	      {
	        "content_type":"text",
	        "title":"DSTV",
	        "payload":"DSTV_PAYLOAD"
	      },
	      {
	        "content_type":"text",
	        "title":"GOTV",
	        "payload":"GOTV_PAYLOAD"
	      }
	      ]
	    };
	    return message;
	},

	TellAFriendView: function(){
		let message = {
	      "text": "Recommend more than 3 people and earn points which is converted as cash to your wallet",
	      "quick_replies":[
	      {
	        "content_type":"text",
	        "title":"Recommend a friend",
	        "payload":"RECOMMEND_FRIEND_PAYLOAD"
	      },
	      {
	        "content_type":"text",
	        "title":"Check your points",
	        "payload":"CHECK_POINT_PAYLOAD"
	      }
	      ]
	    };
	    return message;
	},

	tellAFriendOption: function(){
		let message = {
	      "text": "Okay pick an option to continue",
	      "quick_replies":[
	      {
	        "content_type":"text",
	        "title":"Okay, I'm in!",
	        "payload":"YES_TAF_PAYLOAD"
	      },
	      {
	        "content_type":"text",
	        "title":"Sorry I can't",
	        "payload":"CANCEL_TAF_PAYLOAD"
	      }
	      ]
	    };
	    return message;
	},

	showNetworkOperators: function(title){
		let message = {
		    "text": title,
		    "quick_replies":[
		      {
		        "content_type":"text",
		        "title":"MTN Mobile Money",
		        "payload":"MTN_PAYLOAD"
		      },
		      {
		        "content_type":"text",
		        "title":"Tigo Cash",
		        "payload":"TIGO_PAYLOAD"
		      },
		      {
		        "content_type":"text",
		        "title":"Vodafone Cash",
		        "payload":"VODAFONE_PAYLOAD"
		      },
		      {
		        "content_type":"text",
		        "title":"Airtel Money",
		        "payload":"AIRTEL_PAYLOAD"
		      }
		    ]
		};
		return message;
	},

	trainedModel: function(){
		let message = {
		  attachment: {
		    type: "template",
		    payload: {
		      template_type: "generic",
		      elements: [
		      {
		        title: "Sorry I can't help you with this request",
		        subtitle: "I'm trained to answer questions on Move and its services",
		        buttons: [{
		          type: "postback",
		          title: "FAQs about Move",
		          payload: "MOVE_FAQS_PAYLOAD"
		        }, {
		          type: "postback",
		          title: "Payment System",
		          payload: "PAYMENT_SYSTEM_PAYLOAD"
		        }, {
		          type: "postback",
		          title: "Finance News",
		          payload: "FINANCE_NEWS_PAYLOAD"
		        }]
		      },
		      ]
		    }
		  }
		};
		return message;
	},

	linkToMoveWebsite: function(move_site){
		let message = {
	        "attachment": {
	          "type": "template",
	          "payload": {
	            "template_type": "generic",
	            "elements": [
	            {
	              "title": "Link to our secured website",
	              "subtitle": "Click on this link to continue",
	              "image_url": "",          
	              "buttons": [
	              {
	                "title": "Visit Link",
	                "type": "web_url",
	                "url": move_site          
	              }
	              ]
	            }
	            ]  
	          }
	        }
	    };
	    return message;
	},

	financeNews: function(){
		let message = {
	        "attachment": {
	          "type": "template",
	          "payload": {
	            "template_type": "generic",
	            "elements": [
	            {
	              "title": "Latest Finance News",
	              "subtitle": "",
	              "image_url": "",          
	              "buttons": [
	              {
	                "title": "View",
	                "type": "web_url",
	                "url": "https://www.ft.com/"          
	              }
	              ]
	            }
	            ]  
	          }
	        }
      	};
      	return message;
	},

	paymentSystem: function(){
		let message = {
	        "text": "Want to know more on payment processing? Select one",
	        "quick_replies":[
	        {
	          "content_type":"text",
	          "title":"Request for Payment APIs",
	          "payload":"apis"
	        },
	        {
	          "content_type":"text",
	          "title":"Transaction Reversals",
	          "payload":"TRANS_REVERSAL_PAYLOAD"
	        }
	        ]
      }; 
      return message;
	},

	moveInfo: function(){
		let message = {
	        "text": "I am your Move assistant. What exactly do you want to know?",
	        "quick_replies":[
	        {
	          "content_type":"text",
	          "title":"What is move",
	          "payload":"WHAT_MOVE_PAYLOAD"
	        },
	        {
	          "content_type":"text",
	          "title":"Charges",
	          "payload":"MOVE_CHARGES_PAYLOAD"
	        },
	        {
	          "content_type":"text",
	          "title":"Who can use Move?",
	          "payload":"MOVE_USERS_PAYLOAD"
	        },
	        {
	          "content_type":"text",
	          "title":"Registration required?",
	          "payload":"MOVE_REGISTRATION_PAYLOAD"
	        },
	        {
	          "content_type":"text",
	          "title":"How can I contact Move?",
	          "payload":"MOVE_CONTACT_PAYLOAD"
	        },
	        {
	          "content_type":"text",
	          "title":"Maximum amount I can move per transaction",
	          "payload":"MAX_TRANSACTION_PAYLOAD"
	        }
	        ]
      };
      return message;
	}

};
module.exports = CustomView;