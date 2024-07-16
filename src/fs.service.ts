import fs from "node:fs/promises";
import path from "node:path";

import { IUser } from "./interfaces/user.interface";

const pathToDB = path.join(process.cwd(), "db.json");

class FsService {
  public async read(): Promise<IUser[]> {
    const json = await fs.readFile(pathToDB, "utf-8");
    return json ? JSON.parse(json) : [];
  }

  public async write(users: IUser[]): Promise<void> {
    await fs.writeFile(pathToDB, JSON.stringify(users));
  }
}

export const fsService = new FsService();
