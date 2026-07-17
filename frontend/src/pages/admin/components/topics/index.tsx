import { ITopic } from "@/interfaces/ITopic";
import { useNavigate } from "react-router";
import { FileText, ChevronRight, GripVertical } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

interface ITopicsProps {
  topics: ITopic[] | [];
  onReorder?: (topics: ITopic[]) => void;
}

const Topics = ({ topics, onReorder }: ITopicsProps) => {
  const navigate = useNavigate();

  const handleDragEnd = (result: any) => {
    if (!result.destination || !onReorder) return;
    
    const items = Array.from(topics);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    onReorder(items);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="topics-list">
        {(provided) => (
          <div 
            className="flex flex-col gap-3" 
            {...provided.droppableProps} 
            ref={provided.innerRef}
          >
            {topics.map((topic, index) => {
              return (
                <Draggable key={topic.id} draggableId={topic.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      onClick={() => navigate(`/admin/topic/${topic.id}`)}
                      className={`group flex items-center justify-between w-full bg-white border border-slate-200 hover:border-indigo-400 p-5 rounded-xl transition-all duration-200 ${snapshot.isDragging ? 'shadow-xl ring-2 ring-indigo-500 scale-[1.02] z-50' : 'hover:shadow-md cursor-pointer'}`}
                    >
                      <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                        <div 
                          {...provided.dragHandleProps}
                          onClick={(e) => e.stopPropagation()}
                          className="cursor-grab active:cursor-grabbing p-1.5 -ml-2 rounded text-slate-300 hover:text-slate-500 hover:bg-slate-100 transition-colors"
                        >
                          <GripVertical className="h-5 w-5" />
                        </div>
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
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export { Topics };
