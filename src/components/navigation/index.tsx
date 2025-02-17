import { Link } from "react-router";
import { Button } from "../ui/button";
import { Eye, Linkedin } from "lucide-react";
import AnimatedNumbers from "react-animated-numbers";

import { Anchor } from "../anchor";
import { ContainerList } from "../list/containerList";

import { useData } from "@/contexts/data/useData";

interface INavigationProps {
  styles?: string;
  onClose: () => void;
}

const Navigation = ({ styles, onClose }: INavigationProps) => {
  const { data, views } = useData();

  return (
    <aside
      className={`${styles} group page-no-toc:hidden grow-0 shrink-0 basis-full lg:basis-72 relative lg:sticky top-0 lg:top-16 lg:h-[calc(100vh_-_4rem)] z-[1] pt-6 pb-4 sidebar-filled:lg:pr-6 navigation-open:flex lg:flex flex-col gap-4 navigation-open:border-b border-dark/2 dark:border-light/2`}
    >
      <div className="w-full flex flex-col justify-center gap-8">
        <ul className="flex flex-col gap-y-0.5 sidebar-list-line:border-l border-dark/3 dark:border-light/2">
          <li className="flex flex-col">
            <p className="text-[#58595C] group/tocA relative transition-colors flex flex-row justify-between p-1.5 pl-3 rounded-md straight-corners:rounded-none text-sm font-normal text-balance text-dark/8 hover:text-dark/9 hover:bg-dark/1 hover:before:bg-dark/3 dark:text-light/8 dark:hover:text-light/9 dark:hover:bg-light/1 dark:hover:before:bg-light/3 contrast-more:text-dark contrast-more:dark:text-light hover:contrast-more:text-dark dark:hover:contrast-more:text-light hover:contrast-more:ring-1 hover:contrast-more:ring-dark dark:contrast-more:hover:ring-light before:contents[] before:absolute before:inset-y-0 before:-left-px [&+div_a]:pl-5 sidebar-list-line:before:w-px sidebar-list-default:[&+div_a]:before:w-px sidebar-list-default:[&+div_a]:rounded-l-none sidebar-list-line:rounded-l-none">
              Visualizações{" "}
              <span className="flex flex-row gap-2">
                <AnimatedNumbers
                  key={Math.random()}
                  includeComma
                  transitions={(index) => ({
                    type: "spring",
                    duration: index + 0.5,
                  })}
                  animateToNumber={views}
                  fontStyle={{
                    color: "text-[#58595C]",
                    fontSize: 12,
                  }}
                />

                <Eye size={18} />
              </span>
            </p>
          </li>

          <li className="flex flex-col">
            <Anchor path="/" text="Treinamento para OBI" />
          </li>

          {data.length > 0 ? (
            <ContainerList onClose={onClose} data={data} />
          ) : null}
        </ul>

        <Button variant="outline">
          <Link
            to="https://www.linkedin.com/in/robson-carvalho-souza/"
            target="_blank"
            className="flex flex-row gap-2 justify-center"
          >
            <Linkedin />
            Developed by Robson Carvalho.
          </Link>
        </Button>
      </div>
    </aside>
  );
};

export { Navigation };
