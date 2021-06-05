import axios, { AxiosRequestConfig } from "axios";

export const getImages = async (searchString: string) => {
  const config: AxiosRequestConfig = {
    params: { q: searchString },
  };
  const data = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/search/get`,
    config
  );
  return data.data;
};
