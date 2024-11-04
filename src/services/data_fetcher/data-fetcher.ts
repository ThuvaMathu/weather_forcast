type IFetchData = {
  url: string;
  body?: any;
  method: "POST" | "GET" | "DELETE" | "PUT" | "PATCH";
};
export const fetchData = async ({ url, body, method }: IFetchData) => {
  try {
    var myHeaders = new Headers();
    // myHeaders.append("Authorization", `Bearer`);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    const requestOptions = {
      method: method,
      headers: myHeaders,
      body: JSON.stringify(body),
    };
    const response = await fetch(url, requestOptions);
    const result = await response.json();
    return {
      message: result?.message,
      statusCode: result?.statusCode,
      response: result?.response,
    };
  } catch (error: any) {
    return {
      message: "Internal Server Error",
      statusCode: 405,
      response: error,
    };
  }
};
