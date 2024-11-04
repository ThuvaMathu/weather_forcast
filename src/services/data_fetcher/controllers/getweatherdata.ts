import axios from "axios";

export const getWeather = async (q: any) => {
  return new Promise((resolve, reject) => {
    const apiKey = process.env.REACT_APP_ACCUWEATHER_API_KEY;
    const config = {
      method: "get",
      url: `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${q}`,
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    };
    axios
      .request(config)
      .then((response) => {
        // res.json(response.data);
        const key = response.data?.key || 22889;
        getData(key)
          .then((data) => {
            const resData = {
              locationData: {
                key: response.data?.key,
                LocalizedName: response.data?.LocalizedName,
                country: response.data?.Country?.LocalizedName,
              },
              weatherData: data?.response,
            };
            resolve({ response: resData, statusCode: 200, message: "success" });
          })
          .catch((error) => {
            reject({
              response: error,
              statusCode: 500,
              message: "Internal Server Error",
            });
          });
      })
      .catch((error) => {
        console.error(error);
        reject({
          response: error,
          statusCode: 500,
          message: "Internal Server Error",
        });
      });
  });
};

export const getData = async (param: number): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const apiKey = process.env.REACT_APP_ACCUWEATHER_API_KEY;
      const cityId = param; // Example city ID
      const urls = [
        `http://dataservice.accuweather.com/currentconditions/v1/${cityId}?apikey=${apiKey}`,
        `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${cityId}?apikey=${apiKey}`,
        `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityId}?apikey=${apiKey}`,
      ];
      const responses = await Promise.all(
        urls.map((url) =>
          axios.request({
            method: "get",
            url: url,
            headers: {
              "Content-Type": "application/json",
              accept: "application/json",
            },
          })
        )
      );
      const responseData = responses.map((response) => response.data);
      const combinedResponse = {
        currentConditions: responseData[0],
        hourlyForecast: responseData[1],
        dailyForecast: responseData[2],
      };
      resolve({
        message: "Success",
        code: 200,
        response: combinedResponse,
      });
    } catch (error) {
      console.error(error);
      reject({ message: "Internal Server Error", code: 500, response: error });
    }
  });
};
