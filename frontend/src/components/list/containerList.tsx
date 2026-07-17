import { IClassItem } from "./interfaces";
import { Wrapper } from "./wrapper";

interface IContainerList {
  data: IClassItem[];
  onClose: () => void;
}

const ContainerList = ({ data, onClose }: IContainerList) => {
  return (
    <>
      {data.map((data) => {
        if ("order" in data) {
          return <Wrapper onClose={onClose} key={data.id} data={data} />;
        }
        return <Wrapper onClose={onClose} key={data.id} data={data} />;
      })}
    </>
  );
};

export { ContainerList };
