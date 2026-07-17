import { IClass } from "@/interfaces/IClass";
import { useNavigate } from "react-router";
import { BookOpen, ChevronRight, GripVertical, ChevronUp, ChevronDown } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

interface IClasssesProps {
  classes: IClass[] | [];
  onReorder?: (classes: IClass[]) => void;
  onMoveToPage?: (classId: string, direction: 'prev' | 'next') => void;
  page?: number;
  totalPages?: number;
}

const Classes = ({ classes, onReorder, onMoveToPage, page = 1, totalPages = 1 }: IClasssesProps) => {
  const navigate = useNavigate();

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    if (result.destination.droppableId === 'previous-page' && onMoveToPage) {
      onMoveToPage(result.draggableId, 'prev');
      return;
    }
    
    if (result.destination.droppableId === 'next-page' && onMoveToPage) {
      onMoveToPage(result.draggableId, 'next');
      return;
    }
    
    if (result.destination.droppableId === 'classes-list' && onReorder) {
      const items = Array.from(classes);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      onReorder(items);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      
      {page > 1 && (
        <Droppable droppableId="previous-page">
          {(provided, snapshot) => (
            <div 
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`flex flex-col items-center justify-center p-4 mb-4 rounded-xl border-2 border-dashed transition-all duration-300 ${snapshot.isDraggingOver ? 'bg-indigo-50 border-indigo-500 text-indigo-700 scale-[1.02] shadow-md' : 'bg-slate-50 border-slate-300 text-slate-400'}`}
            >
              <ChevronUp className="w-6 h-6 mb-1 opacity-70" />
              <span className="text-sm font-medium">Solte aqui para enviar para a página anterior</span>
              <div className="hidden">{provided.placeholder}</div>
            </div>
          )}
        </Droppable>
      )}

      <Droppable droppableId="classes-list">
        {(provided) => (
          <div 
            className="flex flex-col gap-3" 
            {...provided.droppableProps} 
            ref={provided.innerRef}
          >
            {classes.map((_class, index) => {
              return (
                <Draggable key={_class.id} draggableId={_class.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      onClick={() => navigate(`/admin/class/${_class.id}`)}
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
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {page < totalPages && (
        <Droppable droppableId="next-page">
          {(provided, snapshot) => (
            <div 
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`flex flex-col items-center justify-center p-4 mt-4 rounded-xl border-2 border-dashed transition-all duration-300 ${snapshot.isDraggingOver ? 'bg-indigo-50 border-indigo-500 text-indigo-700 scale-[1.02] shadow-md' : 'bg-slate-50 border-slate-300 text-slate-400'}`}
            >
              <ChevronDown className="w-6 h-6 mb-1 opacity-70" />
              <span className="text-sm font-medium">Solte aqui para enviar para a próxima página</span>
              <div className="hidden">{provided.placeholder}</div>
            </div>
          )}
        </Droppable>
      )}

    </DragDropContext>
  );
};

export { Classes };
