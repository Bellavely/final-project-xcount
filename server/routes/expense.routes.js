const express = require("express");
const expenseRouter = express.Router();
const expenseController = require("../controllers/expense_controller");
const authJwt = require("../middleware/authJwt");

/**
 * @swagger
 * tags:
 *   name: Expenses
 *   description: The expenses of the user
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Expense:
 *      type: object
 *      required:
 *        - businessId
 *        - date
 *        - type
 *        - expenseImg
 *        - expenseSum
 *        - currency
 *        - VatRefund
 *        - IrsRefund
 *        - refundSum
 *        - confirmed
 *      properties:
 *        businessId:
 *          type: number
 *          description: The user id
 *        date:
 *          type: string
 *          description: enterd date
 *        type:
 *          type: string
 *          description: The user description
 *        expenseImg:
 *          type: string
 *          description: The user description
 *        expenseSum:
 *          type: number
 *          description: The user description
 *      example:
 *         businessId:'1',
 *         date:'11.02.1997',
 *         type:'comp',
 *         expenseSum:'200'
 */

/**
 * @swagger
 * /api/Expenses/create:
 *   post:
 *     summary: create a new Expense
 *     tags: [Expenses]
 *     requestBody:
 *       required: true
 *       content:
 *         authRouterlication/json:
 *           schema:
 *             $ref: '#/components/schemas/Expense'
 *       responses:
 *         200:
 *           description: create new Expense
 *           content:
 *             authRouterlication/json:
 *               schema:
 *                 $ref: '#/components/schemas/Expense'
 */

expenseRouter.post("/create", [authJwt.verifyToken], expenseController.create);

/**
 * @swagger
 * /api/expenses/all/buissnessid:
 *   post:
 *     summary: get all Expenses by buissnesid
 *     tags: [Expenses]
 *     requestBody:
 *       required: true
 *       content:
 *         expenseRouterlication/json:
 *           schema:
 *             $ref: '#/components/schemas/Expense'
 *       responses:
 *         200:
 *           description: get all expenses by buissness id
 *           content:
 *             expenseRouterlication/json:
 *               schema:
 *                 $ref: '#/components/schemas/Expense'
 */

expenseRouter.get("/all", [authJwt.verifyToken], expenseController.getexpenses);

/**
 * @swagger
 * /api/expenses/update/id:
 *   post:
 *     summary: get all Expenses by buissnesid
 *     tags: [Expenses]
 *     requestBody:
 *       required: true
 *       content:
 *         expenseRouterlication/json:
 *           schema:
 *             $ref: '#/components/schemas/Expense'
 *       responses:
 *         200:
 *           description: update expenses by id
 *           content:
 *             expenseRouterlication/json:
 *               schema:
 *                 $ref: '#/components/schemas/Expense'
 */

expenseRouter.put("/update/:id", expenseController.update);

/**
 * @swagger
 * /api/expenses/delete/id:
 *   post:
 *     summary: delete expends by id
 *     tags: [Expenses]
 *     requestBody:
 *       required: true
 *       content:
 *         expenseRouterlication/json:
 *           schema:
 *             $ref: '#/components/schemas/Expense'
 *       responses:
 *         200:
 *           description: delete expense by id
 *           content:
 *             expenseRouterlication/json:
 *               schema:
 *                 $ref: '#/components/schemas/Expense'
 */
expenseRouter.delete("/delete/:id", expenseController.delete);

/**
 * @swagger
 * /api/expenses/find/:name:
 *   post:
 *     summary: Find expend by name
 *     tags: [Expenses]
 *     requestBody:
 *       required: true
 *       content:
 *         expenseRouterlication/json:
 *           schema:
 *             $ref: '#/components/schemas/Expense'
 *       responses:
 *         200:
 *           description: Find expend by name
 *           content:
 *             expenseRouterlication/json:
 *               schema:
 *                 $ref: '#/components/schemas/Expense'
 */
expenseRouter.get("/find/:name", [authJwt.verifyToken], expenseController.find);

/**
 * @swagger
 * /api/expenses/sum:
 *   post:
 *     summary: get sum of all expenses of the user
 *     tags: [Expenses]
 *     requestBody:
 *       required: true
 *       content:
 *         expenseRouterlication/json:
 *           schema:
 *             $ref: '#/components/schemas/Expense'
 *       responses:
 *         200:
 *           description: get sum of all expenses of the user
 *           content:
 *             expenseRouterlication/json:
 *               schema:
 *                 $ref: '#/components/schemas/Expense'
 */

expenseRouter.get("/sum", [authJwt.verifyToken], expenseController.sum);

/**
 * @swagger
 * /api/expenses/grouped-by-months:
 *   post:
 *     summary: get all expenses of the user by grouped by months
 *     tags: [Expenses]
 *     requestBody:
 *       required: true
 *       content:
 *         expenseRouterlication/json:
 *           schema:
 *             $ref: '#/components/schemas/Expense'
 *       responses:
 *         200:
 *           description: get all expenses of the user by grouped-by-months
 *           content:
 *             expenseRouterlication/json:
 *               schema:
 *                 $ref: '#/components/schemas/Expense'
 */

expenseRouter.get(
  "/grouped-by-months",
  [authJwt.verifyToken],
  expenseController.getexpenseGroupedByMonths
);

/**
 * @swagger
 * /api/expenses/vatSum:
 *   post:
 *     summary: get vatSum all expenses
 *     tags: [Expenses]
 *     requestBody:
 *       required: true
 *       content:
 *         expenseRouterlication/json:
 *           schema:
 *             $ref: '#/components/schemas/Expense'
 *       responses:
 *         200:
 *           description: get vatSum all expenses
 *           content:
 *             expenseRouterlication/json:
 *               schema:
 *                 $ref: '#/components/schemas/Expense'
 */

expenseRouter.get("/vatSum", [authJwt.verifyToken], expenseController.sumVat);

/**
 * @swagger
 * /api/expenses/irsSum:
 *   post:
 *     summary: get irsSum all expenses
 *     tags: [Expenses]
 *     requestBody:
 *       required: true
 *       content:
 *         expenseRouterlication/json:
 *           schema:
 *             $ref: '#/components/schemas/Expense'
 *       responses:
 *         200:
 *           description: get irsSum all expenses
 *           content:
 *             expenseRouterlication/json:
 *               schema:
 *                 $ref: '#/components/schemas/Expense'
 */

expenseRouter.get("/irsSum", [authJwt.verifyToken], expenseController.sumIrs);

/**
 * @swagger
 * /api/expenses/irsSum:
 *   post:
 *     summary: get expenses picture
 *     tags: [Expenses]
 *     requestBody:
 *       required: true
 *       content:
 *         expenseRouterlication/json:
 *           schema:
 *             $ref: '#/components/schemas/Expense'
 *       responses:
 *         200:
 *           description: get expenses picture
 *           content:
 *             expenseRouterlication/json:
 *               schema:
 *                 $ref: '#/components/schemas/Expense'
 */
expenseRouter.get(
  "/expenseImage/:id",
  [authJwt.verifyToken],
  expenseController.getImageById
);

expenseRouter.get(
  "/categories",
  [authJwt.verifyToken],
  expenseController.getCategories
);
expenseRouter.post(
  "/addCategory",
  [authJwt.verifyToken],
  expenseController.addCategory
);
expenseRouter.delete(
  "/deleteCategory/:id",
  expenseController.deleteCategory
);

expenseRouter.get(
 "/getexpenseTypeById/:id",
 expenseController.getexpenseTypeById
);

expenseRouter.put(
  "/updateCategory/:id",
  expenseController.updatecategory
);

module.exports = expenseRouter;
