import { dateTimeToData } from "../helper/datetime_to_date";
export interface IForecastData {
  locationData?: {
    LocalizedName: string;
    country: string;
  };
  current?: {
    temperature: number;
    unit: string;
    icon: string;
    phrase: string;
  };
  dailyForcast?: {
    text?: string | null;
    forcast?: {
      date: string;
      unit: string;
      minTemp: number;
      maxTemp: number;
      dayIcon: string;
      nightIcon: string;
      dayPhrase?: string | null;
      nightPhrase?: string | null;
    }[];
  };
  hourlyForcast?: {
    epochDateTime: number;
    timeStamp: string;
    unit: string;
    temperature: number;
    icon: string;
    IconPhrase: string;
    IsDaylight: boolean;
  }[];
}

export const transformWeatherData = (params: any): IForecastData => {
  const currentCondition = params?.weatherData?.currentConditions[0];
  return {
    locationData: params?.locationData,
    current: {
      temperature: currentCondition?.Temperature?.Imperial?.Value,
      unit: currentCondition?.Temperature?.Imperial?.Unit,
      icon:
        currentCondition?.WeatherIcon?.toString().length === 1
          ? `0${currentCondition?.WeatherIcon}`
          : currentCondition?.WeatherIcon?.toString(),
      phrase: currentCondition?.WeatherText,
    },
    dailyForcast: {
      text: params?.weatherData?.dailyForecast?.Headline?.Text,
      forcast: params?.weatherData?.dailyForecast?.DailyForecasts?.map(
        (item: any) => ({
          date: dateTimeToData(item.Date),
          unit: item.Temperature.Maximum.Unit,
          minTemp: item.Temperature.Minimum.Value,
          maxTemp: item.Temperature.Maximum.Value,
          dayIcon:
            item.Day.Icon?.toString().length === 1
              ? `0${item.Day.Icon}`
              : item.Day.Icon?.toString(),
          nightIcon:
            item.Night.Icon?.toString().length === 1
              ? `0${item.Night?.Icon}`
              : item.Night.Icon?.toString(),
          dayPhrase: item.Day.IconPhrase?.replace("w/", "&"),
          nightPhrase: item.Night.IconPhrase?.replace("w/", "&"),
        })
      ),
    },
    hourlyForcast: params?.weatherData?.hourlyForecast?.map((item: any) => ({
      epochDateTime: item.EpochDateTime,
      timeStamp: item.DateTime,
      unit: item.Temperature.Unit,
      temperature: item.Temperature.Value,
      icon:
        item.WeatherIcon.toString().length === 1
          ? `0${item.WeatherIcon}`
          : item.WeatherIcon.toString(),
      IconPhrase: item.IconPhrase,
      IsDaylight: item.IsDaylight,
    })),
  };
};
