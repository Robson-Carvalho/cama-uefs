export interface ITopic {
  _id: string;
  name: string;
  path: string;
}

export interface IClassItem {
  _id: string;
  classID: string;
  className: string;
  classPath: string;
  topics: ITopic[];
}

export interface IListData {
  data: IClassItem[];
}
