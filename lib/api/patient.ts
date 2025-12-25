import { isValidObjectId } from "mongoose";
import {
  ServerSell,
  UpdateSAchat,
  UpdateSAchatCreate,
  UpdateSVente,
  UpdateSVenteCreate,
} from "../utils";

import { parse, startOfDay, endOfDay, addDays, subDays } from "date-fns";

function parseDate(dateString: string): Date {
  return parse(dateString, "dd-MM-yyyy", new Date());
}

import { ibenModels } from "../models/ibendouma-models";
import { goapiModels } from "../models/ibytrade-models";

export async function getCustomers(
  email: string,
  startDate: string,
  endDate: string,
  currentPage: number,
  userStatus: string
) {
  const { UserIbenModel } = await ibenModels;

  let itemsPerPage: number = 8;
  const offset = (currentPage - 1) * itemsPerPage;

  const matchConditions: any = {};

  if (email && email.trim() !== "") {
    matchConditions.email = { $regex: email, $options: "i" };
  }

  if (userStatus === "online" && userStatus.trim() !== "") {
    matchConditions.online = true;
  }
  if (userStatus === "banni" && userStatus.trim() !== "") {
    matchConditions.isBan = true;
  }

  if (startDate || endDate) {
    matchConditions.createdAt = {};

    if (typeof startDate === "string" && startDate.trim()) {
      const parsedStartDate = parseDate(startDate);
      matchConditions.createdAt.$gte = startOfDay(parsedStartDate);
    }

    if (typeof endDate === "string" && endDate.trim()) {
      const parsedEndDate = parseDate(endDate);
      matchConditions.createdAt.$lte = endOfDay(parsedEndDate);
    }
  }

  try {
    const totalDocuments = await UserIbenModel.countDocuments(matchConditions);

    const usersFinding = UserIbenModel.aggregate([
      {
        $match: matchConditions,
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $skip: offset,
      },
      {
        $limit: itemsPerPage,
      },
      {
        $project: {
          password: 0, // Exclut le champ 'password'
          isAdmin: 0, // Exclut le champ 'identificationDocument'
        },
      },
    ]);

    const allUsersCount = UserIbenModel.countDocuments({
      ...matchConditions,
      isAdmin: false,
    });

    const allUsersBan = UserIbenModel.countDocuments({
      ...matchConditions,
      isBan: true,
      isAdmin: false,
    });
    const allUsersActif = UserIbenModel.countDocuments({
      ...matchConditions,
      isBan: false,
      online: true,
    });

    const [allUsers, usersCountAll, usersBanAll, usersActifAll] =
      await Promise.all([
        usersFinding,
        allUsersCount,
        allUsersBan,
        allUsersActif,
      ]);
    const users = JSON.parse(JSON.stringify(allUsers));
    const usersCount = JSON.parse(JSON.stringify(usersCountAll));
    const usersBan = JSON.parse(JSON.stringify(usersBanAll));
    const usersActif = JSON.parse(JSON.stringify(usersActifAll));
    const totalPagesGet = JSON.parse(JSON.stringify(totalDocuments));

    const totalPages = Math.ceil(totalPagesGet / itemsPerPage);

    return { users, usersCount, usersBan, usersActif, totalPages };
  } catch (error: any) {
    console.error(`Error fetching users: ${error}`);
  }
}

export async function getCustomersEmail(email: string) {
  const { UserIbenModel } = await ibenModels;

  const matchConditions: any = {};

  if (email && email.trim() !== "") {
    matchConditions.email = { $regex: email, $options: "i" };
  }

  try {
    const users = await UserIbenModel.aggregate([
      {
        $match: matchConditions,
      },

      {
        $project: {
          email: 1,
          lastname: 1,
          firstname: 1,
        },
      },
    ]);

    return users;
  } catch (error: any) {
    console.error(`Error fetching users: ${error}`);
  }
}

export async function createUdstDevise(val: number) {
  const { UsdtModel } = await goapiModels;

  try {
    await UsdtModel.create(val);
    return { message: "Nouvelle devise créée avec succès" };
  } catch (error: any) {
    console.error(`Error creating currency: ${error}`);
  }
}

export async function UpdateCurDevise(
  curId: string,
  keyType: string,
  val: number
) {
  const { UsdtModel, EuroModel, DollarModel, AedModel, MadModel } = await goapiModels;

  let ModelChoose;
  ModelChoose =
    keyType === "euro"
      ? EuroModel
      : keyType === "dollar"
      ? DollarModel
      : keyType === "aed"
      ? AedModel
      : keyType === "mad"
      ? MadModel
      : UsdtModel;

  try {
    await ModelChoose.findByIdAndUpdate(
      curId,
      {
        $set: { [keyType]: val },
      },
      {
        new: true,
      }
    );
    return { message: "Devise mis à jour avec succès" };
  } catch (error: any) {
    console.error(`Error updating currency: ${error}`);
  }
}

