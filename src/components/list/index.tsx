import { useState } from "react";

interface Topic {
  _id: string;
  name: string;
  path: string;
}

interface ClassItem {
  _id: string;
  classID: string;
  className: string;
  classPath: string;
  topics: Topic[];
}

interface IListProps {
  data: ClassItem[];
}

const List = ({ data }: IListProps) => {
  const [expandedClassID, setExpandedClassID] = useState<string | null>(null);

  const toggleExpand = (classID: string) => {
    setExpandedClassID((prev) => (prev === classID ? null : classID));
  };

  return (
    <>
      {data.map((classItem) => (
        <li key={classItem._id} className="flex flex-com">
          <div
            className="w-full flex flex-row justify-between items-center hover:bg-[#F6F6F6]  rounded-md "
            onClick={() => toggleExpand(classItem.classID)}
          >
            <p className="text-[#58595C] cursor-pointer group/tocA relative transition-colors flex flex-row justify-between p-1.5 pl-3 rounded-md straight-corners:rounded-none text-sm font-normal text-balance text-dark/8 hover:text-dark/9 hover:bg-dark/1 hover:before:bg-dark/3 dark:text-light/8 dark:hover:text-light/9 dark:hover:bg-light/1 dark:hover:before:bg-light/3 contrast-more:text-dark contrast-more:dark:text-light hover:contrast-more:text-dark dark:hover:contrast-more:text-light hover:contrast-more:ring-1 hover:contrast-more:ring-dark dark:contrast-more:hover:ring-light before:contents[] before:absolute before:inset-y-0 before:-left-px [&+div_a]:pl-5 sidebar-list-line:before:w-px sidebar-list-default:[&+div_a]:before:w-px sidebar-list-default:[&+div_a]:rounded-l-none sidebar-list-line:rounded-l-none">
              {classItem.className}
            </p>

            <span className="pr-2 rounded-full  hover:bg-red-200">
              {expandedClassID === classItem.classID ? "↓" : ">"}
            </span>
          </div>
          {expandedClassID === classItem.classID && (
            <ul className="topics-list">
              {classItem.topics.map((topic) => (
                <li key={topic._id} className="topic-item">
                  {topic.name}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </>
  );
};

export { List };
