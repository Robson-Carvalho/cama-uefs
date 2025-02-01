import { IClass } from "@/interfaces/IClass";
import { useNavigate } from "react-router";

interface IClasssesProps {
  classes: IClass[] | [];
}

const Classes = ({ classes }: IClasssesProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4">
      {classes.map((_class) => {
        return (
          <div
            onClick={() => {
              navigate(`/admin/class/${_class._id}`);
            }}
            className="bg-[#F6F6F6] hover:bg-slate-200 p-4 cursor-pointer transition-colors flex flex-row justify-between rounded-md straight-corners:rounded-none text-sm font-normal text-balance text-dark/8 hover:text-dark/9 hover:bg-dark/1 hover:before:bg-dark/3 dark:text-light/8 dark:hover:text-light/9 dark:hover:bg-light/1 dark:hover:before:bg-light/3 contrast-more:text-dark contrast-more:dark:text-light hover:contrast-more:text-dark dark:hover:contrast-more:text-light hover:contrast-more:ring-1 hover:contrast-more:ring-dark dark:contrast-more:hover:ring-light before:contents[] before:absolute before:inset-y-0 before:-left-px [&+div_a]:pl-5 sidebar-list-line:before:w-px sidebar-list-default:[&+div_a]:before:w-px sidebar-list-default:[&+div_a]:rounded-l-none sidebar-list-line:rounded-l-none"
            key={_class._id}
          >
            {_class.title}
          </div>
        );
      })}
    </div>
  );
};

export { Classes };
