import { Request, Response } from "express";
import {
  updateApparel,
  checkOrderFulfillment,
  getOrderCostService,
} from "../services/apparelService";
import { Apparel } from "../models/apparel";

export const updateApparelStock = (req: Request, res: Response) => {
  const apparel: Apparel = req.body;
  const apparelCode = req.query.apparelCode as string | undefined;
  const apparelSize = req.query.apparelSize as string | undefined;
  updateApparel(apparel, { code: apparelCode, size: apparelSize });
  res.status(200).send("Apparel updated successfully");
};

export const checkFulfillment = (req: Request, res: Response) => {
  const order: Apparel[] = req.body;
  const canFulfill = checkOrderFulfillment(order);
  res.status(200).json({ canFulfill });
};

export const getOrderCost = (req: Request, res: Response) => {
  const order: Apparel[] = req.body;
  try {
    const cost = getOrderCostService(order);
    if (cost !== null) {
      res.status(200).json({ cost });
    }
  } catch (err: any) {
    res.status(404).send({ message: err.message });
  }
};
