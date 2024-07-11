const fs = require('node:fs/promises');
const path = require('node:path');

const pathToDB = path.join(process.cwd(), 'db.json');

module.exports = {
    read: async () => {
        const json = await fs.readFile(pathToDB, 'utf-8');
        return json ? JSON.parse(json) : [];
    },

    write: async (users) => {
        await fs.writeFile(pathToDB, JSON.stringify(users));
    },
}
