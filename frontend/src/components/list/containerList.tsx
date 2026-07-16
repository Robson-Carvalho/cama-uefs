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
        if (data.topics.length > 0) {
          return <Wrapper onClose={onClose} key={data._id} data={data} />;
        }
      })}
    </>
  );
};

export { ContainerList };
