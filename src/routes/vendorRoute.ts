import { Router } from "express";
import { updateApparelStock } from "../controllers/apparelController";

const router = Router();

router.post("/update", updateApparelStock);

export default router;
