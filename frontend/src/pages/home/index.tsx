import { Header } from "@/components/header";
import { MarkdownRenderer } from "@/components/markdownRenderer";
import { BodyLayout } from "@/layouts/BodyLayout";
import { markdownContent } from "./content";

const Home = () => {
  return (
    <>
      <Header />
      <BodyLayout>
        <MarkdownRenderer content={markdownContent} />
      </BodyLayout>
    </>
  );
};

export { Home };
