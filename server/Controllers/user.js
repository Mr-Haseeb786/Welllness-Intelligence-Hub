const { UserModel } = require("../Models/user");

async function handleUserSignIn(req, res) {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({
      error: "Please enter complete details",
    });

  try {
    const user = UserModel.findOne({
      email,
      password,
    });

    if (user) {
      return res.status(200).json({ user });
    } else {
      return res.status(401).json({ error: "User does not exist" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error Fetching from db" });
    return;
  }
}

async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json({ error: "Incomplete Details" });
  }

  try {
    const user = UserModel.findOne({
      email,
    });

    if (user) {
      return res.status(400).json({ msg: "Email already Exists" });
    }
  } catch (error) {
    return res.status(500).json({ erro: "Error Signing Up in db" });
  }

  try {
    const newUser = UserModel.create({
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
  // const {} = req.body;
}

async function handlePostNewGoal() {}

async function handleDeleteSavingGoal() {}
async function handleUpdateSavingGoal() {}
async function handleGetExpenses() {}
async function handleUpdateExpenses() {}
async function handlePostExpenses() {}
async function handlePostBasics() {}

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
};
