// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getSearch } from "../../utils/get_search";
export default async (req: any, res: any) => {
  let result: Object = {};
  try {
    result = await getSearch(req.query.q);
  } catch (e) {
    res.status(400).json({ data: e });
  }
  res.status(200).json({ data: result });
};
