import express from "express";
import {
  signup,
  signin,
  refresh,
  logout,
  getUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/refresh", refresh);
router.post("/logout", logout);
router.get("/profile", protect, getUserProfile);

export default router;
