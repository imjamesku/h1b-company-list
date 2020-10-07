import "reflect-metadata";
import { getConnectionManager, Connection, ConnectionOptions } from "typeorm";
import { Company } from "../typeorm/entities/Company";
import path from "path";
// console.log("1111111111111111111");
// console.log(process.cwd());
// console.log("2222222222222222");
// console.log(path.resolve(process.cwd(), "database.sqlite"));

// cwd is next
const options: ConnectionOptions = {
  name: "default",
  type: "sqlite",
  // note that cwd is not the location of this file
  // database: "../csv-parser/database.sqlite",
  database: path.resolve(process.cwd(), "database.sqlite"),
  entities: [Company],
  logging: true,
};

function entitiesChanged(prevEntities: any[], newEntities: any[]): boolean {
  if (prevEntities.length !== newEntities.length) return true;

  for (let i = 0; i < prevEntities.length; i++) {
    if (prevEntities[i] !== newEntities[i]) return true;
  }

  return false;
}

async function updateConnectionEntities(
  connection: Connection,
  entities: any[]
) {
  if (!entitiesChanged(connection.options.entities as Array<any>, entities))
    return;

  // @ts-ignore
  connection.options.entities = entities;

  // @ts-ignore
  connection.buildMetadatas();

  if (connection.options.synchronize) {
    await connection.synchronize();
  }
}
export async function ensureConnection(
  name: string = "default"
): Promise<Connection> {
  const connectionManager = getConnectionManager();
  if (connectionManager.has(name)) {
    const connection = connectionManager.get(name);

    if (!connection.isConnected) {
      await connection.connect();
    }
    if (process.env.NODE_ENV !== "production") {
      await updateConnectionEntities(
        connection,
        options.entities as Array<any>
      );
    }
    return connection;
  }
  return await connectionManager.create(options).connect();
}
