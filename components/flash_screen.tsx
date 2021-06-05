import { useEffect, useState } from "react";

const FlashScreen = (props) => {
  const [currImage, setImage] = useState(0);
  //
  const toggleImages = async (index: number, pass: number) => {
    if (index < props.images.length) {
      setImage(index);
      await new Promise((resolve) => setTimeout(resolve, 100));
      return toggleImages(++index, pass);
    }
    if (props.images.length < 70 && pass < 2) {
      return toggleImages(0, ++pass);
    }
    props.onEnd();
    return;
  };
  //
  useEffect(() => {
    toggleImages(0, 1);
  }, []);
  return (
    <div className="h-screen w-full flex-grow flex flex-col justify-items-center items-center bg-black">
      {props.images.map((e: string, index: number) => (
        <img
          className={"w-full object-cover h-full".concat(
            index == currImage ? " " : " hidden"
          )}
          key={index}
          src={e}
        ></img>
      ))}
    </div>
  );
};

export default FlashScreen;
