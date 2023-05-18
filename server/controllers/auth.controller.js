const { db } = require("../models");
const config = require("../config/auth.config");
const { user: User, role: Role, refreshToken: RefreshToken, sequelize } = db;

const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { devNull } = require("os");

exports.signup = (req, res) => {
  const {
    username = req.body,
    email,
    password,
    phoneNumber,
    businessName,
    businesslogoImg,
    businessAddress,
    businessPhoneNumber,
    roles,
  } = req.body;

  // Save User to Database
  User.create({
    username,
    email,
    password: bcrypt.hashSync(password, 8),
    phoneNumber,
    businessName,
    businesslogoImg,
    businessAddress,
    businessPhoneNumber,
  })
    .then((user) => {
      if (roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.send({ user, message: "User registered successfully!" });
          });
        });
      } else {
        user.setRoles([1]).then(() => {
          res.send({ user, message: "User registered successfully!" });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.updateUser = (req, res) => {
  const businessId = res.locals.userId;

  User.update(req.body, {
    where: { userId: businessId },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User with id=${businessId}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + businessId,
      });
    });
};

exports.signin = (req, res) => {
  const { username, password } = req.body;
  User.findOne({
    where: {
      username,
    },
  })
    .then(async (user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      const passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      const token = jwt.sign({ id: user.userId }, config.secret, {
        expiresIn: config.jwtExpiration,
      });
      let refreshToken = await RefreshToken.createToken(user);
      let authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
    
        res.status(200).send({
          id: user.userId,
          username: user.username,
          email: user.email,
          roles: authorities,
          phoneNumber: user.phoneNumber,
          businessName: user.businessName,
          businessAddress: user.businessAddress,
          accessToken: token,
          refreshToken: refreshToken,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!",
    });
  } catch (err) {
    this.next(err);
  }
};

exports.refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;
  if (requestToken == null) {
    return res.status(403).json({ message: "Refresh Token is required!" });
  }
  try {
    let refreshToken = await RefreshToken.findOne({
      where: { token: requestToken },
    });
    console.log(refreshToken);
    if (!refreshToken) {
      res.status(403).json({ message: "Refresh token is not in database!" });
      return;
    }
    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.destroy({ where: { id: refreshToken.id } });

      res.status(403).json({
        message: "Refresh token was expired. Please make a new signin request",
      });
      return;
    }

    const user = await refreshToken.getUser();
    let newAccessToken = jwt.sign({ id: user.UserId }, config.secret, {
      expiresIn: config.jwtExpiration,
    });
    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};
