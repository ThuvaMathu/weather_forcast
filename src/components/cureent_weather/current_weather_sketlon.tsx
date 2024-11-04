export default function CurrentWeatherSkelton() {
  return (
    <>
      <div className=" p-6 w-full max-w-xl bg-white/70 rounded-xl shadow shadow-white min-h-72 h-full ">
        <div className=" w-full flex justify-between items-center ">
          <div className=" flex gap-2 w-full max-w-xs h-6 bg-primary-50/70 animate-pulse rounded-lg"></div>
          <div className=" w-14 h-6 bg-primary-50/70 animate-pulse rounded-lg"></div>
        </div>
        <div className=" w-full flex md:flex-row flex-col mt-6 gap-2 ">
          <div className=" md:w-2/5 w-full ">
            <div className=" font-semibold text-2xl text-primary-900 h-4 bg-primary-50/70 animate-pulse w-32 rounded-lg " />

            <div className="  text-lg text-primary-900 h-4 mt-2 bg-primary-50/70 animate-pulse w-20 rounded-lg " />

            <div className=" mt-4   ">
              <div>
                <p className=" font-semibold text-6xl text-primary-500  h-4 mt-2 bg-primary-50/70 animate-pulse w-20 rounded-lg "></p>
                <p className=" text-lg mt-2 text-primary-900 h-4 m bg-primary-50/70 animate-pulse w-20 rounded-lg "></p>
              </div>
            </div>
          </div>
          <div className=" md:w-3/5 w-full  pl-4 flex justify-center items-center relative ">
            <div className=" w-44 object-cover h-44 rounded-lg overflow-hidden  bg-primary-50/70 animate-pulse " />
          </div>
        </div>
      </div>
    </>
  );
}
