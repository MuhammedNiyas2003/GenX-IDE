import express from "express";
import { userLogin, userRegister } from "../controllers/auth.js";
import passport from "passport";

const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    console.log("callback");
    // Redirect or respond as needed
    res.redirect("/");
  }
);

export default router;
