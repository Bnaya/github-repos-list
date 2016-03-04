import AppController from 'ReposList/app/AppController';
import directives from 'ReposList/directives';
import repositoriesListComponent from 'ReposList/components/repositoriesList/main';
import userInputComponent from 'ReposList/components/userInput/main';
import GithubUser from 'ReposList/services/GithubUser';

let module = angular.module( "app", [ ] );

module.controller("AppController" , AppController );

module.service('githubUser', GithubUser);

directives.forEach(function (entry) {
	module.directive(entry.selector, entry.directive);
});

module.component('githubReposList', repositoriesListComponent);
module.component('userInput', userInputComponent);

export default module.name;
