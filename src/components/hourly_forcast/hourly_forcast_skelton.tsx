export default function HourlyForcastSkelton() {
  const tempArray = new Array<string>(5).fill("");

  return (
    <>
      <div className=" p-6 w-full max-w-xl bg-white/80 rounded-xl shadow shadow-white h-80 ">
        <div className=" w-full ">
          <div className=" flex gap-2">
            <p className=" font-semibold text-2xl text-primary-900 h-6 bg-primary-50/70 animate-pulse w-2/3 rounded-lg  "></p>
          </div>
        </div>
        <div className=" w-full overflow-scroll hide-scrollbar flex gap-4 mt-4 ">
          {tempArray.map((item, i) => (
            <div
              className=" w-16 rounded-xl h-[120px]  bg-primary-50/70 animate-pulse   "
              key={i}
            />
          ))}
        </div>
        <div className=" mt-2 ">
          <p className=" font-semibold text-2xl text-primary-900 h-6 bg-primary-50/70 animate-pulse w-2/3 rounded-lg  "></p>
          <div className="mt-1 h-20 w-full bg-primary-50/70 animate-pulse  rounded-lg "></div>
        </div>
      </div>
    </>
  );
}
