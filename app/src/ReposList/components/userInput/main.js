import Controller from './Controller';
import {templateUrl} from './template.html!ng-template';
import './style.css!css';

export default {
  controller: Controller,
  templateUrl: templateUrl,
  bindings: {
    onUserChange: '&'
  }
};
