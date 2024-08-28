import { Request, Response } from "express";
import {
  updateApparelStock,
  checkFulfillment,
  getOrderCost,
} from "../src/controllers/apparelController";
import {
  updateApparel,
  checkOrderFulfillment,
  getOrderCostService,
} from "../src/services/apparelService";

// Mock the service functions
jest.mock("../src/services/apparelService", () => ({
  updateApparel: jest.fn(),
  checkOrderFulfillment: jest.fn(),
  getOrderCostService: jest.fn(),
}));

describe("Apparel Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {
      body: {},
      query: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };
  });

  describe("updateApparelStock", () => {
    it("should update apparel stock and send success message", () => {
      req.body = { code: "T-Shirt", size: "M", quantity: 10, price: 20 };
      req.query = { apparelCode: "T-Shirt", apparelSize: "M" };

      updateApparelStock(req as Request, res as Response);

      expect(updateApparel).toHaveBeenCalledWith(req.body, {
        code: "T-Shirt",
        size: "M",
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith("Apparel updated successfully");
    });
  });

  describe("checkFulfillment", () => {
    it("should check order fulfillment and return the result", () => {
      req.body = [{ code: "T-Shirt", size: "M", quantity: 2 }];

      (checkOrderFulfillment as jest.Mock).mockReturnValue(true);

      checkFulfillment(req as Request, res as Response);

      expect(checkOrderFulfillment).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ canFulfill: true });
    });
  });

  describe("getOrderCost", () => {
    it("should return order cost if the order is valid", () => {
      req.body = [{ code: "T-Shirt", size: "M", quantity: 2 }];

      (getOrderCostService as jest.Mock).mockReturnValue(40);

      getOrderCost(req as Request, res as Response);

      expect(getOrderCostService).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ cost: 40 });
    });

    it("should return 404 if insufficient stock", () => {
      req.body = [{ code: "T-Shirt", size: "M", quantity: 2 }];

      const error = new Error("Insufficient stock for T-Shirt size M.");
      (getOrderCostService as jest.Mock).mockImplementation(() => {
        throw error;
      });

      getOrderCost(req as Request, res as Response);

      expect(getOrderCostService).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({
        message: "Insufficient stock for T-Shirt size M.",
      });
    });
  });
});
