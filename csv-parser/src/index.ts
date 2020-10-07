import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import * as csv from "csv-parser";
import * as fs from "fs";
import { Company } from "./entity/Company";
const results = [];
fs.createReadStream("csv/software_h1b_employers_2019.csv")
  .pipe(csv())
  .on("data", (data) => results.push(data))
  .on("end", async () => {
    // console.log(results);
    createConnection().then(async (connection) => {
      for (let i = 0; i < results.length; i++) {
        const e = results[i];
        const company = new Company();
        (company.name = e.EMPLOYER_NAME),
          (company.caseCount = e.CASE_COUNTS),
          (company.avgSalary = e.AVG_SALARY);
        // UPDATE YEAR!!!!!!!!!!!!!!!!!!
        company.year = 2019;
        await connection.manager.save(company);
        if (i % 100 === 0) {
          console.log(`inserted ${i} companies`);
        }
      }
    });
    // save to db
  });

// createConnection().then(async connection => {

//     console.log("Inserting a new user into the database...");
//     const user = new User();
//     user.firstName = "Timber";
//     user.lastName = "Saw";
//     user.age = 25;
//     await connection.manager.save(user);
//     console.log("Saved a new user with id: " + user.id);

//     console.log("Loading users from the database...");
//     const users = await connection.manager.find(User);
//     console.log("Loaded users: ", users);

//     console.log("Here you can setup and run express/koa/any other framework.");

// }).catch(error => console.log(error));
