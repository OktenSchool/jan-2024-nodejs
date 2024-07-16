import { ApiError } from "../errors/api-error";
import { fsService } from "../fs.service";
import { IUser } from "../interfaces/user.interface";

class UserRepository {
  public async getList(): Promise<IUser[]> {
    return await fsService.read();
  }

  public async create(dto: IUser): Promise<IUser> {
    const users = await fsService.read();
    const index = users.findIndex((user) => user.email === dto.email);
    if (index !== -1) {
      throw new ApiError("User with this email already exists", 409);
    }
    const newUser = {
      id: users[users.length - 1].id + 1,
      name: dto.name,
      email: dto.email,
      password: dto.password,
    };
    users.push(newUser);
    await fsService.write(users);
    return newUser;
  }
}

export const userRepository = new UserRepository();
