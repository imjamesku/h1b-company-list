import "reflect-metadata";
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique("year_company", ["name", "year"])
export class Company {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "integer" })
  caseCount!: number;

  @Column({ type: "float" })
  avgSalary!: number;

  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "integer" })
  year!: number;
}
