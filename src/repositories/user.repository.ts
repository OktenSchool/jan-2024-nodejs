import { FilterQuery } from "mongoose";

import { IUser, IUserListQuery } from "../interfaces/user.interface";
import { Token } from "../models/token.model";
import { User } from "../models/user.model";

class UserRepository {
  public async getByParams(params: Partial<IUser>): Promise<IUser> {
    return await User.findOne(params);
  }

  public async getList(query: IUserListQuery): Promise<[IUser[], number]> {
    const filterObj: FilterQuery<IUser> = { isVerified: true };
    if (query.search) {
      filterObj.$or = [
        { name: { $regex: query.search, $options: "i" } },
        { email: { $regex: query.search, $options: "i" } },
      ];
      // filterObj.name = { $regex: query.search, $options: "i" };
    }
    // TODO add order by

    const skip = (query.page - 1) * query.limit;
    return await Promise.all([
      User.find(filterObj).limit(query.limit).skip(skip),
      User.countDocuments(filterObj),
    ]);
  }

  public async create(dto: IUser): Promise<IUser> {
    return await User.create(dto);
  }

  public async getById(userId: string): Promise<IUser> {
    return await User.findById(userId);
  }

  public async updateById(userId: string, dto: Partial<IUser>): Promise<IUser> {
    return await User.findByIdAndUpdate(userId, dto, {
      returnDocument: "after",
    });
  }

  public async findWithOutActivityAfter(date: Date): Promise<IUser[]> {
    return await User.aggregate([
      {
        $lookup: {
          from: Token.collection.name,
          let: { userId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$_userId", "$$userId"] } } },
            { $match: { createdAt: { $gt: date } } },
          ],
          as: "tokens",
        },
      },
      {
        $match: { tokens: { $size: 0 } },
      },
      // {
      //   $project: {
      //     _id: 1,
      //     email: 1,
      //     name: 1,
      //   },
      // },
    ]);
  }

  public async deleteById(userId: string): Promise<void> {
    await User.deleteOne({ _id: userId });
  }
}

export const userRepository = new UserRepository();
