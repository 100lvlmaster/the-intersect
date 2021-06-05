import { useState } from "react";
import { getImages } from "../lib/get_images";
import FlashScreen from "../components/flash_screen";
import NextHead from "next/head";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [showImages, setShowImages] = useState(false);
  let query: string = "";
  const meta = {
    title: "The Intersect (not)",
    description: `The intersect program from the show chuck`,
    image:
      "https://static.wikia.nocookie.net/chuck/images/f/f1/The_Intersect.jpg/revision/latest?cb=20100219205326",
    type: "website",
    url: "https://the-intersect.vercel.app/",
  };
  //
  const onSubmitButton = async () => {
    setLoading(true);
    const data = await getImages(query);
    setImages(data.data);
    setShowImages(true);
  };

  /// Call on mount
  const handleChangeEvent = (e: any) => (query = e.target.value);
  return (
    <div className="bg-black text-white">
      <NextHead>
        <title>{meta.title}</title>
        <meta name="author" content="Navin Kodag" />
        <meta name="stuff" content="follow, index" />
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={`${meta.url}${router.asPath}`} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={meta.image} key="ogimage" />
        <meta property="og:type" content={meta.type} />
        <meta property="og:title" content={meta.title} key="ogtitle" />
        <meta
          property="og:site_name"
          content="The Intersect (not)"
          key="ogsitename"
        />
        <meta property="og:url" content={`${meta.url}${router.asPath}`} />

        <meta
          name="twitter:card"
          content="summary_large_image"
          key="twhandle"
        />
        <meta name="twitter:site" content="@100lvlmaster" />
        <meta name="twitter:creator" content={"@100lvlmaster"} key="twhandle" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        <meta
          name="keywords"
          content="100lvlmaster, Navin Kodag, HTML, CSS, JavaScript, Next.js, Tailwind, "
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </NextHead>
      {showImages ? (
        <FlashScreen
          images={images}
          onEnd={() => {
            setShowImages(false);
            setImages([]);
            setLoading(false);
          }}
        ></FlashScreen>
      ) : (
        <div className="flex flex-col">
          <div className="h-screen w-full flex flex-col justify-items-stretch ">
            <Spacer />
            {loading ? (
              <div className="flex flex-col justify-items-center items-center space-y-10">
                <h1 className="bg-red-600 rounded-lg text-3xl  h-10 p-1 text-center">
                  downloading..
                </h1>
              </div>
            ) : (
              <div className="flex flex-col justify-items-center items-center space-y-10">
                <h1 className="bg-red-600 rounded-lg text-3xl  h-10 p-1 text-center">
                  The Intersect
                </h1>
                <input
                  placeholder="search .."
                  className="text-black bg-gray-200 rounded-lg text-sm p-2"
                  onChange={(e) => handleChangeEvent(e)}
                ></input>
                <button
                  className="bg-red-600 text-white p-3 rounded-lg hover:shadow-lg text-bold"
                  onClick={onSubmitButton}
                >
                  Flash
                </button>
              </div>
            )}
            <Spacer />
            <div className="flex flex-row p-10">
              <Spacer />
              <a href="#about">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M24 12c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12zm-18.005-1.568l1.415-1.414 4.59 4.574 4.579-4.574 1.416 1.414-5.995 5.988-6.005-5.988z" />
                </svg>
              </a>
            </div>
          </div>
          <div id="about" className="flex flex-col p-10 text-sm space-y-3">
            <h1 className="text-white text-xl py-5">About the website</h1>
            <p>
              This website is an obvious fake intersect created by{" "}
              <a
                href="https://100lvlmaster.in"
                target="_blank"
                rel="noreferrer"
                className="text-blue-200 underline"
              >
                100lvlmaster
              </a>
              . Because .. well, why not.
            </p>
            <h1 className="text-white text-xl py-5">The series</h1>
            <p>
              Chuck Bartowski (Zachary Levi) is in his mid-twenties and works at
              Buy More, a Burbank, California, consumer-electronics chain store.
              He is an intelligent, but unmotivated, computer service expert and
              works alongside his best friend, Morgan Grimes (Joshua Gomez). He
              had been expelled from Stanford University on false charges that
              he cheated in one of his classes, which likely damaged his drive
              and morale. He lives with his sister, Ellie (Sarah Lancaster), and
              her boyfriend, Devon "Captain Awesome" Woodcomb (Ryan McPartlin),
              who are doctors that constantly encourage Chuck to make progress
              in his professional and romantic life.
            </p>
            <p>
              Bryce Larkin (Matthew Bomer), Chuck's former Stanford University
              roommate and now a Central Intelligence Agency (CIA) agent, steals
              the Intersect, the entire merged database of the CIA and National
              Security Agency (NSA), and destroys the computer storing it. The
              sole surviving copy becomes subliminally embedded in Chuck's brain
              via encoded images when he opens an email from Bryce. The NSA's
              Major John Casey (Adam Baldwin) and CIA Officer Sarah Walker
              (Yvonne Strahovski) are dispatched to investigate.
            </p>
            <p>
              Chuck is recruited to use the knowledge he now possesses to help
              thwart assassins and international terrorists, upending his
              previously mundane life. The Intersect causes Chuck to receive
              involuntary "flashes" of information from the database, activated
              by triggers such as faces, voices, objects, and keywords. In order
              to protect his family and friends, Chuck must keep his second
              occupation a secret. Casey and Walker are assigned to watch over
              Chuck. They are forced to establish an uneasy alliance and
              cover-identities. Walker poses as Chuck's girlfriend and takes a
              job at a fast food restaurant near the Buy More. Casey reluctantly
              becomes part of the Buy More sales team.
            </p>
            <p>
              The main antagonists driving the plot are a series of rogue spy
              cabals, first internal to the United States intelligence community
              and then global in scope. A core part of the threat is the danger
              of the Intersect being either captured, making Chuck as much a
              liability as an asset to the government, or replicated, making
              Chuck obsolete or outmatched by less scrupulous spies.
            </p>
            <p>
              Chuck, Sarah, and Casey all face professional conflicts as they
              grow to respect each other. A genuine romantic interest develops
              between Chuck and Sarah. Chuck's desire to maintain his close
              relationships and eventually return to a normal life is challenged
              by the dangers and growing responsibilities of his secret life, so
              that he gradually becomes a more competent, confident, and willing
              spy. In later seasons, upgrades to the Intersect would include
              skills in espionage as well as information (the reason the
              Intersect was originally conceived), giving Chuck temporary
              knowledge of hand-to-hand combat and other skills such as playing
              the guitar, using a zipline, foreign languages, dancing, and
              firearms training.
            </p>
            <p>
              In the course of events, Chuck unravels mysteries from his life
              before the series, often dealing with the Intersect, such as why
              his parents left, why Bryce got him kicked out of Stanford, and
              why he's unusually suited for the Intersect. Meanwhile, Casey and
              Sarah confront unresolved issues from their lives before the
              series, including their families, Sarah's history with Bryce, and
              the spies they previously worked with. And as Chuck grows more
              comfortable with his own role, those closest to him are gradually
              drawn into his spy life.
            </p>
          </div>
          <div className="p-10 text-center text-xs text-gray-400">
            Made with Nextjs and ❤️
            <br /> All rights reserved..
            <br /> ..jk.. or am i -_-.{" "}
          </div>
        </div>
      )}
    </div>
  );
};
export default Home;
const Spacer = () => <div className="flex-grow"></div>;
