export interface DSlog {
  total: number;
  list: DSList[];
  pageNum: number;
  pageSize: number;
  size: number;
  startRow: number;
  endRow: number;
  pages: number;
  prePage: number;
  nextPage: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  navigatePages: number;
  navigatepageNums: number[];
  navigateFirstPage: number;
  navigateLastPage: number;
  firstPage: number;
  lastPage: number;
}

export interface DSList {
  id: number;
  ip: string;
  uid?: number;
  url: string;
  method: string;
  duration: string;
  date: string;
  os: string;
  brower: string;
}
