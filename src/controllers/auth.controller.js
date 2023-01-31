"use strict";

// librarys
const jwt = require("jsonwebtoken");
// configs
const { ENV } = require("../configs/configs");
// schemas
const Users = require("../schemas/user.schema");

// registry
function signUp(req, res) {
  try {
    if (!req.body)
      return res.status(404).send({
        msg: "EmptyBody",
      });
    let user = new Users(req.body);

    // saving user
    user.save((err, userStored) => {
      if (err) throw err;
      if (!userStored)
        return res.status(500).send({
          msg: "SomethingIsWrongWithRegistry",
        });

      return res.status(200).send({
        msg: "Successfull",
      });
    });
  } catch (e) {
    // checking mongoose errors
    if (e.name == "MongoServerError") {
      /* verification of whether the username already exists,
         that is, it is duplicated
      */
      if (e.keyValue.username)
        return res.status(400).json({
          msg: "DuplicateUsername",
        });
      return res.status(400).send({
        msg: "SomethingIsWrong",
      });
    }
    return res.status(500).send({
      msg: "ServerError!!!",
    });
  }
}

// user authentication
async function signIn(req, res) {
  try {
    if (!req.body.username || req.body.password)
      return res.status(404).send({
        msg: "EmptyUsernameOrPassword",
      });
    // checking the username and getting the user.
    const user = await Users.findOne(
      { username: req.body.username },
      (err, user) => {
        if (err) throw err;
        if (!user)
          return res.status(401).send({
            msg: "UsernameOrPasswordIncorrect",
          });
      }
    );
    // verifying password
    const password = bcrypt.compareSync(req.body.password, user.password);
    if (password) {
      const expireIn = 24 * 60 * 60;
      const token = jwt.sign({ _id: user._id }, ENV.Global.SECRET_KEY, {
        expiresIn: expireIn,
      });
      return res.status(200).send({
        token: token,
        msg: "Successfull",
      });
    } else
      return res.status(401).send({
        msg: "UsernameOrPasswordIncorrect",
      });
  } catch (e) {
    return res.status(500).send({
      msg: "ServerError!!!",
    });
  }
}

export { signUp, signIn };
