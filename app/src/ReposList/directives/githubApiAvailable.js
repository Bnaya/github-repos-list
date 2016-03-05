function githubApiAvailable (githubUser, $q) {
  function link (scope, element, attrs, ngModel) {
    ngModel.$asyncValidators.githubApiAvailable = function (modelValue, viewValue) {

      return githubUser.user(viewValue).then(function () {
        return $q.resolve();
      }, function (resp) {
        if (resp.status === 404) {
          return $q.resolve();
        }

        return $q.reject();
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
  'githubUser',
  '$q'
];

export default githubApiAvailable;
