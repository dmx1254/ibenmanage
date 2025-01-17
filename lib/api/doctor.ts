import { goapiModels } from "../models/ibytrade-models";
import { ibenModels } from "../models/ibendouma-models";

export async function getIbyOrdersCount() {
  try {
    const { BuyModel } = await goapiModels;
    const ibyOrders = await BuyModel.countDocuments();

    return ibyOrders;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getPatientsDevices() {
  try {
    const { UserIbenModel } = await ibenModels;
    const result = await UserIbenModel.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            deviceUsed: "$deviceUsed",
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.month",
          devices: {
            $push: {
              device: "$_id.deviceUsed",
              count: "$count",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          month: {
            $switch: {
              branches: [
                { case: { $eq: ["$_id", 1] }, then: "January" },
                { case: { $eq: ["$_id", 2] }, then: "February" },
                { case: { $eq: ["$_id", 3] }, then: "March" },
                { case: { $eq: ["$_id", 4] }, then: "April" },
                { case: { $eq: ["$_id", 5] }, then: "May" },
                { case: { $eq: ["$_id", 6] }, then: "June" },
                { case: { $eq: ["$_id", 7] }, then: "July" },
                { case: { $eq: ["$_id", 8] }, then: "August" },
                { case: { $eq: ["$_id", 9] }, then: "September" },
                { case: { $eq: ["$_id", 10] }, then: "October" },
                { case: { $eq: ["$_id", 11] }, then: "November" },
                { case: { $eq: ["$_id", 12] }, then: "December" },
              ],
              default: "Unknown",
            },
          },
          desktop: {
            $reduce: {
              input: {
                $filter: {
                  input: "$devices",
                  as: "device",
                  cond: { $eq: ["$$device.device", "Desktop"] },
                },
              },
              initialValue: 0,
              in: { $add: ["$$value", "$$this.count"] },
            },
          },
          mobile: {
            $reduce: {
              input: {
                $filter: {
                  input: "$devices",
                  as: "device",
                  cond: { $eq: ["$$device.device", "Mobile"] },
                },
              },
              initialValue: 0,
              in: { $add: ["$$value", "$$this.count"] },
            },
          },
        },
      },
      { $sort: { month: 1 } },
    ]);

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getDesktopVisits() {
  try {
    const { VisitModel } = await ibenModels;
    const result = await VisitModel.aggregate([
      // 1. Regrouper par mois
      {
        $group: {
          _id: { $month: "$createdAt" }, // Obtenir le mois à partir de `createdAt`
          desktop: { $sum: 1 }, // Compter le nombre de visites pour chaque mois
        },
      },
      // 2. Projeter (convertir) les mois en noms
      {
        $project: {
          _id: 0, // Supprimer l'ID par défaut
          month: {
            $switch: {
              branches: [
                { case: { $eq: ["$_id", 1] }, then: "january" },
                { case: { $eq: ["$_id", 2] }, then: "february" },
                { case: { $eq: ["$_id", 3] }, then: "march" },
                { case: { $eq: ["$_id", 4] }, then: "april" },
                { case: { $eq: ["$_id", 5] }, then: "may" },
                { case: { $eq: ["$_id", 6] }, then: "june" },
                { case: { $eq: ["$_id", 7] }, then: "july" },
                { case: { $eq: ["$_id", 8] }, then: "august" },
                { case: { $eq: ["$_id", 9] }, then: "september" },
                { case: { $eq: ["$_id", 10] }, then: "october" },
                { case: { $eq: ["$_id", 11] }, then: "november" },
                { case: { $eq: ["$_id", 12] }, then: "december" },
              ],
              default: "unknown", // Cas par défaut
            },
          },
          desktop: 1, // Inclure le champ `desktop`
          fill: {
            $concat: [
              "var(--color-", // Préfixe pour les couleurs
              {
                $switch: {
                  branches: [
                    { case: { $eq: ["$_id", 1] }, then: "january" },
                    { case: { $eq: ["$_id", 2] }, then: "february" },
                    { case: { $eq: ["$_id", 3] }, then: "march" },
                    { case: { $eq: ["$_id", 4] }, then: "april" },
                    { case: { $eq: ["$_id", 5] }, then: "may" },
                    { case: { $eq: ["$_id", 6] }, then: "june" },
                    { case: { $eq: ["$_id", 7] }, then: "july" },
                    { case: { $eq: ["$_id", 8] }, then: "august" },
                    { case: { $eq: ["$_id", 9] }, then: "september" },
                    { case: { $eq: ["$_id", 10] }, then: "october" },
                    { case: { $eq: ["$_id", 11] }, then: "november" },
                    { case: { $eq: ["$_id", 12] }, then: "december" },
                  ],
                  default: "unknown",
                },
              },
              ")",
            ],
          },
        },
      },
      // 3. Trier par mois
      { $sort: { _id: 1 } },
    ]);

    return result;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getIbenUserOnlineCount() {
  try {
    const { UserIbenModel } = await ibenModels;

    const users = await UserIbenModel.countDocuments({
      online: true,
    });

    return users;
  } catch (error) {
    console.log(error);
  }
}



export async function getIbyOrdersGraph() {
  try {
    const { BuyModel } = await goapiModels;

    // Récupérer les données regroupées par mois
    const result = await BuyModel.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: "$totalPrice" }, // Somme du prix total pour chaque mois
        },
      },
      {
        $project: {
          _id: 0,
          name: {
            $switch: {
              branches: [
                { case: { $eq: ["$_id", 1] }, then: "Jan" },
                { case: { $eq: ["$_id", 2] }, then: "Feb" },
                { case: { $eq: ["$_id", 3] }, then: "Mar" },
                { case: { $eq: ["$_id", 4] }, then: "Apr" },
                { case: { $eq: ["$_id", 5] }, then: "May" },
                { case: { $eq: ["$_id", 6] }, then: "Jun" },
                { case: { $eq: ["$_id", 7] }, then: "Jul" },
                { case: { $eq: ["$_id", 8] }, then: "Aug" },
                { case: { $eq: ["$_id", 9] }, then: "Sep" },
                { case: { $eq: ["$_id", 10] }, then: "Oct" },
                { case: { $eq: ["$_id", 11] }, then: "Nov" },
                { case: { $eq: ["$_id", 12] }, then: "Dec" },
              ],
              default: "Unknown",
            },
          },
          total: { $round: ["$total", 2] }, // Total arrondi à 2 décimales
        },
      },
      { $sort: { _id: 1 } }, // Tri par mois
    ]);

    return result; // Retourne le tableau transformé
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes par mois :", error);
    return [];
  }
}