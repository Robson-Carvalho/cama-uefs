import { Link } from "react-router";
import { Button } from "../ui/button";
import { Linkedin } from "lucide-react";

import { Anchor } from "../anchor";
import { ContainerList } from "../list/containerList";
import { IClassItem } from "../list/interfaces";
import { useEffect, useState } from "react";
import { api } from "@/services/api";

interface INavigationProps {
  styles?: string;
}

const Navigation = ({ styles }: INavigationProps) => {
  const [map, setMap] = useState<IClassItem[]>([]);

  useEffect(() => {
    if (map.length === 0) {
      const getMap = async () => {
        try {
          const { data } = await api.get("/class/content/map");
          setMap(data);
          localStorage.setItem("classMap", JSON.stringify(data));
        } catch (err) {
          console.error(err);
        }
      };

      getMap();
    }
  }, [map]);

  return (
    <aside
      className={`${styles} group page-no-toc:hidden grow-0 shrink-0 basis-full lg:basis-72 relative lg:sticky top-0 lg:top-16 lg:h-[calc(100vh_-_4rem)] z-[1] pt-6 pb-4 sidebar-filled:lg:pr-6 navigation-open:flex lg:flex flex-col gap-4 navigation-open:border-b border-dark/2 dark:border-light/2`}
    >
      <div className="w-full flex flex-col justify-center gap-8">
        <ul className="flex flex-col gap-y-0.5 sidebar-list-line:border-l border-dark/3 dark:border-light/2">
          <li className="flex flex-col">
            <Anchor path="/" text="Treinamento para OBI" />
          </li>
          <li className="flex flex-col">
            <Anchor path="/about" text="Sobre" />
          </li>

          {map.length > 0 ? <ContainerList data={map} /> : null}
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
