import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { converTime as converEpochTime } from "../../services/helper/epoch_to_time";
import { useAppSelector } from "../../state_manager/hooks";
import { formatTemperature } from "../../services/helper/format_temp";

export default function HourlyForcast() {
  const hourlyData = useAppSelector(
    (state) => state.systemState.weatherData.hourlyForcast
  );
  const tomorrowData = useAppSelector(
    (state) => state.systemState.weatherData.dailyForcast?.forcast![1]
  );
  const tempUnit = useAppSelector((state) => state.systemState.tempUnit);

  return (
    <>
      <div className=" p-6 w-full max-w-xl bg-white/80 rounded-xl shadow shadow-white min-h-80 h-full ">
        <div className=" w-full ">
          <div className=" flex gap-2">
            <p className=" font-semibold text-2xl text-primary-900 ">
              Today - Hourly forcast
            </p>
          </div>
        </div>
        <Swiper
          spaceBetween={5}
          // slidesPerView={5}
          breakpoints={{
            320: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 40,
            },
          }}
          className=" px-4 cursor-pointer mt-6"
        >
          {hourlyData?.map((data, i) => (
            <SwiperSlide key={i}>
              <div className=" w-16 rounded-xl border border-primary-900  h-[120px] flex justify-center flex-col items-center  ">
                <p className=" text-primary-700 font-medium  ">
                  {" "}
                  {converEpochTime(data.epochDateTime)}
                </p>
                <div className=" mt-3 w-16">
                  <img
                    src={`https://developer.accuweather.com/sites/default/files/${data.icon}-s.png`}
                    alt=""
                    className=" w-16 object-cover  "
                  />
                </div>
                <p className="mt-3 text-primary-700 font-medium  ">
                  {formatTemperature(data.temperature!, tempUnit).replace(
                    ".0",
                    ""
                  )}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className=" mt-2 ">
          <p className=" font-semibold text-2xl text-primary-900 ">Tomorrow</p>
          <div className="mt-1 w-full rounded-xl overflow-hidden  min-h-16 lg:max-h-20 max-h-full flex lg:flex-row flex-col  justify-between ">
            <div className="bg-primary-300 w-full  ">
              <div className=" flex justify-between items-center gap-2 p-2 ">
                <div className="w-full">
                  <p className=" font-medium ">Day</p>
                </div>
                <p className=" w-full font-medium text-3xl text-primary-900  ">
                  {formatTemperature(tomorrowData?.minTemp!, tempUnit)}
                </p>
                <div className=" w-full mt-3 ">
                  <img
                    src={`https://developer.accuweather.com/sites/default/files/${tomorrowData?.dayIcon}-s.png`}
                    alt=""
                    className=" w-16 object-cover  "
                  />
                </div>
              </div>
              <div className=" px-2 -translate-y-4 ">
                <p className=" font-medium text-xs ">
                  {tomorrowData?.dayPhrase}
                </p>
              </div>
            </div>
            <div className="bg-primary-900 w-full  ">
              <div className="flex justify-between items-center gap-2 p-2 text-primary-300 ">
                <div className="w-full">
                  <p className=" font-medium ">Night</p>
                </div>
                <p className=" w-full font-medium text-3xl   ">
                  {formatTemperature(tomorrowData?.maxTemp!, tempUnit)}
                </p>
                <div className=" w-full mt-3 ">
                  <img
                    src={`https://developer.accuweather.com/sites/default/files/${tomorrowData?.nightIcon}-s.png`}
                    alt=""
                    className=" w-16 object-cover  "
                  />
                </div>
              </div>
              <div className=" px-2 -translate-y-4 text-primary-300">
                <p className=" font-medium text-xs ">
                  {tomorrowData?.nightPhrase}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
