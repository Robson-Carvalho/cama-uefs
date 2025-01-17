interface BodyProps {
  children: JSX.Element;
}

const BodyLayout = ({ children }: BodyProps) => {
  return <div className="max-w-[1440px] mx-auto px-12">{children}</div>;
};

export { BodyLayout };
