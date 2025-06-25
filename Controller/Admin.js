var Admin = require("../Model/Admin");
var bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');

const SECRET_KEY = "ktn_enterprise";

exports.signup = async function (req, res, next) {
  try {
    if (!req.body.username || !req.body.email || !req.body.password) {
      throw new Error("Please Enter your Fields");
    }
    req.body.password = await bcrypt.hash(req.body.password, 8);
    let AdminCreate = await Admin.create(req.body);
    res.status(201).json({
      status: "Success",
      message: "User Create Successfully",
      data: AdminCreate,
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
    let AdminCheck = await Admin.findOne({ email: req.body.email });

    if (!AdminCheck) {
      throw new Error("User Not Found");
    }
    let AdminPassCheck = await bcrypt.compare(
      req.body.password,
      AdminCheck.password
    );
    if (!AdminPassCheck) {
      throw new Error("Invalid Password");
    }

    const token = jwt.sign({ id: AdminCheck._id }, SECRET_KEY);
    
    res.status(200).json({
      status: "Success",
      message: "User Login Successfully",
      data: AdminCheck,
      token:token
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};
