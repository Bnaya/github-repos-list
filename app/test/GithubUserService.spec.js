import 'angular-mocks';
import angular from 'angular';
import GithubUserService from 'ReposList/services/GithubUser';

let $httpBackend, serviceToTest;

beforeEach(inject(function($injector) {
  $httpBackend = $injector.get('$httpBackend');
  serviceToTest = new GithubUserService($injector.get('$http'));
}));

afterEach(function() {
  $httpBackend.verifyNoOutstandingExpectation();
  $httpBackend.verifyNoOutstandingRequest();
});


describe('GithubUserService', function () {

  it('user() should fetch the proper user', function () {

    $httpBackend.expect('GET', /https:\/\/api\.github\.com\/users\/Bnaya(\\?.*)?/).respond(200, {});

    serviceToTest.user('Bnaya');

    $httpBackend.flush();
  });

  it('user() should fail when the request fails', function (done) {
    let thenCalled = false;

    $httpBackend.expect('GET', /https:\/\/api\.github\.com\/users\/Bnaya(\\?.*)?/).respond(400, {});

    serviceToTest.user('Bnaya')
    .then(function () {
      thenCalled = true;
    })
    .catch(function (error) {
      expect(error.status).toBe(400);
      expect(error.data).toEqual({});
    })
    .finally(function () {
      done();
    });

    $httpBackend.flush();
  });
});
