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

  public async getById(userId: number): Promise<IUser> {
    const users = await fsService.read();
    const user = users.find((user) => user.id === userId);
    if (!user) {
      throw new ApiError("User not found", 422);
    }
    return user;
  }

  public async updateById(userId: number, dto: IUser): Promise<IUser> {
    const users = await fsService.read();
    const user = users.find((user) => user.id === userId);
    if (!user) {
      throw new ApiError("User not found", 422);
    }

    if (dto.name) user.name = dto.name;
    if (dto.email) user.email = dto.email;
    if (dto.password) user.password = dto.password;

    await fsService.write(users);
    return user;
  }

  public async deleteById(userId: number): Promise<void> {
    const users = await fsService.read();
    const index = users.findIndex((user) => user.id === userId);
    if (index === -1) {
      throw new ApiError("User not found", 422);
    }
    users.splice(index, 1);
    await fsService.write(users);
  }
}

export const userRepository = new UserRepository();
