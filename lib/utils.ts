import { clsx, type ClassValue } from "clsx";
import { ArchiveX, Command, File, Inbox, Send, Trash } from "lucide-react";

import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const formatDateTime = (dateString: Date | string) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    // weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    day: "numeric", // numeric day of the month (e.g., '25')
    year: "numeric", // numeric year (e.g., '2023')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: false, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    year: "numeric", // numeric year (e.g., '2023')
    month: "2-digit", // abbreviated month name (e.g., 'Oct')
    day: "2-digit", // numeric day of the month (e.g., '25')
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: false, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const formattedDateTime: string = new Date(dateString).toLocaleDateString(
    "fr-FR",
    dateTimeOptions
  );

  const formattedDateDay: string = new Date(dateString).toLocaleDateString(
    "fr-FR",
    dateDayOptions
  );

  const formattedDate: string = new Date(dateString).toLocaleDateString(
    "fr-FR",
    dateOptions
  );

  const formattedTime: string = new Date(dateString).toLocaleDateString(
    "fr-FR",
    timeOptions
  );

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

export function encryptKey(passkey: string) {
  return btoa(passkey);
}

export function decryptKey(passkey: string) {
  return atob(passkey);
}

export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result as string; // Cast result to string
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
};

export interface ServerBuy {
  _id: string;
  serverName: string;
  serverCategory: string;
  serverStatus: string;
  serverPrice: number;
  serverMinQty: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ServerSell {
  _id: string;
  serverName: string;
  serverCategory: string;
  serverStatus: string;
  serverPriceDh: number;
  serverMinQty: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CURRENCY {
  currencyName: string;
  curencyVal: number;
}

export interface CurrencyItem {
  code: string;
  name: string;
  symbol: string;
  slug: string;
}

export const currencies: CurrencyItem[] = [
  { code: "EUR", name: "Euro", symbol: "€", slug: "euro" },
  { code: "USD", name: "US Dollar", symbol: "$", slug: "dollar" },
  { code: "MAD", name: "Moroccan Dirham", symbol: "DH", slug: "mad" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", slug: "cad" },
];

export const parsedDevise = (cur: string) => {
  let symbole = "";
  switch (cur) {
    case "euro":
      symbole = "€";
      break;
    case "dollar":
      symbole = "$";
      break;
    case "mad":
      symbole = "DH";
      break;
    case "cad":
      symbole = "CAD";
      break;

    default:
      symbole = "DH";
      break;
  }

  return symbole;
};

export const codeGenerated = () => {
  const generateRandomCode =
    "0123456789abcdefghijklmnopkrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let myCode = "";
  for (let i = 0; i < 7; i++) {
    let code = Math.floor(Math.random() * generateRandomCode.length);
    myCode += generateRandomCode[code];
  }
  return myCode;
};

export const orderBuyNumGenerated = () => {
  const generateOrderNum = "0123456789";

  let myCode = "";
  for (let i = 0; i < 6; i++) {
    let code = Math.floor(Math.random() * generateOrderNum.length);
    myCode += generateOrderNum[code];
  }
  return myCode;
};

export function formatTimeAgo(
  date: Date,
  options: {
    hourText: string;
    minuteText: string;
    dayText: string;
    monthText: string;
    yearText: string;
    suffix: string;
  }
): string {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return "";
  }

  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / 60000);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30); // Approximation de 30 jours par mois
  const diffInYears = Math.floor(diffInDays / 365); // Approximation de 365 jours par an

  if (diffInYears > 0) {
    return `${diffInYears} ${options.yearText} ${options.suffix}`;
  } else if (diffInMonths > 0) {
    return `${diffInMonths} ${options.monthText} ${options.suffix}`;
  } else if (diffInDays > 0) {
    return `${diffInDays} ${options.dayText} ${options.suffix}`;
  } else if (diffInHours > 0) {
    return `${diffInHours} ${options.hourText} ${options.suffix}`;
  } else {
    return `${diffInMinutes} ${options.minuteText} ${options.suffix}`;
  }
}

type BankPayment = {
  id: string;
  title: string;
  imgPay: string;
  fee?: number;
};

