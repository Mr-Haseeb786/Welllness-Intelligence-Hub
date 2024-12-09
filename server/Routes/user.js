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
  handleDeleteExpenses,
  handleGetSavingGoals,
} = require("../Controllers/user");
const { bodyCheck } = require("../Middlewares/generalCheck");

const router = Router();

router.use(bodyCheck);

router.get("/", (req, res) => res.json({ msg: "Working" }));

router.post("/signin", handleUserSignIn); // checked
router.post("/signup", handleUserSignUp); // checked
router.post("/signout", handleUserSignout); // checked

router.get("/home", handleGetUserInfo); // checked

router.post("/saving-goals", handlePostNewGoal); // checked
router.delete("/saving-goals", handleDeleteSavingGoal); // checked
router.put("/saving-goals", handleUpdateSavingGoal); // checked
router.get("/saving-goals", handleGetSavingGoals); // checked

router.get("/expenses", handleGetExpenses); // checked
router.post("/expenses", handlePostExpenses); // checked
router.put("/expenses", handleUpdateExpenses); // checked
router.delete("/expenses", handleDeleteExpenses);

router.post("/basics", handlePostBasics); // checked

module.exports = router;
