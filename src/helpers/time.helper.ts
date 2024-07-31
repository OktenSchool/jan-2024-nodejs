import dayjs, { ManipulateType } from "dayjs";

class TimeHelper {
  public subtractByParams(value: number, unit: ManipulateType): Date {
    return dayjs().subtract(value, unit).toDate();
  }

  public parseString(string: string): [number, ManipulateType] {
    const [value, unit] = string.split(" ");
    return [parseInt(value), unit as ManipulateType];
  }
}

export const timeHelper = new TimeHelper();
