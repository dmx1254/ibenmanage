import { getIbenUserOnlineCount, getIbyOrdersCount } from "../api/doctor";
import { parseStringify } from "../utils";

export async function getibytradeOrdersCount() {
  try {
    const ibyOrderCount = await getIbyOrdersCount();
    return parseStringify(ibyOrderCount);
  } catch (error) {
    console.error(error);
  }
}

export async function userOnline() {
  try {
    const uOnlineCount = await getIbenUserOnlineCount();
    return parseStringify(uOnlineCount);
  } catch (error) {
    console.error(error);
  }
}
