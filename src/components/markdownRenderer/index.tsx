import "highlight.js/styles/atom-one-dark.css";
import { toast } from "react-toastify";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

import { Button } from "@/components/ui/button";

interface IRenderMarkdownProps {
  content: string;
}

const MarkdownRenderer = ({ content }: IRenderMarkdownProps) => {
  const notify = () => toast.success("Código copiado!");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      notify();
    });
  };

  return (
    <Markdown
      className="prose dark:prose-invert space-y-8"
      rehypePlugins={[rehypeHighlight]}
      components={{
        h1: ({ node, ...props }) => (
          <h1
            {...props}
            className="text-4xl font-bold flex items-center gap-4 font-[Inter]"
          />
        ),
        h2: ({ node, ...props }) => (
          <h2 {...props} className="text-2xl font-bold mt-10 mb-10 " />
        ),
        h3: ({ node, ...props }) => (
          <h3 {...props} className="text-xl font-bold mt-10 mb-10" />
        ),
        p: ({ node, ...props }) => (
          <p
            {...props}
            className="w-full decoration-primary/6  page-api-block:ml-0 text-justify"
          />
        ),

        a: ({ node, ...props }) => (
          <a
            {...props}
            className="underline underline-offset-2 font-medium text-[#346DDB] hover:text-[#58595C] transition-colors"
          />
        ),

        code: ({ node, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || "");
          const codeContent = String(children).trim();

          return match ? (
            <div className="w-full bg-gray-900 text-gray-200 rounded-lg shadow-md overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                <span className="text-sm text-gray-400 font-mono">
                  {match[1]}
                </span>
                <Button
                  onClick={() => copyToClipboard(codeContent)}
                  className="text-xs bg-gray-700 hover:bg-gray-600 text-white py-1 px-3 rounded-md"
                >
                  Copiar
                </Button>
              </div>

              <pre className="  p-4 text-sm overflow-x-auto font-mono rounded-md">
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            </div>
          ) : (
            <code className="bg-gray-800 text-gray-200 px-2 py-1 rounded">
              {children}
            </code>
          );
        },
        img: ({ node, ...props }) => {
          const { alt } = props;
          return (
            <figure className="flex flex-col justify-center items-center my-6">
              <img {...props} className="rounded-lg shadow-lg" />
              <figcaption className="text-center text-sm mt-2 text-gray-500">
                Fonte: {alt} <br />
              </figcaption>
            </figure>
          );
        },
      }}
    >
      {content}
    </Markdown>
  );
};

export { MarkdownRenderer };
