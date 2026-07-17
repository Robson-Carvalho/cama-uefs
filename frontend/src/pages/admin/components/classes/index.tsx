import { IClass } from "@/interfaces/IClass";
import { useNavigate } from "react-router";
import { BookOpen, ChevronRight } from "lucide-react";

interface IClasssesProps {
  classes: IClass[] | [];
}

const Classes = ({ classes }: IClasssesProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-3">
      {classes.map((_class) => {
        return (
          <div
            onClick={() => navigate(`/admin/class/${_class.id}`)}
            className="group flex items-center justify-between w-full bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-md p-5 rounded-xl cursor-pointer transition-all duration-200"
            key={_class.id}
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100 transition-colors">
                <BookOpen className="h-5 w-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                  {_class.title}
                </span>
                <span className="text-xs text-slate-400 font-mono truncate">
                  /{_class.path}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-slate-400 group-hover:text-indigo-500 transition-colors shrink-0 ml-4">
              <span className="text-sm font-medium hidden sm:block">Ver detalhes</span>
              <ChevronRight className="h-5 w-5" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export { Classes };
