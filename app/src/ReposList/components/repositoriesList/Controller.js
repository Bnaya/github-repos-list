export default class Controller {
  constructor() {
  }

  get hasMoreRepos() {
    return !this.noMoreRepos;
  }

  loadMore() {
    this.onLoadMore();
  }
}
