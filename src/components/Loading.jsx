import ReactLoading from "react-loading";

const Loading = ({ isLoading }) => {
  return (
    <>
      {isLoading && (
        <div className="loadingEffect">
          <ReactLoading
            type="spinningBubbles"
            color="white"
            height={40}
            width={80}
          ></ReactLoading>
        </div>
      )}
    </>
  );
};

export default Loading;
