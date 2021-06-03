import axios from "axios";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { saveTheme, getTheme } from "../utils/theme_helper";
const imgData: string =
  "data:image/jpeg;base64,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";

const Home = () => {
  const [mounted, setMount] = useState(false);
  const { theme, setTheme } = useTheme();
  const [searchQuery, setSeachQuery] = useState(null);
  let query: string = "";
  const fetcher = async (url: string) => {
    const result = await axios.get(url);
    return result.data;
  };
  const apiUrl = searchQuery === null ? null : `/api/search?q=${searchQuery}`;
  const { data } = useSWR(apiUrl, fetcher);
  /// Change theme
  const onChangeTheme = (val: string) => {
    setTheme(val);
    saveTheme(val);
    if (!mounted) setMount(!mounted);
  };
  const onSubmitButton = async () => {
    setSeachQuery(query);
  };

  /// Call on mount
  useEffect(() => onChangeTheme(getTheme()), []);
  const handleChangeEvent = (e: any) => (query = e.target.value);
  return (
    <div className="flex flex-col">
      <div className="p-10">
        {data != null ? data.data.map((e) => <img src={e}></img>) : ""}
        <button
          aria-label="Toggle Dark Mode"
          type="button"
          className="bg-gray-200 flex flex-col justify-cente items-center dark:bg-gray-800 rounded p-2.5 h-8 w-8"
          onClick={() => onChangeTheme(theme === "dark" ? "light" : "dark")}
        >
          {mounted && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              className="h-4 w-4 text-gray-800 dark:text-gray-200"
            >
              {theme === "dark" ? (
                <path d="M4.069 13h-4.069v-2h4.069c-.041.328-.069.661-.069 1s.028.672.069 1zm3.034-7.312l-2.881-2.881-1.414 1.414 2.881 2.881c.411-.529.885-1.003 1.414-1.414zm11.209 1.414l2.881-2.881-1.414-1.414-2.881 2.881c.528.411 1.002.886 1.414 1.414zm-6.312-3.102c.339 0 .672.028 1 .069v-4.069h-2v4.069c.328-.041.661-.069 1-.069zm0 16c-.339 0-.672-.028-1-.069v4.069h2v-4.069c-.328.041-.661.069-1 .069zm7.931-9c.041.328.069.661.069 1s-.028.672-.069 1h4.069v-2h-4.069zm-3.033 7.312l2.88 2.88 1.415-1.414-2.88-2.88c-.412.528-.886 1.002-1.415 1.414zm-11.21-1.415l-2.88 2.88 1.414 1.414 2.88-2.88c-.528-.411-1.003-.885-1.414-1.414zm6.312-10.897c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6z" />
              ) : (
                <path d="M20.354 15.354 A 9 9 0 0 1 8.646 3.646 A 9.003 9.003 0 0 0 12 21 a 9.003 9.003 0 0 0 8.354 -5.646 Z" />
              )}
            </svg>
          )}
        </button>
      </div>
      <div className="flex flex-grow flex-col justify-items-center items-center text-center p-40 text-3xl font-bold space-y-10">
        <input
          placeholder="Search by name"
          className="text-black bg-gray-200 rounded-full text-sm p-2"
          onChange={(e) => handleChangeEvent(e)}
        ></input>
        <button
          className="bg-blue-600 text-white p-10 rounded-xl hover:shadow-lg "
          onClick={onSubmitButton}
        >
          Press for images
        </button>
        <img src={imgData}></img>
      </div>
      {/* {data ? data.data.map((e: string) => <img src={e}></img>) : ""} */}
    </div>
  );
};
export default Home;
