const PAGE_SIZE = 20;

class AppController {
  constructor(scope, githubUserService) {
    this.scope = scope;
    this.githubUserService = githubUserService;

    this.scope.loadMore = this.loadNextPage.bind(this);
    this.scope.selectedUserChange = this.selectedUserChange.bind(this);

    this.loadingNextPage = false;
    this.pageRequestId = null;

    this.scope.reposList = [];
    this.currentPage = 0;
    this.scope.noMoreRepos = false;
    this.scope.noRepos = false;
    this.scope.githubApiUA = false;
    this.scope.githubUserGone = false;
    this.scope.selectedUser = null;
  }

  loadNextPage() {
    if (this.loadingNextPage) {
      return;
    }

    this.pageRequestId = Date.now();
    this.githubUserService.repos(this.scope.selectedUser, ++this.currentPage, PAGE_SIZE)
      .then(
        this.nextPageLoadedCallback.bind(this, this.pageRequestId),
        this.nextPageFailCallback.bind(this, this.pageRequestId)
      );
  }

  selectedUserChange(selectedUser) {
    this.pageRequestId = null;
    this.currentPage = 0;
    this.scope.reposList = [];
    this.scope.noMoreRepos = false;
    this.loadingNextPage = false;
    this.scope.noRepos = false;
    this.scope.selectedUser = selectedUser;

    // The user has dis-selected. clear the selection
    if (!selectedUser) {
      return;
    }

    this.loadNextPage();
  }

  nextPageFailCallback(requestId, resp) {
    // todo: abort xhr instead of ignoring results
    if (requestId !== this.pageRequestId) {
      return;
    }

    --this.currentPage;

    // edgecase, when the validator passed but the user gone
    if (resp.status === 404) {
      this.scope.githubUserGone = true;
    } else {
      // the api is unavailable
      this.scope.githubApiUA = true;
    }
  }

  nextPageLoadedCallback(requestId, resp) {
    // todo: abort xhr instead of ignoring results
    if (requestId !== this.pageRequestId) {
      return;
    }

    this.loadingNextPage = false;
    this.scope.githubApiUA = false;
    this.scope.githubUserGone = false;

    if (this.currentPage === 1 && resp.data.length === 0) {
      this.scope.noRepos = true;

      return;
    }

    if (PAGE_SIZE > resp.data.length) {
      this.scope.noMoreRepos = true;
    }

    Array.prototype.push.apply(this.scope.reposList, resp.data);
  }
}

AppController.$inject = [
  '$scope',
  'githubUser'
];

export default AppController;
