import { Apparel, ApparelData } from "../models/apparel";
import * as fs from "fs";

const dataFile = "./src/data/apparelData.json";

const readData = (): ApparelData => {
  const rawData = fs.readFileSync(dataFile);
  return JSON.parse(rawData.toString());
};

const writeData = (data: ApparelData): void => {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
};

export const updateApparel = (
  apparel: Apparel,
  params?: { code?: string | undefined; size?: string | undefined }
): void => {
  const data = readData();

  //Single apparel update
  if (params?.code && params?.size) {
    const { code, size } = params;
    if (!data[code]) {
      data[code] = [];
    }

    const index = data[code].findIndex((item) => item.size === size);

    if (index !== -1) {
      data[code][index] = { ...apparel, code: code, size: size } as Apparel;
    } else {
      data[code].push({ ...apparel, code: code, size: size } as Apparel);
    }
  }
  //Batch apparel update
  else if (Array.isArray(apparel)) {
    apparel.forEach((item) => {
      if (!data[item.code]) {
        data[item.code] = [];
      }

      const index = data[item.code].findIndex(
        (existingItem) => existingItem.size === item.size
      );

      if (index !== -1) {
        data[item.code][index] = item;
      } else {
        data[item.code].push(item);
      }
    });
  }
  // Fallback for single update without params
  else {
    const { code, size } = apparel as Apparel;

    if (!data[code]) {
      data[code] = [];
    }

    const index = data[code].findIndex((item) => item.size === size);

    if (index !== -1) {
      data[code][index] = apparel as Apparel;
    } else {
      data[code].push(apparel as Apparel);
    }
  }

  writeData(data);
};

export const checkOrderFulfillment = (order: Apparel[]): boolean => {
  const data = readData();
  return order.every((item) => {
    const apparel = data[item.code]?.find((a) => a.size === item.size);
    return apparel && apparel.quantity >= item.quantity;
  });
};

export const getOrderCostService = (order: Apparel[]): number | null => {
  const data = readData();
  let totalCost = 0;
  let errorMessages: string[] = [];

  for (const item of order) {
    const { code, size, quantity } = item;

    if (!data[code]) {
      errorMessages.push(`Apparel with code ${code} is not available.`);
    }

    const apparel = data[code].find(
      (apparelItem: any) => apparelItem.size === size
    );

    if (!apparel || apparel.quantity < quantity) {
      errorMessages.push(`Insufficient stock for ${code} size ${size}.`);
    } else totalCost += apparel.price * quantity;
  }

  if (errorMessages.length > 0) {
    throw new Error(errorMessages.join(" | "));
  }

  return totalCost;
};
