import { Router } from "express";
import {
  checkFulfillment,
  getOrderCost,
} from "../controllers/apparelController";

const router = Router();

router.post("/check-fulfillment", checkFulfillment);
router.post("/order-cost", getOrderCost);

export default router;
