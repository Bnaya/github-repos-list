// Yes, my app's secret is here. fastest way to overcome rate limit
const clientId = '6bd81d9bf5e466854c95';
const clientSecret = 'b55938c9278ce64a9e5ba9a55651a6bce0b92b12';

// const clientId = null;
// const clientSecret = null;

class GithubUser {
  constructor(http) {
    this.http = http;
  }

  user(name) {
    return this.http({
      url: `https://api.github.com/users/${encodeURIComponent(name)}?client_id=${encodeURIComponent(clientId)}&client_secret=${encodeURIComponent(clientSecret)}`
    });
  }

  repos(name, page, perPage) {
    return this.http({
      url: `https://api.github.com/users/${encodeURIComponent(name)}/repos?page=${page}&per_page=${perPage}&client_id=${encodeURIComponent(clientId)}&client_secret=${encodeURIComponent(clientSecret)}`
    });
  }
}

GithubUser.$inject = [
  '$http'
];

export default GithubUser;
