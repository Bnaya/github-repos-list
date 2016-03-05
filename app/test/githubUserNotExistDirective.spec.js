import 'angular-mocks';
import angular from 'angular';
import GithubUserNotExist from 'ReposList/directives/githubUserNotExist';

describe('githubUserNotExist validator', function () {
  let $httpBackend, $compile, $scope, githubUserServiceMock, $q;

  beforeEach(function() {
    const app = angular.module('myApp', []);

    githubUserServiceMock = jasmine.createSpyObj('githubUserServiceMock', ['user', 'repos']);
    app.provider('githubUser', { $get: function () { return githubUserServiceMock; }});
    app.directive('githubUserNotExist', GithubUserNotExist);

    angular.mock.module('myApp');

    inject(function($injector) {
        $compile = $injector.get('$compile');
        $scope = $injector.get('$rootScope');
        $q = $injector.get('$q');

        $compile(
            `<form name="form">
            <input name="user" ng-model="user" github-user-not-exist />
            </form>`
        )($scope);
      });
  });

  afterEach(function() {
  });

  it('validator all good', function () {
    let deferred = $q.defer();

    githubUserServiceMock.user.andReturn(deferred.promise);

    $scope.form.user.$setViewValue('Bnaya');

    expect(githubUserServiceMock.user).toHaveBeenCalledWith('Bnaya');

    expect($scope.form.user.$pending.notExist).toBeTruthy();

    deferred.resolve();
    $scope.$apply();

    expect($scope.form.user.$valid).toBe(true);
  });

  it('Should be invalid when error returned from github that is 404', function () {
    let deferred = $q.defer();

    githubUserServiceMock.user.andReturn(deferred.promise);
    $scope.form.user.$setViewValue('Bnaya');

    deferred.reject({
      status: 404
    });

    $scope.$apply();

    expect($scope.form.user.$invalid).toBe(true);
  });

  it('Should be valid when error returned from github that is not 404', function () {
    let deferred = $q.defer();

    githubUserServiceMock.user.andReturn(deferred.promise);
    $scope.form.user.$setViewValue('Bnaya');

    deferred.reject({
      status: 400
    });

    $scope.$apply();

    expect($scope.form.user.$valid).toBe(true);
  });
});
