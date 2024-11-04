import React, { useLayoutEffect, useState } from "react";
import { GrLocation } from "react-icons/gr";
import TempSwitch from "./temp_switch";
import { useAppSelector } from "../../state_manager/hooks";
import { formatTemperature } from "../../services/helper/format_temp";
import { fetchData } from "../../services/data_fetcher/data-fetcher";
import { generateRandomNumber } from "../../services/helper/random_number";
import { IoReload } from "react-icons/io5";
import { giphyURL } from "../../services/data_fetcher/enpoints";
import { getGiffy } from "../../services/data_fetcher/controllers/giffy";
type Props = {};

export default function CurrentWeather({}: Props) {
  const current = useAppSelector(
    (state) => state.systemState.weatherData.current
  );
  const location = useAppSelector(
    (state) => state.systemState.weatherData.locationData
  );
  const tempUnit = useAppSelector((state) => state.systemState.tempUnit);
  const [gifArray, setGifArray] = useState<string[]>([]);
  const [viewedGif, setViewedGif] = useState<string>("");

  useLayoutEffect(() => {
    const getGif = () => {
      // fetchData({
      //   url: giphyURL,
      //   method: "POST",
      //   body: {
      //     q: current?.phrase || "Weather",
      //   },
      // })
      getGiffy(current?.phrase || "Weather")
        .then((res: any) => {
          if (res.statusCode === 200) {
            console.log(res, "Weather giffy");
            setGifArray(res?.response);
            const rand = generateRandomNumber(res?.response?.length - 2);
            setViewedGif(res?.response[rand]);
          } else {
            console.log(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getGif();
  }, [current]);
  const handleReload = () => {
    const rand = generateRandomNumber(gifArray.length - 2);
    setViewedGif(gifArray[rand]);
  };
  return (
    <>
      <div className=" p-6 w-full max-w-xl bg-white/70 rounded-xl shadow shadow-white min-h-72 h-full ">
        <div className=" w-full flex justify-between items-center ">
          <div className=" flex gap-2">
            <GrLocation className=" text-primary-700" size={24} />
            <p className=" font-semibold text-xl text-primary-900 ">
              {location?.LocalizedName}
            </p>
          </div>
          <div>
            <TempSwitch />
          </div>
        </div>
        <div className=" w-full flex md:flex-row flex-col mt-6 gap-2 ">
          <div className=" md:w-2/5 w-full ">
            <p className=" font-semibold text-2xl text-primary-900 ">Weather</p>
            <p className="  text-lg text-primary-900 ">Now</p>
            <div className=" mt-4   ">
              <div>
                <p className=" font-semibold text-6xl text-primary-500 ">
                  {formatTemperature(current?.temperature!, tempUnit)}
                </p>
                <p className=" text-lg mt-2 text-primary-900 ">
                  {current?.phrase}
                </p>
              </div>
            </div>
          </div>
          <div className=" md:w-3/5 w-full  pl-4 flex justify-center items-center relative ">
            <img
              src={
                viewedGif
                  ? viewedGif
                  : "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHVsN3FpNXlnZWsxaWpudzZsdW4zdWF5dmgyMWF6bHY2a29wcGI3bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26BGDQxDCZDFHW5Ne/giphy.gif"
              }
              alt=""
              className=" w-44 object-cover h-44 rounded-lg overflow-hidden"
            />
            <button
              className=" absolute bottom-0 right-[10%] "
              onClick={handleReload}
            >
              <IoReload />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
