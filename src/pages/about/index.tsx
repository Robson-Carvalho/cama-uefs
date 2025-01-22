import { Header } from "@/components/header";
import { MarkdownRenderer } from "@/components/markdownRenderer";
import { BodyLayout } from "@/layouts/Body";
import { markdownContent } from "./content";

const About = () => {
  return (
    <>
      <Header />
      <BodyLayout>
        <MarkdownRenderer content={markdownContent} />
      </BodyLayout>
    </>
  );
};

export { About };
