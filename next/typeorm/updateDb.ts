import { ensureConnection } from "./connect";
import { H1bdata_2019 } from "./entities/H1bdata_2019";
const connection = await ensureConnection();
const company = new H1bdata_2019();
company.avgSalary = 0;
company.caseCounts = 0;
company.employerName = "James";

connection.manager
  .save(company)
  .then((company) => console.log("saved", company.employerName));
