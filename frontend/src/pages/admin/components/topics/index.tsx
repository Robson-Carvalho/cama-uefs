import { ITopic } from "@/interfaces/ITopic";
import { useNavigate } from "react-router";
import { FileText, ChevronRight } from "lucide-react";

interface ITopicsProps {
  topics: ITopic[] | [];
}

const Topics = ({ topics }: ITopicsProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-3">
      {topics.map((topic) => {
        return (
          <div
            onClick={() => navigate(`/admin/topic/${topic.id}`)}
            className="group flex items-center justify-between w-full bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-md p-5 rounded-xl cursor-pointer transition-all duration-200"
            key={topic.id}
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100 transition-colors">
                <FileText className="h-5 w-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                  {topic.title}
                </span>
                <span className="text-xs text-slate-400 font-mono truncate">
                  /{topic.path}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-slate-400 group-hover:text-indigo-500 transition-colors shrink-0 ml-4">
              <span className="text-sm font-medium hidden sm:block">Editar tópico</span>
              <ChevronRight className="h-5 w-5" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export { Topics };
