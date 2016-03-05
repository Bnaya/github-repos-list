function githubUserNotExist (githubUser, $q) {


  function link (scope, element, attrs, ngModel) {
    ngModel.$asyncValidators.notExist = function (modelValue, viewValue) {

      return githubUser.user(viewValue).then(function () {
        return $q.resolve();
      }, function (resp) {
        if (resp.status !== 404) {
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

githubUserNotExist.inject = [
  'githubUser',
  '$q'
];

export default githubUserNotExist;
