import { NextApiRequest, NextApiResponse } from "next";
import { ensureConnection } from "../../../../typeorm/connect";
import { Company } from "../../../../typeorm/entities/Company";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const db = await ensureConnection();
  const { count } = await db
    .getRepository(Company)
    .createQueryBuilder()
    .select("COUNT(*)", "count")
    .getRawOne();
  res.status(200).json({ count });
};

export default handler;
