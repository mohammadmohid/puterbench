const express = require("express");
const {
  signup,
  signin,
  refresh,
  logout,
} = require("../controllers/userController.js");
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/refresh", refresh);
router.post("/logout", logout);

module.exports = router;
