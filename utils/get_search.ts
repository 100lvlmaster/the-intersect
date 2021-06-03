const puppeteer = require("puppeteer");

export const getSearch = async (searchQuery: string) => {
  searchQuery = searchQuery.replaceAll(" ", "+");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.google.com/imghp?hl=EN");
  //
  await page.type('input[name="q"]', searchQuery);
  await page.keyboard.press("Enter");
  // set timeout to load
  await new Promise((r) => setTimeout(r, 1500));
  const images = await page.evaluate(() =>
    Array.from(document.images, (e) => e.src)
  );
  const filteredList = images.filter((e: string) => e !== "");
  // keep only 50 images

  await page.screenshot({ path: "example.png" });
  await browser.close();
  return filteredList;
};
