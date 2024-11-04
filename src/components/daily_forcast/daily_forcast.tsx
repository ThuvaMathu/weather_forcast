import React from "react";
import "swiper/css";
import { useAppSelector } from "../../state_manager/hooks";
import { formatTemperature } from "../../services/helper/format_temp";

export default function DailyForcast() {
  const transformedData = useAppSelector(
    (state) => state.systemState.weatherData.dailyForcast
  );
  const tempUnit = useAppSelector((state) => state.systemState.tempUnit);

  return (
    <>
      <div className=" p-6 w-full max-w-2xl bg-white/80 rounded-xl shadow shadow-white min-h-96 h-full overflow-hidden ">
        <div className=" w-full ">
          <p className=" font-semibold text-2xl text-primary-900 ">
            Daily forcast - 5 days
          </p>
          <p className=" text-primary-900 ">{transformedData?.text}</p>
        </div>

        <div className=" mt-2 max-h-72 overflow-y-scroll hide-scrollbar ">
          {transformedData?.forcast?.map((item, i) => (
            <div
              key={i}
              className="mt-1 w-full rounded-xl overflow-hidden border min-h-24 h-full my-4 "
            >
              <div className=" h-10 bg-primary-100 flex items-center justify-between gap-2 px-2  ">
                <p className=" font-semibold lg:text-lg text-base text-primary-700 ">
                  {item.date}
                </p>
                <p className=" font-semibold lg:text-2xl text-lg text-primary-700 ">
                  {formatTemperature(item.minTemp, tempUnit)} -{" "}
                  {formatTemperature(item.maxTemp, tempUnit)}
                </p>
                <p></p>
              </div>
              <div className=" w-full  lg:h-14 h-full flex lg:flex-row flex-col justify-between ">
                <div className="bg-primary-300 w-full flex justify-between items-center gap-2 px-2 ">
                  <p className=" font-medium ">Day</p>
                  <div>
                    <p className=" font-medium max-w-[110px] truncate text-xs ">
                      {item.dayPhrase}
                    </p>
                  </div>

                  <div className=" mt-3 w-16">
                    <img
                      src={`https://developer.accuweather.com/sites/default/files/${item.dayIcon}-s.png`}
                      alt=""
                      className=" w-16 object-cover  "
                    />
                  </div>
                </div>
                <div className="bg-primary-900 w-full flex justify-between items-center gap-2 p-2 text-primary-300 ">
                  <p className=" font-medium ">Night</p>{" "}
                  <div>
                    <p className=" font-medium max-w-[110px] truncate text-xs ">
                      {item.nightPhrase}
                    </p>
                  </div>
                  <div className=" mt-3 w-16">
                    <img
                      src={`https://developer.accuweather.com/sites/default/files/${item.nightIcon}-s.png`}
                      alt=""
                      className=" w-16 object-cover  "
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
