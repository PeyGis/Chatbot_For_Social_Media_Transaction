/**
 *@author Pages Coffie
 *@version Version 1.0
 *Created at 2018/07/15
 *Nsano Move-Bot Project
 */
 var Helper = {
	getMobileNetworkOperator: function(wallet_number){
	  var length = wallet_number.length;
	  var vendorName = '';
	  if(length == 10){
	    var prefix = wallet_number.substring(0,3);
	    if(prefix == '057' || prefix == '027'){
	      vendorName = 'TIGO';

	    } else if (prefix == '024' || prefix == '054' || prefix == '055') {
	      vendorName = 'MTN';
	    }
	    else if (prefix == '020' || prefix == '050') {
	      vendorName = 'VODAFONE';
	    }
	    else if (prefix == '026' || prefix == '056') {
	      vendorName = 'AIRTEL';
	    } else{
	      $vendorName = '';
	    }

	  } 
	  else if(length == 12){
	    var prefix = wallet_number.substring(0,5);
	    if(prefix == '23357' || prefix == '23327'){
	      vendorName = 'TIGO';

	    } else if (prefix == '23324' || prefix == '23354' || prefix == '23355') {
	      vendorName = 'MTN';
	    }
	    else if (prefix == '23320' || prefix == '23350') {
	      vendorName = 'VODAFONE';
	    }
	    else if (prefix == '23326' || prefix == '23356') {
	      vendorName = 'AIRTEL';
	    } else{
	      $vendorName = '';
	    }
	  }

	return vendorName;

	}
};

module.exports = Helper;