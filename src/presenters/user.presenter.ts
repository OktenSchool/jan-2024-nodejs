import { configs } from "../configs/configs";
import {
  IUser,
  IUserListQuery,
  IUserResponse,
  IUserResponseList,
} from "../interfaces/user.interface";

export class UserPresenter {
  public static toResponse(data: IUser): IUserResponse {
    return {
      _id: data._id,
      name: data.name,
      age: data.age,
      email: data.email,
      phone: data.phone,
      avatar: data.avatar
        ? `${configs.AWS_ENDPOINT_URL}/${configs.AWS_BUCKET_NAME}/${data.avatar}`
        : null,
      role: data.role,
      isVerified: data.isVerified,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  public static toResponseList(
    data: IUser[],
    total: number,
    query: IUserListQuery,
  ): IUserResponseList {
    return {
      data: data.map((item) => this.toResponse(item)),
      total,
      ...query,
      // nextPage:  configs.API_URL + `/users?${query.page + 1}&limit=${query.limit}`,
      // prevPage:  configs.API_URL + `/users?${query.page - 1}&limit=${query.limit}`,
    };
  }
}
