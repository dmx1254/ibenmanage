"use server";

import { parseStringify } from "../utils";
import { revalidatePath } from "next/cache";
import {
  AchatGoUpdateStatus,
  createRate,
  exchangeUpdateStatus,
  fiveRecentIbyOrders,
  getAllIbenOrdersCounts,
  getRate,
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

export const getEchangeRate = async () => {
  try {
    const response = await getRate();
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
