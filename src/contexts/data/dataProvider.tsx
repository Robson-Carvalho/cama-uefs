import { useEffect, useState } from "react";
import { DataContext } from "./dataContext";
import { IClassItem } from "@/components/list/interfaces";
import { api } from "@/services/api";
import { AxiosError } from "axios";

interface IDataProvider {
  children?: JSX.Element;
}

const DataProvider = ({ children }: IDataProvider) => {
  const [map, setMap] = useState<IClassItem[] | []>([]);

  useEffect(() => {
    const getMap = async () => {
      try {
        const { data } = await api.get("/class/content/map");

        setMap(data);
      } catch (err) {
        const error = err as AxiosError;
        console.log(error.message);
      }
    };

    getMap();
  }, []);

  return (
    <DataContext.Provider value={{ data: map }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataProvider };
