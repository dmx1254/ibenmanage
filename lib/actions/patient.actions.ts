"use server";

import {
  UpdateSAchat,
  UpdateSAchatCreate,
  UpdateSVente,
  UpdateSVenteCreate,
  parseStringify,
} from "../utils";
import {
  BanOneUser,
  UpdateCurDevise,
  UpdateVenteCurDevise,
  createUdstDevise,
  deBanOneUser,
  deleteOneOrderBuy,
  deleteOneOrderEchange,
  deleteOneOrderVente,
  deleteOneServeurAchat,
  deleteOneServeurVente,
  deleteOneUser,
  getAllUsersCounts,
  getCustomersEmail,
  serverAchatCreate,
  serverVenteCreate,
  updateServerAchat,
  updateServerVente,
} from "../api/patient";
import {
  getDesktopVisits,
  getIbyOrdersGraph,
  getPatientsDevices,
} from "../api/doctor";
import { revalidatePath } from "next/cache";

export const deleteUser = async (userId: string) => {
  try {
    const userDeleted = await deleteOneUser(userId);
    revalidatePath("/dashboard/clients");
    return parseStringify(userDeleted);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteServeurAchat = async (serverId: string) => {
  try {
    const serverDeleted = await deleteOneServeurAchat(serverId);
    revalidatePath("/dashboard/serveurs/achats");
    return parseStringify(serverDeleted);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteServeurVente = async (serverId: string) => {
  try {
    const serverDeleted = await deleteOneServeurVente(serverId);
    revalidatePath("/dashboard/serveurs/ventes");
    return parseStringify(serverDeleted);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const banUser = async (userId: string) => {
  try {
    const userBan = await BanOneUser(userId);
    revalidatePath("/dashboard/clients");
    return parseStringify(userBan);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deBanUser = async (userId: string) => {
  try {
    const userDeban = await deBanOneUser(userId);
    revalidatePath("/dashboard/clients");
    return parseStringify(userDeban);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteOrderBuy = async (orderId: string) => {
  try {
    const orderDeleted = await deleteOneOrderBuy(orderId);
    revalidatePath("/dashboard/commandes/achats");
    return parseStringify(orderDeleted);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteOrderVente = async (orderId: string) => {
  try {
    const orderDeleted = await deleteOneOrderVente(orderId);
    revalidatePath("/dashboard/commandes/ventes");
    return parseStringify(orderDeleted);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteOrderEchange = async (echangeId: string) => {
  try {
    const orderDeleted = await deleteOneOrderEchange(echangeId);
    revalidatePath("/dashboard/commandes/echanges");
    return parseStringify(orderDeleted);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const serverAchatUp = async (serverId: string, server: UpdateSAchat) => {
  try {
    const serverUp = await updateServerAchat(serverId, server);
    revalidatePath("/dashboard/serveurs/achats");
    return parseStringify(serverUp);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const serverVenteUp = async (serverId: string, server: UpdateSVente) => {
  try {
    const serverUp = await updateServerVente(serverId, server);
    revalidatePath("/dashboard/serveurs/ventes");
    return parseStringify(serverUp);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const createAchatServer = async (server: UpdateSAchatCreate) => {
  try {
    const serverCreated = await serverAchatCreate(server);
    revalidatePath("/dashboard/serveurs/achats");
    return parseStringify(serverCreated);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const createVenteServer = async (server: UpdateSVenteCreate) => {
  try {
    const serverCreated = await serverVenteCreate(server);
    revalidatePath("/dashboard/serveurs/ventes");
    return parseStringify(serverCreated);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getUsersCounts = async () => {
  try {
    const allUsers = await getAllUsersCounts();
    return parseStringify(allUsers);
  } catch (error) {
    console.error(error);
  }
};

export const getPatientDevicesTypes = async () => {
  try {
    const results = await getPatientsDevices();
    return parseStringify(results);
  } catch (error) {
    console.error(error);
  }
};

export const ibyOrdersGraph = async () => {
  try {
    const results = await getIbyOrdersGraph();
    return parseStringify(results);
  } catch (error) {
    console.error(error);
  }
};

export const getPatientVisit = async () => {
  try {
    const results = await getDesktopVisits();
    return parseStringify(results);
  } catch (error) {
    console.error(error);
  }
};

export const getUsersEmail = async (email: string) => {
  try {
    const results = await getCustomersEmail(email);
    return parseStringify(results);
  } catch (error) {
    console.error(error);
  }
};

export const createNewCur = async (val: number) => {
  try {
    const results = await createUdstDevise(val);
    return parseStringify(results);
  } catch (error) {
    console.error(error);
  }
};

export const updateNewCur = async (
  curId: string,
  keyType: string,
  val: number
) => {
  try {
    const results = await UpdateCurDevise(curId, keyType, val);
    revalidatePath("/dashboard/serveurs/achats");
    return parseStringify(results);
  } catch (error) {
    console.error(error);
  }
};

export const updateNewVenteCur = async (
  curId: string,
  keyType: string,
  val: number
) => {
  try {
    const results = await UpdateVenteCurDevise(curId, keyType, val);
    revalidatePath("/dashboard/serveurs/ventes");
    return parseStringify(results);
  } catch (error) {
    console.error(error);
  }
};
