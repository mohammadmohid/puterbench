import express from "express";
import {
  signup,
  signin,
  refresh,
  logout,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/refresh", refresh);
router.post("/logout", logout);

export default router;
