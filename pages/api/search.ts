// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getSearch } from "../../utils/get_search";
export default async (req, res) => {
  const result: Object = await getSearch("apple");
  res.status(200).json({ data: result });
};
