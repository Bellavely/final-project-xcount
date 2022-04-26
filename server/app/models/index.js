const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

<<<<<<< HEAD
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
=======
const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  }
);

>>>>>>> 4367ca71bb844a434bfd92eb8ac8920d29488dba

// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//   host: dbConfig.HOST,
//   dialect: dbConfig.dialect,
//   port: dbConfig.port,
//   operatorsAliases: 0,

//   pool: {
//     max: dbConfig.pool.max,
//     min: dbConfig.pool.min,
//     acquire: dbConfig.pool.acquire,
//     idle: dbConfig.pool.idle
//   }
// });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.invoices = require("./invoice.model.js")(sequelize, Sequelize);
db.expense = require("./expense.model.js")(sequelize, Sequelize);
db.income = require("./income.model.js")(sequelize, Sequelize);
db.business = require("./business.model.js")(sequelize, Sequelize);
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.refreshToken = require("../models/refreshToken.model.js")(
  sequelize,
  Sequelize
);
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});
<<<<<<< HEAD
db.refreshToken.belongsTo(db.user, {
  foreignKey: "userId",
  targetKey: "id",
});
=======
// db.refreshToken.belongsTo(db.user, {
//   foreignKey: 'userId', targetKey: 'id'
// });
>>>>>>> 4367ca71bb844a434bfd92eb8ac8920d29488dba
db.user.hasOne(db.refreshToken, {
  foreignKey: "userId",
  targetKey: "id",
});
<<<<<<< HEAD
/*db.expense.hasOne(db.refreshToken, {
  foreignKey: 'userId', targetKey: 'id'
});*/

=======
// db.user.belongsToMany(db.customer, {
//   through: "user_customer",
//   foreignKey: "companyID",
//   otherKey: "userID"
// });
>>>>>>> 4367ca71bb844a434bfd92eb8ac8920d29488dba
db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
