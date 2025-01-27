import { IClassItem } from "./interfaces";
import { Wrapper } from "./wrapper";

interface IContainerList {
  data: IClassItem[];
}

const ContainerList = ({ data }: IContainerList) => {
  return (
    <>
      {data.map((data) => {
        if (data.topics.length > 0) {
          return <Wrapper key={data._id} data={data} />;
        }
      })}
    </>
  );
};

export { ContainerList };
