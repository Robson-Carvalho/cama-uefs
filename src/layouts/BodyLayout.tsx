import { Navigation } from "@/components/navigation";

interface BodyProps {
  children?: JSX.Element;
}

const BodyLayout = ({ children }: BodyProps) => {
  return (
    <div className="flex flex-col lg:flex-row px-4 sm:px-6 md:px-8 max-w-screen-2xl mx-auto page-full-width:max-w-full min-h-[calc(100vh-64px)]">
      <Navigation styles="hidden h-screen " />

      <div
        id="content"
        className="flex-1 relative py-8 lg:px-12 break-anywhere page-api-block:xl:max-2xl:pr-0 page-api-block:max-w-[1654px] page-api-block:mx-auto"
      >
        <div className="prose dark:prose-invert space-y-8">{children}</div>
      </div>
    </div>
  );
};

export { BodyLayout };
