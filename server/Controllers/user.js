const { ExpenseModel } = require("../Models/expenses");
const { FinanceModel } = require("../Models/financeInfo");
const { SavingsModel } = require("../Models/savings");
const { UserModel } = require("../Models/user");
const {
  createToken,
  getUserInfoFromToken,
  verifyToken,
} = require("../utils/jwtAuth");

async function handleUserSignIn(req, res) {
  const { email, password } = req.body;
  const token = req.cookies.token;

  if (token) return res.status(400).json({ error: "Already logged in" });

  if (!email || !password)
    return res.status(400).json({
      error: "Please enter complete details",
    });

  try {
    const user = await UserModel.findOne({
      email,
      password,
    });

    if (user) {
      const userInfo = {
        userId: user._id,
        name: user.name,
        email: email,
      };

      const token = createToken(userInfo);
      res.cookie("token", token);

      return res.status(200).json({ user });
    } else {
      return res.status(402).json({ error: "User does not exist" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error Fetching from db" + error });
    return;
  }
}

async function handleUserSignout(req, res) {
  return res.clearCookie("token").json({ msg: "Cookies cleared" });
}

async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json({ error: "Incomplete Details" });
  }

  try {
    const user = await UserModel.findOne({
      email,
    });

    console.log(user);

    if (user) {
      return res.status(400).json({ msg: "Email already Exists" });
    }
  } catch (error) {
    return res.status(500).json({ erro: "Error Signing Up in db" });
  }

  try {
    const newUser = await UserModel.create({
      name,
      email,
      password,
    });

    return res.status(201).json({ msg: "user created", newUser });
  } catch (error) {
    return res.status(500).json({ erro: "Error Signing Up in db" });
  }
}

async function handleGetUserInfo(req, res) {
  const token = req.cookies.token;
  let user = null;

  console.log(token);

  try {
    user = getUserInfoFromToken(token);

    console.log(user);

    if (!user) return res.status(401).json({ msg: "Unauthorized" });
  } catch (error) {
    console.log(error);
    return res.status(402).json({ error: "User not signed in" });
  }

  try {
    const financeInfo = await FinanceModel.findOne({
      userOwner: user._id,
    }).populate();

    if (!financeInfo) {
      console.log("No finance Info found");
      return res
        .status(404)
        .json({ error: "No data corresponding data found" });
    }

    return res.status(200).json({ financeInfo });
  } catch (error) {
    return res.status(500).json({ error: "There was an error, " + error });
  }
}

async function handlePostNewGoal(req, res) {
  const { title, deadline, savedAmount, targetAmount } = req.body;

  const token = req.cookies.token;
  let user = null;

  try {
    user = getUserInfoFromToken(token);
    if (!user) return res.status(401).json({ msg: "Unauthorized" });
  } catch (error) {
    console.log(error);
    return req.end("No token");
  }

  try {
    const newGoal = await SavingsModel.create({
      title,
      deadline,
      financeRef: user._id,
      savedAmount,
      targetAmount,
    });

    return req.status(201).json({ newGoal });
  } catch (error) {
    return res.end(error);
  }
}

async function handleDeleteSavingGoal(req, res) {
  const { goalId } = req.body;

  const token = req.cookies.token;
  let user = null;

  console.log(token);

  try {
    user = getUserInfoFromToken(token);
    if (!user) return res.status(401).json({ msg: "Unauthorized" });

    console.log(user);
  } catch (error) {
    console.log(error);
    return res.status(402).json({ error: "User not signed in" + error });
  }

  try {
    const deletedGoal = await SavingsModel.findByIdAndDelete(goalId);

    return res.status(200).json({ msg: "Goal deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Error Deleting the goal" + error });
  }
}
async function handleUpdateSavingGoal(req, res) {
  const { goalId, newAmount } = req.body;

  const token = req.cookies.token;
  let user = null;

  console.log(token);

  try {
    user = getUserInfoFromToken(token);
    console.log(user);

    if (!user) return res.status(401).json({ msg: "Unauthorized" });
  } catch (error) {
    console.log(error);
    return res.status(402).json({ error: "User not signed in" + error });
  }

  try {
    const updatedGoal = await SavingsModel.updateOne(
      { _id: goalId },
      { savedAmount: newAmount }
    );

    return res.status(200).json({ msg: "Goal updated", updatedGoal });
  } catch (error) {
    return res.end("There was an error " + error);
  }
}

async function handleGetExpenses(req, res) {
  const token = req.cookies.token;
  let user = null;
  let financeId = null;

  console.log(token);

  try {
    user = getUserInfoFromToken(token);
    console.log(user);

    if (!user) return res.status(401).json({ msg: "Unauthorized" });
  } catch (error) {
    console.log(error);
    return res.status(402).json({ error: "User not signed in" + error });
  }

  try {
    financeId = await FinanceModel.find({ userOwner: user.userId });
    console.log("Finance Id :" + financeId);
  } catch (error) {
    return res.end("there was an error " + error);
  }

  try {
    const expenses = await ExpenseModel.find({
      financeRef: financeId,
    });

    return res.status(200).json({ expenses });
  } catch (error) {
    return res.end("There was an error " + error);
  }
}

async function handleUpdateExpenses(req, res) {
  const { expenseId, newExpenseInfo } = req.body;

  const token = req.cookies.token;
  let user = null;

  console.log(token);

  try {
    user = getUserInfoFromToken(token);
    console.log(user);

    if (!user) return res.status(401).json({ msg: "Unauthorized" });
  } catch (error) {
    console.log(error);
    return res.status(402).json({ error: "User not signed in" + error });
  }

  try {
    const updatedExpense = await ExpenseModel.updateOne(
      { _id: expenseId },
      { name: newExpenseInfo.name, amount: newExpenseInfo.amount }
    );

    return res
      .status(200)
      .json({ msg: "Updated Expense Data", updatedExpense });
  } catch (error) {
    return res.send(error);
  }
}

async function handlePostExpenses(req, res) {
  const { name, amount, financeRef } = req.body;

  const token = req.cookies.token;
  let user = null;

  console.log(token);

  try {
    user = getUserInfoFromToken(token);
    console.log(user);

    if (!user) return res.status(401).json({ msg: "Unauthorized" });
  } catch (error) {
    console.log(error);
    return res.status(402).json({ error: "User not signed in" + error });
  }

  try {
    const newExpense = await ExpenseModel.create({
      name,
      amount,
      financeRef,
    });

    return res.status(201).json({ msg: "Created new Expense", newExpense });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "There was an error inserting in db " + error });
  }
}

