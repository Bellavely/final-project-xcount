module.exports = (sequelize, Sequelize) => {
  const Income = sequelize.define(
    "income",
    {
      incomeId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      businessId: {
        type: Sequelize.INTEGER,
      },
      saveCustomer: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      customerId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      date: {
        type: Sequelize.DATEONLY,
      },
      description: {
        type: Sequelize.STRING,
      },
      items: {
        type: Sequelize.STRING,
      },
      incomeSum: {
        type: Sequelize.FLOAT,
      },

      paymentMethods: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      incomeType: {
        type: Sequelize.ENUM(
          "Tax invoice/Receipt",
          "Tax invoice",
          "Receipt",
          "Transaction invoice",
          "Credit invoice"
        ),
        defaultValue: "Tax invoice/Receipt",
      },
    },
    {
      timestamps: false,
      charset: "utf8",
      collate: "utf8_unicode_ci",
    }
  );

  return Income;
};
