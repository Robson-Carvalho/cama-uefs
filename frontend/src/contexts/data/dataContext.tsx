import { IClassItem } from "@/components/list/interfaces";
import { createContext } from "react";

interface IDataContext {
  data: IClassItem[];
  loading: boolean;
}

const DataContext = createContext<IDataContext>({} as IDataContext);

export { DataContext };
