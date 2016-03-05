import 'angular-mocks';
import angular from 'angular';
import GithubUserService from 'ReposList/services/GithubUser';


describe('GithubUserService', function () {

  let $httpBackend, serviceToTest;

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    serviceToTest = new GithubUserService($injector.get('$http'));
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('user() should fetch the proper user', function (done) {
    const userMock = {
      id: '123',
      login: 'Bnaya'
    };
    let catchCalled = false;

    $httpBackend.expectRoute('GET', 'https://api.github.com/users/Bnaya').respond(function (method, url, data, headers, params) {
      // expect(params.user).toBe('Bnaya');

      return [200, userMock];
    });

    serviceToTest.user('Bnaya')
    .then(function (resp) {
      expect(resp.status).toBe(200);
      expect(resp.data).toEqual(userMock);
    })
    .catch(function () {
      catchCalled = true;
    })
    .finally(function () {
      expect(catchCalled).not.toBe(true);
      done();
    });

    $httpBackend.flush();
  });

  it('user() should fail when the request fails', function (done) {
    let thenCalled = false;

    $httpBackend.when('GET', /.*/).respond(400, {});

    serviceToTest.user('Bnaya')
    .then(function () {
      thenCalled = true;
    })
    .catch(function (error) {
      expect(error.status).toBe(400);
      expect(error.data).toEqual({});
    })
    .finally(function () {
      expect(thenCalled).not.toBe(true);
      done();
    });

    $httpBackend.flush();
  });

  it('repos() should fetch the proper repos', function (done) {
    const reposMock = [
      {
        "id": 7278106,
        "name": "alps-H958-mods",
      },
      {
        "id": 48592731,
        "name": "builder",
      }
    ];

    let catchCalled = false;

    $httpBackend.expectRoute('GET', 'https://api.github.com/users/:user/repos').respond(function (method, url, data, headers, params) {
      expect(params.page).toBe('1');
      expect(params.per_page).toBe('5');
      expect(params.user).toBe('Bnaya');

      return [200, reposMock];
    });

    serviceToTest.repos('Bnaya', 1, 5)
    .then(function (resp) {
      expect(resp.status).toBe(200);
      expect(resp.data).toEqual(reposMock);
    })
    .catch(function () {
      catchCalled = true;
    })
    .finally(function () {
      expect(catchCalled).not.toBe(true);
      done();
    });

    $httpBackend.flush();
  });

  it('repos() should fail when the request fails', function (done) {
    let thenCalled = false;

    $httpBackend.when('GET', /.*/).respond(400, {});

    serviceToTest.repos('Bnaya', 1, 5)
    .then(function () {
      thenCalled = true;
    })
    .catch(function (error) {
      expect(error.status).toBe(400);
      expect(error.data).toEqual({});
    })
    .finally(function () {
      expect(thenCalled).not.toBe(true);
      done();
    });

    $httpBackend.flush();
  });
});
