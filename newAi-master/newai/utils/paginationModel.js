export default class PaginationModel {
  constructor() {
    this.pageSize = 20;
    this.currentPage = 1;
    this.loading = false;
    this.total = 0;
  }

  setPageSize(pageSize) {
    this.pageSize = pageSize;
  }

  getPageSize() {
    return this.pageSize;
  }

  getCurrentPage() {
    console.log(this.toString(), this.currentPage);
    return this.currentPage;
  }

  async pullToRefresh(fetch) {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.currentPage = 1;
    let params = {
      query: {
        pageNum: this.currentPage,
        pageSize: this.pageSize
      },
      method: "GET"
    };
    const res = await fetch(params);
    this.loading = false;
    if (res.code === 0) {
      this.total = res.count;
      if (res.data && res.data.length > 0) {
        this.currentPage++;
      }
      console.log(this.toString() + "refresh++", this.currentPage);
    }
    return res;
  }

  checkLoadMore(list) {
    return list && list != null ? list.length < this.total : false;
  }

  async more(fetch) {
    if (this.loading) {
      return;
    }
    this.loading = true;
    let params = {
      query: {
        pageNum: this.currentPage,
        pageSize: this.pageSize
      },
      method: "GET"
    };
    const res = await fetch(params);
    this.loading = false;
    if (res.code === 0) {
      this.currentPage++;
      console.log(this.toString() + "more++", this.currentPage);
    }
    return res;
  }
}
