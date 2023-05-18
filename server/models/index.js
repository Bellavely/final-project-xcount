const dbConfig = require("../config/db.config.js");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.port,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const dbConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

dbConnect();

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.refreshToken = require("./refreshToken.model.js")(sequelize, Sequelize);
db.item = require("../models/item.model.js")(sequelize, Sequelize);
db.customer = require("./customer.model.js")(sequelize, Sequelize);
db.expense = require("./expense.model.js")(sequelize, Sequelize);
db.income = require("./income.model.js")(sequelize, Sequelize);
db.expenseType = require("./expenseType.model.js")(sequelize, Sequelize);

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
db.refreshToken.belongsTo(db.user, {
  foreignKey: "userId",
  targetKey: "userId",
});
db.user.hasOne(db.refreshToken, {
  foreignKey: "userId",
  targetKey: "userId",
});


const initial = async () => {
  let dataSet = [
    {
      name: "פנגו - כחול לבן",
      vatPercentage: 0,
      IrsPercentage: 1,
    },
    {
      name: "ארנונה",
      vatPercentage: 0,
      IrsPercentage: 1,
    },
    {
      name: "ביטוח לעסק",
      vatPercentage: 0,
      IrsPercentage: 1,
    },
    {
      name: "ביגוד רגיל (ללא לוגו של העסק)",
      vatPercentage: 0,
      IrsPercentage: 0,
    },
    {
      name: "משכורות לעובדים",
      vatPercentage: 0,
      IrsPercentage: 1,
    },
    {
      name: "כיבוד קל",
      vatPercentage: 0,
      IrsPercentage: 1,
    },
    {
      name: "קנסות תעבורה",
      vatPercentage: 0,
      IrsPercentage: 0,
    },
    {
      name: "השכרת רכב",
      vatPercentage: 0,
      IrsPercentage: 0,
    },
    {
      name: "הוצאות עסקיות - חומרי עבודה (לא רכוש קבוע)",
      vatPercentage: 0.17,
      IrsPercentage: 1,
    },
    {
      name: "הוצאות עסקיות - כלי עבודה (רכוש קבוע)",
      vatPercentage: 0.17,
      IrsPercentage: 0.33,
    },
    {
      name: "מחשב נייד",
      vatPercentage: 0.17,
      IrsPercentage: 0.33,
    },
    {
      name: "חניונים",
      vatPercentage: 0.17,
      IrsPercentage: 1,
    },
    {
      name: "כבישי אגרה",
      vatPercentage: 0.17,
      IrsPercentage: 1,
    },
    {
      name: "חשבון חשמל - למשרד",
      vatPercentage: 0.17 ,
      IrsPercentage: 1,
    },
    {
      name: "אחזקת משרד",
      vatPercentage: 0.17 ,
      IrsPercentage: 1,
    },
    {
      name: "אינטרנט - למשרד",
      vatPercentage: 0.17 ,
      IrsPercentage: 1,
    },
    {
      name: "השתלמות מקצועית",
      vatPercentage: 0.17 ,
      IrsPercentage: 1,
    },
    {
      name: "ביגוד מקצועי - עם לוגו של העסק",
      vatPercentage: 0.17 ,
      IrsPercentage: 1,
    },
    {
      name: "הנהלת חשבונות",
      vatPercentage: 0.17 ,
      IrsPercentage: 1,
    },
    {
      name: "הובלות ומשלוחים",
      vatPercentage: 0.17 ,
      IrsPercentage: 1,
    },
    {
      name: "ציוד משרד",
      vatPercentage: 0.17 ,
      IrsPercentage: 1,
    },
    {
      name:"פרסום"      ,
      vatPercentage: 0.17 ,
      IrsPercentage: 1,
    },
    {
      name:"נסיעות במונית" ,
      vatPercentage: 0.17 ,
      IrsPercentage: 1,
    },
    {
      name:"אפליקציה לניהול חשבונית / הוצאת חשבונית ירוקה      " ,
      vatPercentage: 0.17 ,
      IrsPercentage: 1,
    },
    {
      name:"חשבון חשמל - בבית (כאשר העסק עובד מהבית)" ,
      vatPercentage: 0.17 *0.25 ,
      IrsPercentage: 1,
    },
    {
      name:"אינטרנט - לבית (כאשר העסק עובד מהבית)  "    ,
      vatPercentage: 0.17 *0.25 ,
      IrsPercentage: 1,
    },
    {
      name: "דלק פרטי",
      vatPercentage: 0.17 * 0.67,
      IrsPercentage: 0.45,
    },
    {
      name: "חשבון טלפון",
      vatPercentage: 0.17 * 0.67,
      IrsPercentage: 1,
    },
    {
      name: "אוזניות",
      vatPercentage: 0.17 * 0.67, 
      IrsPercentage: 1,
    },
    {
      name: "טלפון",
      vatPercentage: 0.17 * 0.67,
      IrsPercentage: 1,
    },
    {
      name: "תיקוני רכב / טסט - אופנוע / משאית ",
      vatPercentage: 0.17 * 0.66,
      IrsPercentage: 1,
    },
    {
      name: "דלק - אופנוע / משאית",
      vatPercentage: 0.17,
      IrsPercentage: 1,
    },
  ];
  const loop = async () => {
    for (let i = 0; i < dataSet.length; i++) {
      await db.expenseType.create({
        name: dataSet[i].name,
        vatPercentage: dataSet[i].vatPercentage,
        IrsPercentage: dataSet[i].IrsPercentage,
      });
    }
  };
  loop();

  await db.role.create({
    name: "user",
  });
  await db.role.create({
    name: "moderator",
  });
  await db.role.create({
    name: "admin",
  });
};

db.ROLES = ["user", "admin", "moderator"];

module.exports = { db, initial };
