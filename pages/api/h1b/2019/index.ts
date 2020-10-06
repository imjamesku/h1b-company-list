import { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from "sqlite3";

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { limit, offset, sorted_by },
  } = _req;
  //   console.log(limit, offset);
  try {
    let db = new sqlite3.Database("sqlite/h1b_data_2019.db", (err) => {
      if (err) {
        console.error(err.message);
      }
      //   console.log("connected to the h1b database");
    });
    db.all(
      `SELECT * from h1bdata_2019 ORDER by ${sorted_by} DESC limit ${limit} OFFSET ${offset}`,
      [],
      (err, rows) => {
        if (err) {
          console.error(err.message);
        }
        db.close();
        res.status(200).json(rows);
      }
    );
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
