import express, { Request, Response } from "express";

import { fsService } from "./fs.service";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await fsService.read();
    res.json(users);
  } catch (e) {
    res.status(500).json(e.message);
  }
});

app.post("/users", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || name.length < 3) {
      return res
        .status(400)
        .json("Name is required and should be at least 3 characters");
    }
    if (!email || !email.includes("@")) {
      return res.status(400).json("Email is required and should be valid");
    }
    if (!password || password.length < 6) {
      return res
        .status(400)
        .json("Password is required and should be at least 6 characters");
    }

    const users = await fsService.read();
    const index = users.findIndex((user) => user.email === email);
    if (index !== -1) {
      return res.status(409).json("User with this email already exists");
    }
    const newUser = {
      id: users[users.length - 1].id + 1,
      name,
      email,
      password,
    };
    users.push(newUser);
    await fsService.write(users);

    res.status(201).json(newUser);
  } catch (e) {
    res.status(500).json(e.message);
  }
});

app.get("/users/:userId", async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);

    const users = await fsService.read();
    const user = users.find((user) => user.id === userId);
    if (!user) {
      return res.status(404).json("User not found");
    }
    res.json(user);
  } catch (e) {
    res.status(500).json(e.message);
  }
});

app.put("/users/:userId", async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const { name, email, password } = req.body;

    const users = await fsService.read();
    const user = users.find((user) => user.id === userId);
    if (!user) {
      return res.status(404).json("User not found");
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;

    await fsService.write(users);

    res.status(201).json(user);
  } catch (e) {
    res.status(500).json(e.message);
  }
});

app.delete("/users/:userId", async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);

    const users = await fsService.read();
    const index = users.findIndex((user) => user.id === userId);
    if (index === -1) {
      return res.status(404).json("User not found");
    }
    users.splice(index, 1);
    await fsService.write(users);

    res.sendStatus(204);
  } catch (e) {
    res.status(500).json(e.message);
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

//
