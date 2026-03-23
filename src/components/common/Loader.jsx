const Loader = () => {
  return (
    <div className="flex justify-center items-center h-[60vh]">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-12 h-12 border-4 border-cyan-400/30 rounded-full"></div>

        {/* Spinning ring */}
        <div className="absolute top-0 left-0 w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Loader;