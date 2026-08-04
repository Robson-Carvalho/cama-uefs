import { useContext } from "react";

import { DataContext } from "./dataContext";

const useData = () => {
  const context = useContext(DataContext);

  return context;
};

export { useData };
