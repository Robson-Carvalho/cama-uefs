interface ILoadingSpinnerProps {
  r?: string;
}

const LoadingSpinner = ({ r }: ILoadingSpinnerProps) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className={`${
          r ? `w-${r} h-${r}` : `w-8 h-8`
        } border-4 border-t-4 border-gray-200 dark:border-gray-100 border-solid rounded-full animate-spin border-t-[#58595C] dark:border-t-[#A9A9A9] `}
      ></div>
    </div>
  );
};

export { LoadingSpinner };
