export default function DailyForcastSkelton() {
  const tempArray = new Array<string>(3).fill("");
  return (
    <>
      <div className=" p-6 w-full max-w-2xl bg-white/80 rounded-xl shadow shadow-white h-96 overflow-hidden ">
        <div className=" w-full ">
          <p className=" font-semibold text-2xl text-primary-900 h-6 bg-primary-50/70 animate-pulse w-2/3 mb-2 rounded-lg "></p>
          <p className=" text-primary-900 h-4 bg-primary-50/70 animate-pulse w-full rounded-lg   "></p>
        </div>

        <div className=" mt-2 max-h-72 overflow-y-scroll hide-scrollbar ">
          {tempArray.map((item, i) => (
            <div
              key={i}
              className="mt-1 w-full rounded-xl overflow-hidden border min-h-24 h-full my-4 "
            >
              <div className="   h-28 bg-primary-50/70 animate-pulse w-full rounded-lg   ">
                <p></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
