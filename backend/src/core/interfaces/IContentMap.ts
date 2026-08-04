interface ITopicWithOutContent {
  id: string;
  name: string;
  path: string;
}

interface IContentMap {
  classID: string;
  className: string;
  classPath: string;
  topics: Array<ITopicWithOutContent>;
}

export { IContentMap };
