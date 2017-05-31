export const SearchComponent = {
  templateUrl: 'template.html',
  controller: function($scope, $filter, $http, DirectoryService, Contacts) {
		'ngInject';
		var ctrl = this; // ASSIGN `this` TO A VARIABLE FOR USE INSIDE FUNCTIONS

		ctrl.$onInit = function() {

			$scope.contacts = Contacts;
			$scope.departments = null;
			$scope.users = null;

			$scope.departmentError = null;
			$scope.userError = null;

			$scope.currentPage = 0;
			$scope.pageSize = 7;

			// MAKE SURE THE LIST LOOKS THE WAY THE CONTROLLER NEEDS IT TO
			// BEFORE IT GETS THERE, I.E. DO FILTERING IN SERVICE AND RETURN `users`
			DirectoryService.getUsers()
				.then(function(users) {
					$scope.users = users;
				})
				.catch(function(err) {
					$scope.userError = err;
				});
			// SAME WITH DEPARTMENTS
			DirectoryService.getDepts()
				.then(function(depts) {
					$scope.departments = depts;
				})
				.catch(function(err) {
					$scope.departmentError = err;
				});

		}
		
		ctrl.getUser = function(person) {
			person.expert = {};
			DirectoryService.getUser(person).then(function(expert) { 
					person.expert = expert || false;
    	});
		}

		// MAKE `$scope` METHODS INTO CONTROLLER METHODS
		// ASSIGN THEM TO OUR `ctrl` VARIABLE INSTEAD OF `$scope`, I.E. `this`
		// USE THEM IN HTML WITH `ng-click="$ctrl.removeSearchResult()"`
		// TRY TO COMPLETELY REMOVE `$scope` FROM CONTROLLER AND HTML
		ctrl.removeSearchResult = function() {
			$scope.searchName = {};
		};

		// MODIFY SEARCH RESULT
		// RESET CURRENT PAGE
		// CLEAR DROPDOWN LIST
		ctrl.modifyResultResetDropdown = function() {
			$scope.currentPage = 0;
			$scope.searchName.department = '';
		}

		// RESET CURRENT PAGE
		// CLEAR INPUT FIELD
		ctrl.modifyResultClearInput = function() {
			$scope.currentPage = 0;
			$scope.searchName.firstname = '';
			$scope.searchName.lastname = '';
		}

		// PASS ORDERBY PARAMETER
		// AND CHANGE ACTIVE FILTER BUTTON
		ctrl.sortBy = function(propertyName) {
			$scope.order = propertyName;
		};


		ctrl.smoothScroll = function() {
			// alert("CLICK!");
			$('html,body').animate({ scrollTop: $("#angularSearch").offset().top }, 'slow');
		};

		// GIVE REUSABLE CHUNKS THEIR OWN METHODS
		// TRY TO AVOID `ng-click="page = 1; fun = true; etc"`
		ctrl.changePageAndScroll = function(plusOrMinus) {
			$scope.currentPage = $scope.currentPage + plusOrMinus;
			ctrl.smoothScroll()
		}

		// GET FILTERED DATA
		ctrl.getData = function() {
			return $filter('filter')($scope.users, $scope.searchName);
		};

		// GET PAGES NUMBER
		ctrl.numberOfPages = function() {
			return Math.ceil(ctrl.getData().length / $scope.pageSize);
		};

		// // process the form
		$scope.processForm = function() {

		  alert("submited");

			$http({
				method  : 'POST',
				url     : 'mail.php',
				data    : $.param($scope.formData),  // pass in data as strings
				headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
			})
			.then(function successCallback(response) {
				// this callback will be called asynchronously
				// when the response is available
				alert("success");
				console.log($scope.formData);
				$scope.message = "Your form was submited successfully.";
				// CLEARS FORM :D
				$scope.updateForm.$setUntouched();
				$scope.formData = {};
			}, function errorCallback(response) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
				alert("error");
				$scope.message = "Your form was NOT submited successfully.";
			});
		};

	}
};