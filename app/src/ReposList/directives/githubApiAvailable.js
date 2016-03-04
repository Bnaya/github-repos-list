function githubApiAvailable (githubUser) {


  function link (scope, element, attrs, ngModel) {
    ngModel.$asyncValidators.githubApiAvailable = function (modelValue, viewValue) {

      return githubUser.user(viewValue).then(function () {
        return Promise.resolve();
      }, function (resp) {
        if (resp.status === 404) {
          return Promise.resolve();
        }

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

githubApiAvailable.inject = [
  'githubUser'
];

export default githubApiAvailable;
