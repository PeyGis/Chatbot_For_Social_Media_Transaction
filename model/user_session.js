/**
 *@author Pages Coffie
 *@version Version 1.0
 *Created at 2018/07/15
 *Nsano Move-Bot Project
 */
 
var store = require('store'); //require the store library

//A class to hold all session objects
var UserSession = {

	//this function gets user's details based on user_id
	getUserData : function(user_id){
		var data = store.get(user_id);
		if (typeof data != 'undefined' || data != null){
		    return data;
		} else{
		    return null
		  }
	},

	//this function gets user's specific details (key) based on user_id 
	getUserDataWithKey : function(user_id, key){
		var data = store.get(user_id);
		if (typeof data != 'undefined' || data != null){
		    return data[key];
		} else{
		    return null
		  }
	},

	//A function to return the state / session of a user
	getUserState: function(user_id){
		var data = store.get(user_id);
		if (typeof data != 'undefined' || data != null){
		    return data["state"];
		} else{
		    return null
		}
	},

	//A function to save user session
	saveSession: function(user, key, value){
		var data = store.get(user);
		if (typeof data != 'undefined' || data != null){
		    data[key] = value;
		    store.set(user, data);
		} else{
		    var obj = {};
		    obj[key] = value;
		    store.set(user, obj);
		 }
	},
		//A function to clear the session of a user
	clearSession: function(user_id){
		store.remove(user_id)
	}
};

module.exports = UserSession;