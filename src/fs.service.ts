import fs from "node:fs/promises";
import path from "node:path";

const pathToDB = path.join(process.cwd(), "db.json");

class FsService {
  public async read() {
    const json = await fs.readFile(pathToDB, "utf-8");
    return json ? JSON.parse(json) : [];
  }

  public async write(users) {
    await fs.writeFile(pathToDB, JSON.stringify(users));
  }
}

export const fsService = new FsService();
