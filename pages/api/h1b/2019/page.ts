import { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from "sqlite3";

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { limit, offset },
  } = _req;
  console.log(limit, offset);
  try {
    let db = new sqlite3.Database("sqlite/h1b_data_2019.db", (err) => {
      if (err) {
        console.error(err.message);
      }
      // console.log("connected to the h1b database")
    });
    db.all(`SELECT COUNT(*) FROM h1bdata_2019;`, [], (err, count) => {
      if (err) {
        console.error(err.message);
      }
      db.close();
      res.status(200).json({ count: count[0]["COUNT(*)"] });
    });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
