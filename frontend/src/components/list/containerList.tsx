import { IClassItem } from "./interfaces";
import { Wrapper } from "./wrapper";

interface IContainerList {
  data: IClassItem[];
  onClose: () => void;
}

const ContainerList = ({ data, onClose }: IContainerList) => {
  return (
    <>
      {data.map((item) => (
        <Wrapper onClose={onClose} key={item.classID} data={item} />
      ))}
    </>
  );
};

export { ContainerList };
