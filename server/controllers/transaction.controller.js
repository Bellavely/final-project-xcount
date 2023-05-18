const { db } = require("../models");
const Income = db.income;
const Expense = db.expense;
const Op = db.Sequelize.Op;

// Retrieve all Transactions from the database.
exports.findAll = (req, res) => {

  Expense.findAll({ attributes: { exclude: ["expenseImg"] } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving invoices.",
      });
    });
};

// Delete Expense with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Expense.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Expense was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Expense with id=${id}. Maybe Expense was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Expense with id=" + id,
      });
    });
};
