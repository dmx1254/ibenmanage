"use server";

import { parseStringify } from "../utils";
import { revalidatePath } from "next/cache";
import {
  AchatGoUpdateStatus,
  createAnOrderAchat,
  createMaintingStatus,
  createRate,
  deleteAllBuyOrders,
  exchangeUpdateStatus,
  fiveRecentIbyOrders,
  gameUpdateStatus,
  getAllIbenOrdersCounts,
  getMaintingOneStatus,
  getPendingOrders,
  getRate,
  getServersBuyForCreate,
  sendAllUsersEmail,
  updateMainting,
  updateRate,
  venteIbenUpdateStatus,
} from "../api/appointment";

export const getFiveRecentOrders = async () => {
  try {
    const fiveRecentsIbyOrder = await fiveRecentIbyOrders();
    return parseStringify(fiveRecentsIbyOrder);
  } catch (error: any) {
    console.log(error);
    console.error(error);
  }
};

export const ibenOrdersCounts = async () => {
  try {
    const ibenCounts = await getAllIbenOrdersCounts();
    return parseStringify(ibenCounts);
  } catch (error) {
    console.error(error);
  }
};

export const createEchangeRate = async (rate: number) => {
  try {
    const response = await createRate(rate);
    return parseStringify(response);
  } catch (error) {
    console.error(error);
  }
};

export const updateEchangeRate = async (rate: number, rateId: string) => {
  try {
    const response = await updateRate(rate, rateId);
    revalidatePath("/dashboard/commandes/echanges");
    return parseStringify(response);
  } catch (error) {
    console.error(error);
  }
};

export const getAllServersAchat = async () => {
  try {
    const servers = await getServersBuyForCreate();
    return parseStringify(servers);
  } catch (error) {
    console.log(error);
  }
};

export const createOrdAchat = async (data: any) => {
  try {
    const response = await createAnOrderAchat(data);
    return parseStringify(response);
  } catch (error) {
    console.log(error);
  }
};

export const getEchangeRate = async () => {
  try {
    const response = await getRate();
    return parseStringify(response);
  } catch (error) {
    console.error(error);
  }
};

export const getMaintingStatus = async () => {
  try {
    const response = await getMaintingOneStatus();
    return parseStringify(response);
  } catch (error) {
    console.error(error);
  }
};

export const createANewMainting = async () => {
  try {
    const response = await createMaintingStatus();
    return parseStringify(response);
  } catch (error) {
    console.error(error);
  }
};

export const updateMaintingStatus = async (
  mainting: boolean,
  maintingId: string
) => {
  try {
    const response = await updateMainting(mainting, maintingId);
    revalidatePath("/dashboard/commandes/games");
    return parseStringify(response);
  } catch (error) {
    console.error(error);
  }
};

export const changeEchangeStatus = async (
  status: string,
  echangeId: string
) => {
  try {
    const response = await exchangeUpdateStatus(status, echangeId);
    revalidatePath("/dashboard/commandes/echanges");
    return parseStringify(response);
  } catch (error) {
    console.error(error);
  }
};

export const changeGameStatus = async (status: string, gameId: string) => {
  try {
    const response = await gameUpdateStatus(status, gameId);
    revalidatePath("/dashboard/commandes/echanges");
    return parseStringify(response);
  } catch (error) {
    console.error(error);
  }
};

export const deleteOrdersAllBuy = async () => {
  try {
    const response = await deleteAllBuyOrders();
    return parseStringify(response);
  } catch (error) {
    console.log(error);
  }
};

export const changeVenteStatus = async (status: string, venteId: string) => {
  try {
    const response = await venteIbenUpdateStatus(status, venteId);
    revalidatePath("/dashboard/commandes/ventes");
    return parseStringify(response);
  } catch (error) {
    console.error(error);
  }
};

export const changeAchatStatus = async (status: string, achatId: string) => {
  try {
    const response = await AchatGoUpdateStatus(status, achatId);
    revalidatePath("/dashboard/commandes/achats");
    return parseStringify(response);
  } catch (error) {
    console.error(error);
  }
};

export async function sendEmailForAllUsers(subject: string, message: string) {
  try {
    const response = await sendAllUsersEmail(subject, message);
    return parseStringify(response);
  } catch (error) {
    console.log(error);
  }
}

export async function getPendingLengthOrders() {
  try {
    const response = await getPendingOrders();
    return parseStringify(response);
  } catch (error) {
    console.log(error);
  }
}