export const paymentMethod: BankPayment[] = [
  {
    id: "JUK51L",
    title: "visa-google-pay",
    imgPay: "/payMethod/creditcardgooglepay.webp",
  },
  {
    id: "LPA27P",
    title: "visa-and-jcb",
    imgPay: "/payMethod/creditcard_pay.webp",
  },
  {
    id: "YHA4KO",
    title: "google-pay",
    imgPay: "/payMethod/google_pay.webp",
  },
  {
    id: "BQXP46",
    title: "paypal",
    imgPay: "/payMethod/paypals.webp",
    fee: 3,
  },
  {
    id: "AWB8YT",
    title: "paysafecard",
    imgPay: "/payMethod/paysafecard.webp",
    fee: 7,
  },
  {
    id: "OPLAW1",
    title: "crypto",
    imgPay: "/payMethod/crypto.webp",
  },
];

export const paymentMethodMorroco: BankPayment[] = [
  {
    id: "JUK51L5",
    title: "marobank",
    imgPay: "/iben/marocbank.webp",
  },
  {
    id: "LPA27P7",
    title: "credit-du-maroc",
    imgPay: "/iben/cdm.webp",
  },
  {
    id: "YHA4KO2",
    title: "societe-generale",
    imgPay: "/iben/sg.jpg",
  },
  {
    id: "BQX8P46",
    title: "barid-bank",
    imgPay: "/iben/barid-bank.png",
  },
];

export type Billing = {
  lastname: string;
  firstname: string;
  address: string;
  city: string;
  codePostal: string;
  country: string;
  email?: string;
  departement?: string;
  phone?: string;
};

export function maskDisplayName(name: string) {
  if (!name || name.length < 3) {
    // Si le nom est trop court, ne pas le masquer complètement
    return name;
  }

  const firstChar = name[0]; // Premier caractère
  const lastChar = name[name.length - 1]; // Dernier caractère

  // Remplir les caractères intermédiaires par des étoiles
  const maskedPart = "*".repeat(name.length - 2);

  return `${firstChar}${maskedPart}${lastChar}`;
}

export const customFilterDate = (date: Date) => {
  const convertedDate = new Date(date).toLocaleDateString("fr-Fr", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return convertedDate;
};

export const convertDateForSearchParams = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed in JS
  const year = String(date.getFullYear());

  return `${day}-${month}-${year}`;
};

export const emojis = [
  "😀",
  "😍",
  "👍",
  "❤️",
  "👏",
  "🎉",
  "🤔",
  "😂",
  "🤩",
  "🚀",
  "💡",
  "🌟",
  "🥳",
  "😎",
  "🔥",
  "😅",
  "💪",
  "😢",
  "😱",
  "🧐",
  "🙌",
  "🌈",
  "✨",
  "🎶",
  "🍀",
  "📚",
  "🕶️",
  "🏆",
  "⚡",
  "🌍",
  "💌",
  "📸",
  "🏅",
  "🍔",
];

export const navMain = [
  {
    title: "Command",
    url: "#",
    Icon: Command,
    isActive: true,
  },
  {
    title: "Inbox",
    url: "#",
    Icon: Inbox,
    isActive: false,
  },
  {
    title: "Drafts",
    url: "#",
    Icon: File,
    isActive: false,
  },
  {
    title: "Sent",
    url: "#",
    Icon: Send,
    isActive: false,
  },
  {
    title: "Junk",
    url: "#",
    Icon: ArchiveX,
    isActive: false,
  },
  {
    title: "Trash",
    url: "#",
    Icon: Trash,
    isActive: false,
  },
];

export type AttachedFile = {
  name: string;
  content: string | ArrayBuffer | null;
  type: string;
};

export interface UpdateSAchat {
  serverName: string;
  serverCategory: string;
  serverPriceDh: number;
  serverStatus: string;
}

export interface UpdateSVente {
  serverName: string;
  serverCategory: string;
  serverPrice: number;
  serverStatus: string;
}

export interface UpdateSAchatCreate {
  serverName: string;
  serverCategory: string;
  serverPriceDh: number;
  serverMinQty: number;
  serverStatus: string;
}

export interface UpdateSVenteCreate {
  serverName: string;
  serverCategory: string;
  serverPrice: number;
  serverMinQty: number;
  serverStatus: string;
}

export interface Currency {
  _id: string;
  [key: string]: string | number | Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChartLegendDataType {
  month: string;
  desktop: number;
  mobile: number;
}

export interface ChartDesktopType {
  desktop: number;
  month: string;
  fill: string;
}

export interface IbyGraph {
  name: string;
  total: number;
}
