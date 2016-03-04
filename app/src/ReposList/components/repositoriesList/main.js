import Controller from 'ReposList/components/repositoriesList/Controller';
import {templateUrl} from './template.html!ng-template';
import './style.css!css';

export default {
  controller: Controller,
  templateUrl: templateUrl,
  bindings: {
    noMoreRepos: '<',
    list: '<',
    onLoadMore: '&'
  }
};
