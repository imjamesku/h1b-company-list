import { NextApiRequest, NextApiResponse } from "next";
import { ensureConnection } from "../../../../typeorm/connect";
import { Company } from "../../../../typeorm/entities/Company";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { limit, offset, sorted_by },
  } = _req;
  const db = await ensureConnection();
  const companies = await db
    .getRepository(Company)
    .createQueryBuilder()
    .orderBy(sorted_by as string, "DESC")
    .offset(parseInt(offset as string))
    .limit(parseInt(limit as string))
    .getMany();
  const data = companies.map((c) => ({
    AVG_SALARY: c.avgSalary,
    CASE_COUNTS: c.caseCount,
    EMPLOYER_NAME: c.name,
  }));
  res.status(200).json(data);
};

export default handler;
