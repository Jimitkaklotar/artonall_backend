var Users = require("../Model/User");
var bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');

const SECRET_KEY = "ktn_enterprise";

exports.signup = async function (req, res, next) {
  try {
    if (!req.body.username || !req.body.email || !req.body.password ||!req.body.mobile_number ) {
      throw new Error("Please Enter your Fields");
    }
    req.body.password = await bcrypt.hash(req.body.password, 8);
    let UsersCreate = await Users.create(req.body);
    res.status(201).json({
      status: "Success",
      message: "User Create Successfully",
      data: UsersCreate,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

exports.login = async function (req, res, next) {
  try {
    if (!req.body.email || !req.body.password) {
      throw new Error("Please Enter Your fields");
    }
    let UsersCheck = await Users.findOne({ email: req.body.email });

    if (!UsersCheck) {
      throw new Error("User Not Found");
    }
    let UsersPassCheck = await bcrypt.compare(
      req.body.password,
      UsersCheck.password
    );
    if (!UsersPassCheck) {
      throw new Error("Invalid Password");
    }

    const token = jwt.sign({ id: UsersCheck._id }, SECRET_KEY);

    res.status(200).json({
      status: "Success",
      message: "User Login Successfully",
      data: UsersCheck,
      token:token
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};
