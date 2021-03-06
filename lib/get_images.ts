import axios, { AxiosRequestConfig } from "axios";

export const getImages = async (searchString: string) => {
  const config: AxiosRequestConfig = {
    params: { q: searchString },
    headers: { Authorization: process.env.NEXT_PUBLIC_API_KEY },
  };
  const data = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/search`,
    config
  );
  return data.data;
};

//
