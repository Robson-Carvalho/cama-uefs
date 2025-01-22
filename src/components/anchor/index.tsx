import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

interface IAnchorProps {
  text: string;
  path: string;
}

const Anchor = ({ text, path }: IAnchorProps) => {
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {}, [location.pathname]);

  return (
    <a
      onClick={() => navigate(path)}
      className={`${
        location.pathname === path
          ? "text-[#346DDB] font-semibold hover:bg-[#E6EDFB]"
          : "text-[#58595C] hover:bg-[#F6F6F6]"
      } cursor-pointer group/tocA relative transition-colors flex flex-row justify-between p-1.5 pl-3 rounded-md straight-corners:rounded-none text-sm font-normal text-balance text-dark/8 hover:text-dark/9 hover:bg-dark/1 hover:before:bg-dark/3 dark:text-light/8 dark:hover:text-light/9 dark:hover:bg-light/1 dark:hover:before:bg-light/3 contrast-more:text-dark contrast-more:dark:text-light hover:contrast-more:text-dark dark:hover:contrast-more:text-light hover:contrast-more:ring-1 hover:contrast-more:ring-dark dark:contrast-more:hover:ring-light before:contents[] before:absolute before:inset-y-0 before:-left-px [&+div_a]:pl-5 sidebar-list-line:before:w-px sidebar-list-default:[&+div_a]:before:w-px sidebar-list-default:[&+div_a]:rounded-l-none sidebar-list-line:rounded-l-none`}
    >
      {text}
    </a>
  );
};

export { Anchor };
