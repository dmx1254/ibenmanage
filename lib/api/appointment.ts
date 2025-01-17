import { parse, startOfDay, endOfDay, addDays, subDays } from "date-fns";

import { ibenModels } from "../models/ibendouma-models";
import { goapiModels } from "../models/ibytrade-models";
import { Resend } from "resend";
import { OrderDeliveryTemplate } from "@/components/orderConfirmed-template";
import { OrderPaymentTemplate } from "@/components/order-iby-confirmed";

const resend = new Resend(process.env.RESEND_2IBN_API_KEY);

function parseDate(dateString: string): Date {
  return parse(dateString, "dd-MM-yyyy", new Date());
}

export async function getAllOrdersAchatList(
  orderId: string,
  startDate: string,
  endDate: string,
  status: string,

  currentPage: number
) {
  const { BuyModel } = await goapiModels;
  let itemsPerPage: number = 15;
  const offset = (currentPage - 1) * itemsPerPage;

  const matchConditions: any = {};

  if (orderId && orderId.trim() !== "") {
    matchConditions.numBuy = { $regex: orderId, $options: "i" };
  }

  if (status && status.trim() !== "") {
    matchConditions.status = { $regex: status, $options: "i" };
  }

  if (startDate || endDate) {
    matchConditions.createdAt = {};

    if (startDate) {
      const parsedStartDate = parseDate(startDate);
      matchConditions.createdAt.$gte = startOfDay(parsedStartDate);
    }

    if (endDate) {
      const parsedEndDate = parseDate(endDate);
      matchConditions.createdAt.$lte = endOfDay(parsedEndDate);
    }
  }

  try {
    const totalDocuments = await BuyModel.countDocuments(matchConditions);

    const allOrdersAchatResult = BuyModel.aggregate([
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
    ]);

    const payedCountResult = BuyModel.countDocuments({
      ...matchConditions,
      status: "Payée",
    });

    const pendingCountResult = BuyModel.countDocuments({
      ...matchConditions,
      status: "En attente",
    });

    const cancelledCountResult = BuyModel.countDocuments({
      ...matchConditions,
      status: "Annulée",
    });

    const [orders, payedCountPa, pendingCountPa, cancelledCountPa] =
      await Promise.all([
        allOrdersAchatResult,
        payedCountResult,
        pendingCountResult,
        cancelledCountResult,
      ]);

    const allOrders = JSON.parse(JSON.stringify(orders));
    const payedCount = JSON.parse(JSON.stringify(payedCountPa));
    const pendingCount = JSON.parse(JSON.stringify(pendingCountPa));
    const cancelledCount = JSON.parse(JSON.stringify(cancelledCountPa));
    const totalPagesGet = JSON.parse(JSON.stringify(totalDocuments));

    const totalPages = Math.ceil(totalPagesGet / itemsPerPage);

    return {
      allOrders,
      payedCount,
      pendingCount,
      cancelledCount,
      totalPages,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getAllServersAchatList(
  servername: string,
  category: string,
  currentPage: number
) {
  const { ServerModel } = await goapiModels;
  let itemsPerPage: number = 15;
  const offset = (currentPage - 1) * itemsPerPage;

  const matchConditions: any = {};

  if (servername && servername.trim() !== "") {
    matchConditions.serverName = { $regex: servername, $options: "i" };
  }

  if (category && category.trim() !== "") {
    matchConditions.serverCategory = { $regex: category, $options: "i" };
  }

  try {
    const totalDocuments = await ServerModel.countDocuments(matchConditions);

    const allServers = await ServerModel.aggregate([
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
    ]);

    const servers = JSON.parse(JSON.stringify(allServers));

    const totalPagesGet = JSON.parse(JSON.stringify(totalDocuments));

    const totalPages = Math.ceil(totalPagesGet / itemsPerPage);

    return {
      servers,
      totalPages,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getAllServersVenteList(
  servername: string,
  category: string,
  currentPage: number
) {
  const { ServerModelIben } = await ibenModels;
  let itemsPerPage: number = 15;
  const offset = (currentPage - 1) * itemsPerPage;

  const matchConditions: any = {};

  if (servername && servername.trim() !== "") {
    matchConditions.serverName = { $regex: servername, $options: "i" };
  }

  if (category && category.trim() !== "") {
    matchConditions.serverCategory = { $regex: category, $options: "i" };
  }

  try {
    const totalDocuments = await ServerModelIben.countDocuments(
      matchConditions
    );

    const allServers = await ServerModelIben.aggregate([
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
    ]);

    const servers = JSON.parse(JSON.stringify(allServers));

    const totalPagesGet = JSON.parse(JSON.stringify(totalDocuments));

    const totalPages = Math.ceil(totalPagesGet / itemsPerPage);

    return {
      servers,
      totalPages,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getAllOrdersVenteList(
  orderId: string,
  startDate: string,
  endDate: string,
  status: string,
  currentPage: number
) {
  const { OrderModelIben } = await ibenModels;
  let itemsPerPage: number = 15;
  const offset = (currentPage - 1) * itemsPerPage;

  const matchConditions: any = {};

  if (orderId && orderId.trim() !== "") {
    matchConditions.orderNum = { $regex: orderId, $options: "i" };
  }

  if (status && status.trim() !== "") {
    matchConditions.status = { $regex: status, $options: "i" };
  }

  if (startDate || endDate) {
    matchConditions.createdAt = {};

    if (startDate) {
      const parsedStartDate = parseDate(startDate);
      matchConditions.createdAt.$gte = startOfDay(parsedStartDate);
    }

    if (endDate) {
      const parsedEndDate = parseDate(endDate);
      matchConditions.createdAt.$lte = endOfDay(parsedEndDate);
    }
  }

  try {
    const totalDocuments = await OrderModelIben.countDocuments(matchConditions);

    const allOrdersVenteResult = OrderModelIben.aggregate([
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
    ]);

    const payedCountResult = OrderModelIben.countDocuments({
      ...matchConditions,
      status: "Terminée",
    });

    const pendingCountResult = OrderModelIben.countDocuments({
      ...matchConditions,
      status: "En attente",
    });

    const cancelledCountResult = OrderModelIben.countDocuments({
      ...matchConditions,
      status: "Annulée",
    });

    const [orders, payedCountPa, pendingCountPa, cancelledCountPa] =
      await Promise.all([
        allOrdersVenteResult,
        payedCountResult,
        pendingCountResult,
        cancelledCountResult,
      ]);

    const allOrders = JSON.parse(JSON.stringify(orders));
    const payedCount = JSON.parse(JSON.stringify(payedCountPa));
    const pendingCount = JSON.parse(JSON.stringify(pendingCountPa));
    const cancelledCount = JSON.parse(JSON.stringify(cancelledCountPa));
    const totalPagesGet = JSON.parse(JSON.stringify(totalDocuments));

    const totalPages = Math.ceil(totalPagesGet / itemsPerPage);

    return {
      allOrders,
      payedCount,
      pendingCount,
      cancelledCount,
      totalPages,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getAllOrdersEchangeList(
  orderId: string,
  startDate: string,
  endDate: string,
  status: string,

  currentPage: number
) {
  const { ExchangeModel } = await goapiModels;
  let itemsPerPage: number = 15;
  const offset = (currentPage - 1) * itemsPerPage;

  const matchConditions: any = {};

  if (orderId && orderId.trim() !== "") {
    matchConditions.codeToExchange = { $regex: orderId, $options: "i" };
  }

  if (status && status.trim() !== "") {
    matchConditions.status = { $regex: status, $options: "i" };
  }

  if (startDate || endDate) {
    matchConditions.createdAt = {};

    if (startDate) {
      const parsedStartDate = parseDate(startDate);
      matchConditions.createdAt.$gte = startOfDay(parsedStartDate);
    }

    if (endDate) {
      const parsedEndDate = parseDate(endDate);
      matchConditions.createdAt.$lte = endOfDay(parsedEndDate);
    }
  }

  try {
    const totalDocuments = await ExchangeModel.countDocuments(matchConditions);

    const allOrdersEchangeResult = ExchangeModel.aggregate([
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
    ]);

    const payedCountResult = ExchangeModel.countDocuments({
      ...matchConditions,
      status: "Terminée",
    });

    const pendingCountResult = ExchangeModel.countDocuments({
      ...matchConditions,
      status: "En attente",
    });

    const cancelledCountResult = ExchangeModel.countDocuments({
      ...matchConditions,
      status: "Annulée",
    });

    const [echanges, payedCountPa, pendingCountPa, cancelledCountPa] =
      await Promise.all([
        allOrdersEchangeResult,
        payedCountResult,
        pendingCountResult,
        cancelledCountResult,
      ]);

    const allEchanges = JSON.parse(JSON.stringify(echanges));
    const payedCount = JSON.parse(JSON.stringify(payedCountPa));
    const pendingCount = JSON.parse(JSON.stringify(pendingCountPa));
    const cancelledCount = JSON.parse(JSON.stringify(cancelledCountPa));
    const totalPagesGet = JSON.parse(JSON.stringify(totalDocuments));

    const totalPages = Math.ceil(totalPagesGet / itemsPerPage);

    return {
      allEchanges,
      payedCount,
      pendingCount,
      cancelledCount,
      totalPages,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function createRate(rate: number) {
  try {
    const { RateModel } = await goapiModels;
    await RateModel.create({ rate: rate });
    return { message: "Taux d'échange créé avec succès" };
  } catch (error: any) {
    throw new Error(error.message);
  }
}
export async function updateRate(rate: number, rateId: string) {
  try {
    const { RateModel } = await goapiModels;
    await RateModel.findByIdAndUpdate(
      rateId,
      {
        $set: {
          rate: rate,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    return { message: "Taux d'échange mis à jour avec succès" };
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getRate() {
  try {
    const { RateModel } = await goapiModels;
    const rate = await RateModel.find();

    return rate;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function achatIbyUpdateStatus(status: string, achatId: string) {
  try {
    const { BuyModel } = await goapiModels;
    await BuyModel.findByIdAndUpdate(
      achatId,
      {
        $set: {
          status,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return { message: "Status mis à jour avec succès" };
  } catch (error: any) {
    throw new Error(error.message);
  }
}
export async function exchangeUpdateStatus(status: string, echangeId: string) {
  try {
    const { ExchangeModel } = await goapiModels;
    await ExchangeModel.findByIdAndUpdate(
      echangeId,
      {
        $set: {
          status,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return { message: "Status mis à jour avec succès" };
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function venteIbenUpdateStatus(status: string, venteId: string) {
  try {
    const { OrderModelIben } = await ibenModels;
    const response = await OrderModelIben.findByIdAndUpdate(
      venteId,
      {
        $set: {
          status,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    const res = JSON.parse(JSON.stringify(response));
    if (res.status === "Terminée") {
      const { email, lastname, firstname } = await res.billing;
      const { cur, totalPrice, orderNum, updatedAt, products } = res;
      const { data, error } = await resend.emails.send({
        from: "Ibendouma Support <support@ibendouma.com>",
        to: [email],
        text: "",
        subject: "🎉 Order Confirmed! 🚀",
        react: OrderDeliveryTemplate({
          lastname,
          firstname,
          cur: cur,
          totalPrice,
          orderNum,
          dateDelivered: updatedAt,
          products,
        }),
      });
      if (error) {
        return console.log(error);
      }
    }
    return { message: "Status mis à jour avec succès" };
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function AchatGoUpdateStatus(status: string, achatId: string) {
  try {
    const { BuyModel } = await goapiModels;
    const { UserIbenModel } = await ibenModels;
    const response = await BuyModel.findByIdAndUpdate(
      achatId,
      {
        $set: {
          status,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    const res = JSON.parse(JSON.stringify(response));
    const userEmail = await UserIbenModel.findById(res.userId);

    if (!userEmail) return;

    const userParsed = JSON.parse(JSON.stringify(userEmail));
    if (res.status === "Payée") {
      const {
        lastname,
        firstname,
        currencymethod,
        totalPrice,
        numBuy,
        updatedAt,
        qte,
        server,
        gameName,
        pu,
      } = res;
      const { data, error } = await resend.emails.send({
        from: "Ibendouma Support <support@ibendouma.com>",
        to: [userParsed.email],
        text: "",
        subject: `🎉 Order number ${numBuy} payed! 🚀`,
        react: OrderPaymentTemplate({
          lastname,
          firstname,
          currencymethod,
          totalPrice,
          qte,
          numBuy,
          server,
          gameName,
          pu,
          datePayed: updatedAt,
        }),
      });
      if (error) {
        return console.log(error);
      }
    }

    return { message: "Status mis à jour avec succès" };
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getAllIbenOrdersCounts() {
  try {
    const { OrderModelIben } = await ibenModels;
    const totalOrders = await OrderModelIben.countDocuments();
    return totalOrders;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function fiveRecentIbyOrders() {
  try {
    const { BuyModel } = await goapiModels;

    const recentOrderIby = await BuyModel.find()
      .sort({ createdAt: -1 })
      .limit(5);
    return recentOrderIby;
  } catch (error) {
    console.log(error);
  }
}
