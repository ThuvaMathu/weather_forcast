import React, { useLayoutEffect, useState } from "react";
import CurrentWeather from "../components/cureent_weather/current_weather";
import HourlyForcast from "../components/hourly_forcast/hourly_forcast";
import DailyForcast from "../components/daily_forcast/daily_forcast";
import ShareSocial from "../components/share_social/share_social";
import { fetchData } from "../services/data_fetcher/data-fetcher";
import { transformWeatherData } from "../services/data_service/transform_weather";
import { useAppDispatch, useAppSelector } from "../state_manager/hooks";
import { setWeatherData } from "../state_manager/slices";
import Search from "../components/header/search";
import CurrentWeatherSkelton from "../components/cureent_weather/current_weather_sketlon";
import HourlyForcastSkelton from "../components/hourly_forcast/hourly_forcast_skelton";
import DailyForcastSkelton from "../components/daily_forcast/daily_forcast_skelton";
import { toast } from "react-toastify";
import { weatherURL } from "../services/data_fetcher/enpoints";
import { getWeather } from "../services/data_fetcher/controllers/getweatherdata";

export default function Main() {
  const dispatch = useAppDispatch();
  const weatheData = useAppSelector((state) => state.systemState.weatherData);
  const [isLoading, setisLoading] = useState(false);
  // call api when user search
  const handleSearch = (param: string) => {
    console.log(param);
    setisLoading(true);
    // fetchData({
    //   url: weatherURL,
    //   method: "POST",
    //   body: {
    //     q: param,
    //   },
    // })
    getWeather(param)
      .then((res: any) => {
        if (res.statusCode === 200) {
          dispatch(
            setWeatherData({ value: transformWeatherData(res.response) })
          );
        } else {
          toast.error("Somthing went wrong! please try again later");
        }
      })
      .catch((err) => {
        toast.error("Somthing went wrong! please try again later");

        console.log(err);
      })
      .finally(() => setisLoading(false));
  };

  // call api when user is enter and alow current loacation
  useLayoutEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latlng =
              position.coords.latitude + "," + position.coords.longitude;
            handleSearch(latlng);
          },
          (error) => {
            handleSearch("-33.8688197,151.2092955");
            console.error("Error getting location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };
    const handleSearch = (param: string) => {
      setisLoading(true);
      fetchData({
        url: weatherURL,
        method: "POST",
        body: {
          q: param,
        },
      })
        .then((res) => {
          if (res.statusCode === 200) {
            dispatch(
              setWeatherData({ value: transformWeatherData(res.response) })
            );
          } else {
            toast.error("Somthing went wrong! please try again later");
          }
        })
        .catch((err) => {
          toast.error("Somthing went wrong! please try again later");

          console.log(err);
        })
        .finally(() => setisLoading(false));
    };
    getLocation();
  }, []);

  return (
    <>
      <div className=" h-screen w-full bg-gray-700/50 md:p-10 p-3 overflow-y-auto ">
        {/* header with search box */}
        <div>
          <Search
            onChange={(data) => handleSearch(data?.latlng || "")}
            isLoading={isLoading}
          />
        </div>
        {/* main content, forcast */}
        <div className="w-full flex xl:flex-row flex-col  mt-12 gap-8 ">
          <div className=" w-full flex flex-col gap-8 max-w-xl ">
            <div className="">
              {weatheData.current ? (
                <CurrentWeather />
              ) : (
                <CurrentWeatherSkelton />
              )}
            </div>
            <div>
              {weatheData.hourlyForcast ? (
                <HourlyForcast />
              ) : (
                <HourlyForcastSkelton />
              )}
            </div>
          </div>
          <div className=" w-full flex flex-col gap-8 ">
            <div>
              {weatheData.dailyForcast ? (
                <DailyForcast />
              ) : (
                <DailyForcastSkelton />
              )}
            </div>
            <div>
              <ShareSocial />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
