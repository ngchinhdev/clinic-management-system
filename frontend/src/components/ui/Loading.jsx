const Loading = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center py-10">
      <div className="pyramid-loader">
        <div className="wrapper">
          <span className="side side1"></span>
          <span className="side side2"></span>
          <span className="side side3"></span>
          <span className="side side4"></span>
          <span className="top"> </span>
          <span className="corner corner1"></span>
          <span className="corner corner2"></span>
          <span className="corner corner3"></span>
          <span className="corner corner4"></span>
          <span className="shadow"></span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
