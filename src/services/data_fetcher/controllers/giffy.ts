import axios from "axios";

export const getGiffy = (q: any) => {
  return new Promise((resolve, reject) => {
    // const { q }:any = req.body;
    const apiKey = process.env?.REACT_APP_GIPHY_API_KEY || "";

    const config = {
      method: "get",
      // url: `http://api.giphy.com/v1/gifs/search?q=${q}&api_key=5AXpkET0v0zq2wVlX0Ut5iKOD4jyp4CV&limit=15`,
      url: `http://api.giphy.com/v1/gifs/search?q=${q}&api_key=${apiKey}&limit=15`,
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    };
    axios
      .request(config)
      .then((response) => {
        const transformedData = response?.data?.data?.map(
          (item: any) =>
            item?.images?.original?.webp ||
            "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHVsN3FpNXlnZWsxaWpudzZsdW4zdWF5dmgyMWF6bHY2a29wcGI3bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26BGDQxDCZDFHW5Ne/giphy.gif"
        );
        resolve({
          response: transformedData,
          statusCode: 200,
          message: "success",
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
