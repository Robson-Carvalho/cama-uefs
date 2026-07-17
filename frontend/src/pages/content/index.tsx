import { Header } from "@/components/header";
import MDEditor from '@uiw/react-md-editor';
import { BodyLayout } from "@/layouts/BodyLayout";
import { Heart, Link as LinkIcon, Eye, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useTopic } from "@/hooks/useTopic";

const Content = () => {
  const {
    content,
    loading,
    liked,
    likesCount,
    views,
    author,
    coAuthors,
    handleLike,
    handleCopyLink,
  } = useTopic();

  return (
    <>
      <Header />
      <BodyLayout>
        {loading ? (
          <div className="flex flex-col gap-4">
            <Skeleton className="h-12 w-max-[1440px]" />
            <Skeleton className="h-24 w-max-[1440px]" />
            <Skeleton className="h-24 w-max-[1440px]" />
            <Skeleton className="h-24 w-max-[1440px]" />
            <Skeleton className="h-24 w-max-[1440px]" />
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            <div data-color-mode="light" className="bg-transparent">
              <MDEditor.Markdown 
                source={content.length >= 2 ? content : `## Em construção! 🚧`} 
                style={{ backgroundColor: 'transparent' }} 
              />
            </div>
            
            {/* Autores */}
            {(author || coAuthors.length > 0) && (
              <div className="flex flex-col gap-3 mt-4 pt-6 border-t border-border/30 bg-secondary/20 p-6 rounded-xl">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <PenLine className="w-4 h-4 text-primary" />
                  Créditos
                </h3>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm">
                  {author && (
                    <div className="flex flex-col">
                      <span className="text-muted-foreground text-xs uppercase tracking-wider font-semibold mb-1">Autor</span>
                      <span className="font-medium text-foreground">{author.name}</span>
                    </div>
                  )}
                  {coAuthors.length > 0 && (
                    <div className="flex flex-col">
                      <span className="text-muted-foreground text-xs uppercase tracking-wider font-semibold mb-1">Co-autores</span>
                      <span className="font-medium text-foreground">{coAuthors.map(c => c.name).join(", ")}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Interações da Aula */}
            {content.length >= 2 && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-8 pt-8 border-t border-border/50">
                <div className="flex flex-wrap items-center gap-3">
                  <Button 
                    variant={liked ? "default" : "outline"}
                    size="lg"
                    className={`rounded-full transition-all duration-300 gap-2 shadow-sm ${liked ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/30' : 'hover:border-red-500 hover:text-red-500'}`}
                    onClick={handleLike}
                  >
                    <Heart className={`w-5 h-5 ${liked ? 'fill-current scale-110' : 'scale-100'} transition-transform`} />
                    <span className="font-semibold">{likesCount}</span> 
                    {liked ? "Curtiu!" : "Curtir"}
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full gap-2 shadow-sm text-muted-foreground hover:text-foreground"
                    onClick={handleCopyLink}
                  >
                    <LinkIcon className="w-5 h-5" />
                    Compartilhar
                  </Button>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground bg-secondary/50 px-4 py-2.5 rounded-full border border-border/50 shadow-sm">
                  <Eye className="w-5 h-5" />
                  <span className="font-medium text-sm">{views} visualizações</span>
                </div>
              </div>
            )}
          </div>
        )}
      </BodyLayout>
    </>
  );
};

export { Content };
