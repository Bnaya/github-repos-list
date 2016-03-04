import githubUserNotExist from 'ReposList/directives/githubUserNotExist';
import githubApiAvailable from 'ReposList/directives/githubApiAvailable';

export default [{
  directive: githubUserNotExist,
  selector: 'githubUserNotExist'
}, {
  directive: githubApiAvailable,
  selector: 'githubApiAvailable'
}];