export async function UpdateVenteCurDevise(
  curId: string,
  keyType: string,
  val: number
) {
  const { EuroModelIben, DollarModelIben, CadModelIben } = await ibenModels;

  let ModelChoose;
  ModelChoose =
    keyType === "euro"
      ? EuroModelIben
      : keyType === "dollar"
      ? DollarModelIben
      : CadModelIben;

  try {
    await ModelChoose.findByIdAndUpdate(
      curId,
      {
        $set: { [keyType]: val },
      },
      {
        new: true,
      }
    );
    return { message: "Devise mis à jour avec succès" };
  } catch (error: any) {
    console.error(`Error updating currency: ${error}`);
  }
}

export async function deleteOneUser(userId: string) {
  if (!isValidObjectId(userId)) {
    throw new Error("Invalid User ID");
  }
  try {
    const { UserIbenModel } = await ibenModels;
    const userDeleted = await UserIbenModel.findByIdAndDelete(userId);
    return userDeleted;
  } catch (error: any) {
    throw new Error(`Error to deleting user: ${error.message}`);
  }
}

export async function deleteOneServeurAchat(serverId: string) {
  if (!isValidObjectId(serverId)) {
    throw new Error("Invalid Server ID");
  }
  try {
    const { ServerModel } = await goapiModels;
    const serverDeleted = await ServerModel.findByIdAndDelete(serverId);
    return serverDeleted;
  } catch (error: any) {
    throw new Error(`Error to deleting server: ${error.message}`);
  }
}

export async function deleteOneServeurVente(serverId: string) {
  if (!isValidObjectId(serverId)) {
    throw new Error("Invalid Server ID");
  }
  try {
    const { ServerModelIben } = await ibenModels;
    const serverDeleted = await ServerModelIben.findByIdAndDelete(serverId);
    return serverDeleted;
  } catch (error: any) {
    throw new Error(`Error to deleting server: ${error.message}`);
  }
}

