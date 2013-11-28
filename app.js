var app = angular.module("portgolio", []);

app.controller("TransactionCtrl", function($scope){
	$scope.transactions = transactionData;

	$scope.types = createCheckboxFilter($scope.transactions, "Type");
	$scope.categories = createCheckboxFilter($scope.transactions, "Category");

	$scope.searchFilter = function(row){
    var typesChecked = getChecked($scope.types);
    var categoriesChecked = getChecked($scope.categories);

    if(typesChecked.length == 0 && categoriesChecked.length == 0){  
      return true;
    }    
    else if((typesChecked.length == 0 && _.contains(categoriesChecked, row.Category)) ||
    				(categoriesChecked.length == 0 && _.contains(typesChecked, row.Type)) || 
    				(_.contains(categoriesChecked, row.Category) && _.contains(typesChecked, row.Type))){
    	return true;
    }
    else{
        return false;
    }
  };

});

app.filter('TransactionFilter', function() {
    return function(list, searchobj) {
        return list.filter(function(item) {
            var working = (searchobj.working && (item.state === 'working'));
            var hosed = (searchobj.hosed && (item.state === 'hosed'));
            var broken = (searchobj.broken && (item.state === 'broken'));
            
            console.log(item.state, searchobj.working, searchobj.osed, searchobj.broken, working, hosed, broken);
            return working || hosed || broken;
        });
    };
});

var checkedCat, checkedType;

function getChecked(obj){
	var result = [];
	for(key in obj) if(obj[key].status) result.push(obj[key].value);
	return result;
}

function createCheckboxFilter(obj, field){
	var list = _.uniq(_.pluck(obj, field));
	return _.map(list, function (item){
		return {value: $.trim(item), status: false};
		});
}

var transactionData = [
  {
    "Date":"24-Oct-13",
    "Value":-30,
    "Reference":"AMIT 400000000093997831 24OCT13 23:22",
    "Type":"Spend",
    "Category":"Restaurants & Bars",
    "SubCategory":"Restaurants",
    "Transfer":"n",
    "Currency":"GBP"
  },
  {
    "Date":"24-Oct-13",
    "Value":-80,
    "Reference":"ANDROUET LONDON 826",
    "Type":"Spend",
    "Category":"Restaurants & Bars",
    "SubCategory":"Restaurants",
    "Transfer":"n",
    "Currency":"GBP"
  },
  {
    "Date":"24-Oct-13",
    "Value":-20,
    "Reference":"ATM WITHDRAWAL CD 3918 24OCT13",
    "Type":"Spend",
    "Category":"ATM Withdrawal",
    "SubCategory":"ATM",
    "Transfer":"n",
    "Currency":"GBP"
  },
  {
    "Date":"23-Oct-13",
    "Value":23.2,
    "Reference":"S ALVES MARTINS",
    "Type":"Income",
    "Category":"Other Income",
    "SubCategory":"",
    "Transfer":"y",
    "Currency":"GBP"
  },
  {
    "Date":"22-Oct-13",
    "Value":-0.2,
    "Reference":"NON-STERLING TRANSACTION FEE",
    "Type":"Spend",
    "Category":"Donations & Giving",
    "SubCategory":"Kiva",
    "Transfer":"y",
    "Currency":"GBP"
  },
  {
    "Date":"22-Oct-13",
    "Value":-7.11,
    "Reference":"PAYPAL *KIVA 35314369001 840",
    "Type":"Spend",
    "Category":"Donations & Giving",
    "SubCategory":"Kiva",
    "Transfer":"n",
    "Currency":"GBP"
  },
  {
    "Date":"22-Oct-13",
    "Value":-30.4,
    "Reference":"DOCKLANDS LIGHT RAILWA LONDON 826",
    "Type":"Spend",
    "Category":"Day-to-day Travel",
    "SubCategory":"Transportes",
    "Transfer":"n",
    "Currency":"GBP"
  },
  {
    "Date":"22-Oct-13",
    "Value":-45.95,
    "Reference":"ASDA STORES LONDON 826",
    "Type":"Spend",
    "Category":"Food & Groceries",
    "SubCategory":"Groceries",
    "Transfer":"n",
    "Currency":"GBP"
  },
  {
    "Date":"22-Oct-13",
    "Value":-10,
    "Reference":"OUR CHARGE",
    "Type":"Spend",
    "Category":"Holiday",
    "SubCategory":"Accomodation",
    "Transfer":"n",
    "Currency":"GBP"
  },
  {
    "Date":"22-Oct-13",
    "Value":-878.54,
    "Reference":"FORGN PYT23591362778898",
    "Type":"Spend",
    "Category":"Holiday",
    "SubCategory":"Accomodation",
    "Transfer":"n",
    "Currency":"GBP"
  }
];