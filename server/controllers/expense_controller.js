const { db } = require("../models");
const fs = require("fs");
const { ModelCtor, Sequelize } = require("sequelize");

/**
 * @type {ModelCtor<Model<any, any>>}
 */
const expenses = db.expense;

const expenseType = db.expenseType;

const Op = db.Sequelize.Op;

//create and save a new expend
exports.create = async (req, res) => {
  expenseType
    .findOne({
      attributes: ["vatPercentage", "IrsPercentage"],
      where: { expensetypeId: req.body.VatType - 1 },
    })
    .then((data) => {
      try {
        const expense = {
          businessId: res.locals.userId,
          date: req.body.date,
          name: req.body.name,
          category: req.body.category,
          expenseItems: req.body.expenseItems,
          expenseImg: fs.readFileSync(
            __basedir +
              "/resources/static/assets/uploads/" +
              req.body.expenseImg
          ),
          expenseSum: req.body.expenseSum,
          currency: req.body.currency,
          VatType: req.body.VatType,
          VatRefund: req.body.expenseSum * data.vatPercentage,
          IrsRefund: req.body.expenseSum * data.IrsPercentage,
          refundSum: req.body.refundSum,
          confirmed: req.body.confirmed,
        };
        expenses
          .create(expense)
          .then((image) => {
            return res.send(`File has been uploaded.`);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while creating the Invoice.",
            });
          });
      } catch (error) {
        console.log(error);
        return res.send(`Error when trying upload images: ${error}`);
      }
    });
};
exports.getCategories = async (req, res) => {
  expenseType
    .findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occured while retrieving",
      });
    });
};

exports.updatecategory = async(req, res) => {
  const id = req.params.id;

  expenseType.update( req.body, {
    where: { expensetypeId: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "expense Type was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update expense Type with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating expense Type with id=" + id
      });});
    
}

exports.addCategory = (req, res) => {
  if (!req.body.name || !req.body.vatPercentage || !req.body.IrsPercentage) {
    res.status(405).send({
      message: "Content can not be empty!",
    });
    return;
  }
  const name = req.body.name;
  const vatPercentage = req.body.vatPercentage;
  const IrsPercentage = req.body.IrsPercentage;

  expenseType
    .create({
      name,
      vatPercentage,
      IrsPercentage,
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log("error: " + err);
      res.status(500).send({
        message: err.message || "Some error occurred while creating Income.",
      });
    });
};
exports.getexpenses = async (req, res) => {
  const businessId = res.locals.userId;
  var condition = businessId
    ? { businessId: { [Op.like]: `%${businessId}%` } }
    : null;
  expenses
    .findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occured while retrieving",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  expenses
    .update(req.body, {
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "expense was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update expense with id=${id}. Maybe expense was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating expense with id=" + id,
      });
    });
};
exports.getImageById = (req, res) => {
  const id = req.params.id;
  expenses
    .findOne({
      where: { id: id },
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occured while retrieving",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  expenses
    .destroy({
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "expense was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete expense with id=${id}. Maybe expense was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete expense with id=" + id,
      });
    });
};

exports.
getexpenseTypeById = (req, res) => {

  const id = req.params.id;

  expenseType.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving expense Type with id=" + id,
      });
    });
};


exports.deleteCategory = (req, res) => {
  const id = req.params.id;
  expenseType
    .destroy({
      where: { expensetypeId: id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "category was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete category with id=${id}. Maybe expense was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete category with id=" + id,
      });
    });
};

//todo: change the function and use user token
exports.find = (req, res) => {
  var name = req.body.name;
  const businessId = res.locals.userId;
  var condition2 = name ? { name: { [Op.ilike]: `%${name}%` } } : null;
  var condition = businessId
    ? { businessId: { [Op.like]: `%${businessId}%` } }
    : null;

  exports
    .findAll({
      where: { [Op.and]: [{ name: condition2 }, { businessId: condition }] },
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occured while retrieving",
      });
    });
};

exports.sum = (req, res) => {
  const businessId = res.locals.userId;
  expenses
    .findAll({
      attributes: [
        [Sequelize.fn("SUM", Sequelize.col("expenseSum")), "expenseSum"],
      ],
      where: {
        [Op.and]: [{ businessId: businessId }],
      },
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occured while retrieving",
      });
    });
};

exports.getexpenseGroupedByMonths = (req, res) => {
  const userId = res.locals.userId;
  console.log(userId);
  expenses
    .findAll({
      attributes: [
        [Sequelize.fn("SUM", Sequelize.col("expenseSum")), "expenseSum"],
        [Sequelize.fn("DATE_FORMAT", Sequelize.col("date"), "%m-%Y"), "month"],
      ],
      where: {
        [Op.and]: [{ businessId: userId }],
      },
      order: [[Sequelize.literal('"month"'), "ASC"]],
      group: "month",
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occured while retrieving",
      });
    });
};

exports.sumVat = (req, res) => {
  const businessId = res.locals.userId;
  expenses
    .findAll({
      attributes: [
        [Sequelize.fn("SUM", Sequelize.col("VatRefund")), "VatRefund"],
      ],
      where: {
        [Op.and]: [{ businessId: businessId }],
      },
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occured while retrieving",
      });
    });
};

exports.sumIrs = (req, res) => {
  const businessId = res.locals.userId;
  expenses
    .findAll({
      attributes: [
        [Sequelize.fn("SUM", Sequelize.col("IrsRefund")), "IrsRefund"],
      ],
      where: {
        [Op.and]: [{ businessId: businessId }],
      },
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occured while retrieving",
      });
    });
};