export async function updateServerAchat(
  serverId: string,
  server: UpdateSAchat
) {
  if (!isValidObjectId(serverId)) {
    throw new Error("Invalid Server ID");
  }
  try {
    const { ServerModel } = await goapiModels;
    const updatingS = await ServerModel.findByIdAndUpdate(
      serverId,
      {
        $set: server,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    return updatingS;
  } catch (error: any) {
    throw new Error(`Error to update server: ${error.message}`);
  }
}

export async function updateServerVente(
  serverId: string,
  server: UpdateSVente
) {
  if (!isValidObjectId(serverId)) {
    throw new Error("Invalid Server ID");
  }
  try {
    const { ServerModelIben } = await ibenModels;
    const updatingS = await ServerModelIben.findByIdAndUpdate(
      serverId,
      {
        $set: server,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    return updatingS;
  } catch (error: any) {
    throw new Error(`Error to update server: ${error.message}`);
  }
}

export async function serverAchatCreate(server: UpdateSAchatCreate) {
  try {
    const { ServerModel } = await goapiModels;
    await ServerModel.create(server);
    return { message: "Serveur créé avec succès" };
  } catch (error: any) {
    throw new Error(`Error to create server: ${error.message}`);
  }
}

export async function serverVenteCreate(server: UpdateSVenteCreate) {
  try {
    const { ServerModelIben } = await ibenModels;
    await ServerModelIben.create(server);
    return { message: "Serveur créé avec succès" };
  } catch (error: any) {
    throw new Error(`Error to create server: ${error.message}`);
  }
}

export async function BanOneUser(userId: string) {
  if (!isValidObjectId(userId)) {
    throw new Error("Invalid user ID");
  }
  try {
    const { UserIbenModel } = await ibenModels;
    const userBan = await UserIbenModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          isBan: true,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    return userBan;
  } catch (error: any) {
    throw new Error(`Error to ban user: ${error.message}`);
  }
}

export async function deBanOneUser(userId: string) {
  if (!isValidObjectId(userId)) {
    throw new Error("Invalid user ID");
  }
  try {
    const { UserIbenModel } = await ibenModels;
    const userDeban = await UserIbenModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          isBan: false,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    return userDeban;
  } catch (error: any) {
    throw new Error(`Error to deban user: ${error.message}`);
  }
}

export async function deleteOneOrderEchange(echangeId: string) {
  if (!isValidObjectId(echangeId)) {
    throw new Error("Invalid echange ID");
  }
  try {
    const { ExchangeModel } = await goapiModels;
    const orderDeleted = await ExchangeModel.findByIdAndDelete(echangeId);
    return orderDeleted;
  } catch (error: any) {
    throw new Error(`Error to deleting echange: ${error.message}`);
  }
}

export async function deleteOneOrderGame(gameId: string) {
  if (!isValidObjectId(gameId)) {
    throw new Error("Invalid game ID");
  }
  try {
    const { GameModel } = await goapiModels;
    const orderDeleted = await GameModel.findByIdAndDelete(gameId);
    return orderDeleted;
  } catch (error: any) {
    throw new Error(`Error to deleting game: ${error.message}`);
  }
}

export async function deleteOneOrderBuy(orderId: string) {
  if (!isValidObjectId(orderId)) {
    throw new Error("Invalid echange ID");
  }
  try {
    const { BuyModel } = await goapiModels;
    const orderDeleted = await BuyModel.findByIdAndDelete(orderId);
    return orderDeleted;
  } catch (error: any) {
    throw new Error(`Error to deleting order: ${error.message}`);
  }
}
export async function deleteOneOrderVente(orderId: string) {
  if (!isValidObjectId(orderId)) {
    throw new Error("Invalid echange ID");
  }
  try {
    const { OrderModelIben } = await ibenModels;
    const orderDeleted = await OrderModelIben.findByIdAndDelete(orderId);
    return orderDeleted;
  } catch (error: any) {
    throw new Error(`Error to deleting order: ${error.message}`);
  }
}

export async function getAllUsersCounts() {
  const { UserIbenModel } = await ibenModels;
  try {
    const totalUsers = await UserIbenModel.countDocuments({
      isAdmin: false,
    });
    return totalUsers;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

//GET SERVERS AND CURRENCIES

export async function getServersAndCurrencies() {
  const { ServerModel, EuroModel, DollarModel, AedModel } = await goapiModels;

  try {
    const serversFinds = ServerModel.find();
    const eurFinds = EuroModel.find();
    const usdFinds = DollarModel.find();
    const aedFinds = AedModel.find();

    const [serversF, eurF, usdF, aedF] = await Promise.all([
      serversFinds,
      eurFinds,
      usdFinds,
      aedFinds,
    ]);
    const servers: ServerSell[] = JSON.parse(JSON.stringify(serversF));
    const eur = JSON.parse(JSON.stringify(eurF));
    const usd = JSON.parse(JSON.stringify(usdF));
    const aed = JSON.parse(JSON.stringify(aedF));

    const currencyRates: CurrencyR = {
      eur: eur[0].euro,
      usd: usd[0].dollar,
      aed: aed[0].aed,
    };
    return { servers, currencyRates };
  } catch (error: any) {
    console.error(`Error fetching users: ${error}`);
  }
}

export async function getVenteCurrencies() {
  const { EuroModelIben, DollarModelIben, CadModelIben, MadModelIben } =
    await ibenModels;

  try {
    const eurFinds = EuroModelIben.find();
    const usdFinds = DollarModelIben.find();
    const cadFinds = CadModelIben.find();
    const madFinds = MadModelIben.find();

    const [eurF, usdF, aedF, usdtF] = await Promise.all([
      eurFinds,
      usdFinds,
      cadFinds,
      madFinds,
    ]);
    const eur = JSON.parse(JSON.stringify(eurF));
    const usd = JSON.parse(JSON.stringify(usdF));
    const cad = JSON.parse(JSON.stringify(aedF));
    const mad = JSON.parse(JSON.stringify(usdtF));

    return { eur, usd, cad, mad };
  } catch (error: any) {
    console.error(`Error fetching users: ${error}`);
  }
}

export async function getCurrencies() {
  const { EuroModel, DollarModel, AedModel, UsdtModel, MadModel } = await goapiModels;

  try {
    const eurFinds = EuroModel.find();
    const usdFinds = DollarModel.find();
    const aedFinds = AedModel.find();
    const usdtFinds = UsdtModel.find();
    const madFinds = MadModel.find();
    const [eurF, usdF, aedF, usdtF, madF] = await Promise.all([
      eurFinds,
      usdFinds,
      aedFinds,
      usdtFinds,
      madFinds,
    ]);
    const eur = JSON.parse(JSON.stringify(eurF));
    const usd = JSON.parse(JSON.stringify(usdF));
    const aed = JSON.parse(JSON.stringify(aedF));
    const usdt = JSON.parse(JSON.stringify(usdtF));
    const mad = JSON.parse(JSON.stringify(madF));
    return { eur, usd, aed, usdt, mad };
  } catch (error: any) {
    console.error(`Error fetching users: ${error}`);
  }
}

type CurrencyR = {
  eur: number;
  usd: number;
  aed: number;
  mad: number;
};
