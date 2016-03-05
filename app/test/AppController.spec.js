import 'angular-mocks';
import angular from 'angular';
import AppController from 'ReposList/app/AppController';

let appController, githubUserServiceMock, scope, $qService;

describe('AppController', function () {

  beforeEach(inject(function($injector, $q) {
    scope = $injector.get('$rootScope');
    $qService = $q;


    githubUserServiceMock = jasmine.createSpyObj('githubUserServiceMock', ['user', 'repos']);

    appController = new AppController(scope, githubUserServiceMock);
  }));

  afterEach(function() {
  });

  it('initial values are ok', function () {

    expect(scope.reposList).toEqual([]);
    expect(scope.noMoreRepos).toBe(false);
    expect(scope.noRepos).toBe(false);
    expect(scope.githubApiUA).toBe(false);
    expect(scope.githubUserGone).toBe(false);
    expect(scope.selectedUser).toBe(null);
  });

  it('should fetch the first page of repos for the selected user', function () {
    const defered = $qService.defer();
    defered.resolve({ status: 200, data: new Array(3).fill(repoMock) });

    githubUserServiceMock.repos.andReturn(defered.promise);

    appController.selectedUserChange('Bnaya');

    expect(githubUserServiceMock.repos).toHaveBeenCalledWith('Bnaya', 1, 20);
    expect(scope.selectedUser).toBe('Bnaya');

    scope.$apply();
    expect(scope.reposList).toEqual(new Array(3).fill(repoMock));

    expect(scope.noMoreRepos).toBe(true);
  });

  it('should handle when the user have no repos', function () {
    const defered = $qService.defer();
    defered.resolve({ status: 200, data: [] });

    githubUserServiceMock.repos.andReturn(defered.promise);

    appController.selectedUserChange('Bnaya');

    scope.$apply();
    expect(scope.reposList).toEqual([]);
    expect(scope.noRepos).toBe(true);
  });

  it('should handle when the user have more repos then one page', function () {
    const defered = $qService.defer();
    defered.resolve({ status: 200, data: new Array(20).fill(repoMock) });

    githubUserServiceMock.repos.andReturn(defered.promise);

    appController.selectedUserChange('Bnaya');

    scope.$apply();
    expect(scope.noMoreRepos).toBe(false);
  });

  it('should handle when the user not found', function () {
    const defered = $qService.defer();
    defered.reject({ status: 404, data: {}});

    githubUserServiceMock.repos.andReturn(defered.promise);

    appController.selectedUserChange('Bnaya');

    scope.$apply();
    expect(scope.githubUserGone).toBe(true);
  });

  it('should handle when github is unavailable', function () {
    const defered = $qService.defer();
    defered.reject({ status: 400, data: {}});

    githubUserServiceMock.repos.andReturn(defered.promise);

    appController.selectedUserChange('Bnaya');

    scope.$apply();
    expect(scope.githubApiUA).toBe(true);
  });

  it('should handle when user is selected and then de-selected', function () {
    const defered = $qService.defer();
    defered.resolve({ status: 200, data: new Array(3).fill(repoMock) });

    githubUserServiceMock.repos.andReturn(defered.promise);
    appController.selectedUserChange('Bnaya');
    scope.$apply();

    appController.selectedUserChange();

    expect(scope.reposList).toEqual([]);
    expect(scope.noMoreRepos).toBe(false);
    expect(scope.noRepos).toBe(false);
    expect(scope.githubApiUA).toBe(false);
    expect(scope.githubUserGone).toBe(false);
    expect(scope.selectedUser).toEqual(null);
  });
});

const repoMock = {
  "id": 48592731,
  "name": "builder",
};
