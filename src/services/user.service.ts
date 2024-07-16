import { ApiError } from "../errors/api-error";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getList(): Promise<IUser[]> {
    return await userRepository.getList();
  }

  public async create(dto: IUser): Promise<IUser> {
    const { name, email, password } = dto;

    if (!name || name.length < 3) {
      throw new ApiError(
        "Name is required and should be at least 3 characters",
        400,
      );
    }
    if (!email || !email.includes("@")) {
      throw new ApiError("Email is required and should be valid", 400);
    }
    if (!password || password.length < 6) {
      throw new ApiError(
        "Password is required and should be at least 6 characters",
        400,
      );
    }
    return await userRepository.create(dto);
  }
}

export const userService = new UserService();
