import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { getImages } from "../lib/get_images";
import { saveTheme, getTheme } from "../utils/theme_helper";
const Home = () => {
  const [mounted, setMount] = useState(false);
  const { theme, setTheme } = useTheme();
  const [images, setImages] = useState([]);
  const [showImages, setShowImages] = useState(false);
  let query: string = "";
  //
  const onChangeTheme = (val: string) => {
    setTheme(val);
    saveTheme(val);
    if (!mounted) setMount(!mounted);
  };
  const onSubmitButton = async () => {
    const data = await getImages(query);
    setImages(data.data);
    console.log(data.data.length);

    setShowImages(true);
  };

  /// Call on mount
  useEffect(() => onChangeTheme(getTheme()), []);
  const handleChangeEvent = (e: any) => (query = e.target.value);
  return showImages ? (
    <FlashScreen
      images={images}
      onEnd={() => {
        setShowImages(false);
        setImages([]);
      }}
    ></FlashScreen>
  ) : (
    <div className="h-screen flex flex-col">
      <div className="p-10">
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
      </div>
    </div>
  );
};
export default Home;

const FlashScreen = (props) => {
  const [currImage, setImage] = useState(0);
  //
  const toggleImages = async (index: number) => {
    if (index < props.images.length) {
      setImage(index);
      console.log(index);
      await new Promise((resolve) => setTimeout(resolve, 200));
      return toggleImages((index = index + 1));
    }

    props.onEnd();
    return;
  };
  //
  useEffect(() => {
    toggleImages(0);
  }, []);
  return (
    <div>
      {props.images.map((e, index) => (
        <img
          className={"w-full h-full".concat(
            index == currImage ? " " : " hidden"
          )}
          key={index}
          src={e}
        ></img>
      ))}
    </div>
  );
};