async function handleGetHomePageInfo(req, res) {
  const token = req.cookies.token;
  let user = null;

  console.log(token);

  try {
    user = getUserInfoFromToken(token);
    console.log(user);

    if (!user) return res.status(401).json({ msg: "Unauthorized" });
  } catch (error) {
    console.log(error);
    return res.status(402).json({ error: "User not signed in" + error });
  }

  try {
    const basicInfo = await FinanceModel.findOne({
      userOwner: user.userId,
    }).populate();

    return res.status(200).json({ basicInfo });
  } catch (error) {
    return res.end("There was an error: " + error);
  }
}

async function handlePostBasics(req, res) {
  const { totalBalance, monthlyIncome } = req.body;

  const token = req.cookies.token;
  let user = null;

  console.log(token);

  try {
    user = getUserInfoFromToken(token);
    console.log(user);

    if (!user) return res.status(401).json({ msg: "Unauthorized" });
  } catch (error) {
    console.log(error);
    return res.status(402).json({ error: "User not signed in" + error });
  }

  try {
    const newBasicInfo = await FinanceModel.create({
      monthlyIncome,
      totalBalance,
      userOwner: user.userId,
    });

    return res
      .status(201)
      .json({ msg: "Created new basic info ", newBasicInfo });
  } catch (error) {
    return res.end("There was an error" + error);
  }
}

module.exports = {
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
  handleGetHomePageInfo,
  handleUserSignout,
};
