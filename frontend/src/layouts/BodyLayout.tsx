import { Navigation } from "@/components/navigation";

interface BodyProps {
  children?: JSX.Element;
}

const BodyLayout = ({ children }: BodyProps) => {
  return (
    <div className="relative min-h-[calc(100vh-64px)] w-full flex flex-col lg:flex-row max-w-screen-2xl mx-auto">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <Navigation onClose={() => {}} styles="hidden lg:flex lg:w-72 border-r border-border/40 bg-background/30 backdrop-blur-sm" />

      <main
        id="content"
        className="flex-1 relative py-8 px-4 sm:px-8 lg:px-12 w-full mx-auto"
      >
        <div className="prose dark:prose-invert prose-headings:font-heading prose-headings:font-semibold prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl max-w-5xl mx-auto bg-card p-6 sm:p-10 rounded-2xl shadow-sm border border-border/50 animate-fade-in-up">
          {children}
        </div>
      </main>
    </div>
  );
};

export { BodyLayout };
