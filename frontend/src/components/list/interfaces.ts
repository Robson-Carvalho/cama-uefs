export interface ITopic {
  id: string;
  name: string;
  path: string;
}

export interface IClassItem {
  id: string;
  classId: string;
  className: string;
  classPath: string;
  topics: ITopic[];
}

export interface IListData {
  data: IClassItem[];
}
