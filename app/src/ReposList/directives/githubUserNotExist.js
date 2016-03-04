function githubUserNotExist (githubUser) {


  function link (scope, element, attrs, ngModel) {
    ngModel.$asyncValidators.notExist = function (modelValue, viewValue) {

      return githubUser.user(viewValue).then(function () {
        return Promise.resolve();
      }, function () {
        return Promise.reject();
      });
    }
  }

	return {
		restrict: 'A',
		require: 'ngModel',
		link: link
	};
}

githubUserNotExist.inject = [
  'githubUser'
];

export default githubUserNotExist;
