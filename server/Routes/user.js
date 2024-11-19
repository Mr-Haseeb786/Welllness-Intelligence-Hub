const { Router } = require("express");
const {
  handleUserSignIn,
  handleUserSignUp,
  handleGetUserInfo,
  handlePostNewGoal,
  handleDeleteSavingGoal,
  handleUpdateSavingGoal,
  handleGetExpenses,
  handleUpdateExpenses,
  handlePostExpenses,
  handlePostBasics,
  handleUserSignout,
} = require("../Controllers/user");
const { bodyCheck } = require("../Middlewares/generalCheck");

const router = Router();

router.use(bodyCheck);

router.get("/", (req, res) => res.json({ msg: "Working" }));

router.post("/signin", handleUserSignIn);
router.post("/signup", handleUserSignUp);
router.post("/signout", handleUserSignout);

router.get("/home", handleGetUserInfo);

router.post("/saving-goals", handlePostNewGoal);
router.delete("/saving-goals", handleDeleteSavingGoal);
router.put("/saving-goals", handleUpdateSavingGoal);

router.get("/expenses", handleGetExpenses);
router.put("/expenses", handleUpdateExpenses);
router.post("/expenses", handlePostExpenses);

router.post("/basics", handlePostBasics);

module.exports = router;
