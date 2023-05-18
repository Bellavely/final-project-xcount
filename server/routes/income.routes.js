const express = require("express");
const incomeRouter = express.Router();
const IncomeController = require("../controllers/income_controller");
const authJwt = require("../middleware/authJwt");

/**
 * @swagger
 * tags:
 *   name: income
 *   description: incomes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *      type: object
 *      required:
 *        - email
 *        - username
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          description: The user email
 *        username:
 *          type: string
 *          description: The user name
 *        password:
 *          type: string
 *          description: The user password
 *      example:
 *        email: 'bob@gmail.com'
 *        username : 'bob123'
 *        password: '123456'
 */

incomeRouter.post(
  "/create",
  [authJwt.verifyToken],
  IncomeController.createIncome
);

incomeRouter.post(
  "/createCustomer",
  [authJwt.verifyToken],
  IncomeController.createCustomer
);

incomeRouter.get("/sum", [authJwt.verifyToken], IncomeController.getIncomesSum);

incomeRouter.get(
  "/grouped-by-months",
  [authJwt.verifyToken],
  IncomeController.getIncomesGroupedByMonths
);

incomeRouter.get("/all", [authJwt.verifyToken], IncomeController.getAllIncomes);
incomeRouter.get(
  "/allCustomers",
  [authJwt.verifyToken],
  IncomeController.getAllCustomers
);

incomeRouter.put("/:incomeId", IncomeController.updateIncomeById);
incomeRouter.get("/{incomeId}", IncomeController.getIncomeById);
incomeRouter.delete(
  "/all",
  [authJwt.verifyToken],
  IncomeController.deleteAllIncomes
);
incomeRouter.delete(
  "/:incomeId",
  [authJwt.verifyToken],
  IncomeController.deleteIncomeById
);
incomeRouter.get("/:startDate&endDate", IncomeController.getIncomesByDate);
incomeRouter.delete(
  "/:startDate&endDate",
  IncomeController.deleteIncomesByDate
);
module.exports = incomeRouter;
