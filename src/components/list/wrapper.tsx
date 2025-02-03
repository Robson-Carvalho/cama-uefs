import { useState } from "react";
import { IClassItem } from "./interfaces";
import { Li } from "./li";

import { ChevronRight } from "lucide-react";
import { useLocation } from "react-router";

interface IWrapperProps {
  data: IClassItem;
}

const Wrapper = ({ data }: IWrapperProps) => {
  const location = useLocation();

  const path = location.pathname.split("/")[1];

  const [expanded, setExpanded] = useState<boolean>(
    path === data.classPath ? true : false
  );

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <li className="flex flex-col">
      <div className="w-full ">
        <div
          onClick={() => toggleExpand()}
          className="cursor-pointer flex flex-row justify-between items-center p-1.5 pl-3 rounded-sm hover:bg-[#F6F6F6]"
        >
          <p className="text-[#58595C] text-sm font-normal text-balance text-dark/8 hover:text-dark/9 hover:bg-dark/1 hover:before:bg-dark/3 dark:text-light/8 dark:hover:text-light/9 dark:hover:bg-light/1 dark:hover:before:bg-light/3 contrast-more:text-dark contrast-more:dark:text-light hover:contrast-more:text-dark dark:hover:contrast-more:text-light hover:contrast-more:ring-1 hover:contrast-more:ring-dark dark:contrast-more:hover:ring-light before:contents[] before:absolute before:inset-y-0 before:-left-px [&+div_a]:pl-5 sidebar-list-line:before:w-px sidebar-list-default:[&+div_a]:before:w-px sidebar-list-default:[&+div_a]:rounded-l-none sidebar-list-line:rounded-l-none">
            {data.className}
          </p>

          <div className="cursor-pointer rounded-full">
            <ChevronRight
              size="18"
              className={`transform transition-transform duration-300 ${
                expanded ? "rotate-90" : ""
              }`}
            />
          </div>
        </div>

        <div
          className={`overflow-hidden transition-[max-height] duration-100  ${
            expanded ? "max-h-[500px]" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-1 pt-1">
            <div className="pl-4">
              {data.topics.map((topic) => (
                <Li
                  key={topic.path}
                  path={`/${data.classPath}/${topic.path}`}
                  text={topic.name}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export { Wrapper };
