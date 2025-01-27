import { Header } from "@/components/header";
import { BodyLayout } from "@/layouts/Body";

const NotFound = () => {
  return (
    <>
      <Header />
      <BodyLayout>
        <div className="min-h-[15vh] flex flex-row justify-center items-center">
          <h2 className="text-[#58595C] text-lg font-normal text-balance text-dark/8 hover:text-dark/9 hover:bg-dark/1 hover:before:bg-dark/3 dark:text-light/8 dark:hover:text-light/9 dark:hover:bg-light/1 dark:hover:before:bg-light/3 contrast-more:text-dark contrast-more:dark:text-light hover:contrast-more:text-dark dark:hover:contrast-more:text-light hover:contrast-more:ring-1 hover:contrast-more:ring-dark dark:contrast-more:hover:ring-light before:contents[] before:absolute before:inset-y-0 before:-left-px [&+div_a]:pl-5 sidebar-list-line:before:w-px sidebar-list-default:[&+div_a]:before:w-px sidebar-list-default:[&+div_a]:rounded-l-none sidebar-list-line:rounded-l-none">
            Page not found.
          </h2>
        </div>
      </BodyLayout>
    </>
  );
};

export { NotFound };
