const SequelizeMock = require("sequelize-mock");
const mockDb = new SequelizeMock();
let expenseModelMock;
jest.mock("../models", () => {
  const _expenseDbModel = mockDb.define("expense", {
    businessId: "1",
    saveCustomer: 1,
    customerId: 0,
    date: "2022-08-10",
    description: "expenseTest",
    items: [],
    expenseSum: 100,
    paymentMethods: [],
  });
  expenseModelMock = _expenseDbModel;
  return {
    db: {
      Sequelize: { Op: { and: "AND", like: "LIKE" } },
      expense: _expenseDbModel,
    },
  };
});
const expenseController = require("../controllers/expense_controller");

describe("expenseController", () => {
  describe("Test sum", () => {
    it("Should get value from mock", (done) => {
      const mockUserId = "1";
      const expectedExpenseSum = 150;

      expenseModelMock.$queryInterface.$useHandler(function (
        query,
        queryOptions
      ) {
        if (query === "findAll") {
          if (queryOptions[0].where?.["AND"]?.[0]?.businessId === mockUserId) {
            return [{ expenseSum: expectedExpenseSum }];
            // Result found, return it
          } else {
            // No results
            return null;
          }
        }
      });
      let res = {
        locals: { userId: mockUserId },
        status: () => {
          return res;
        },
        send: (input) => {
          try {
            expect(input[0]?.expenseSum).toEqual(expectedExpenseSum);
            done();
          } catch (error) {
            done(error);
          }
        },
      };
      expenseController.sum({}, res);
    });
  
  });

  describe("Test getAllExpenses", () => {
    it("Should get value from mock", (done) => {
      const mockUserId = "1";
      const mockExpenseRecord = expenseModelMock.build({
        businessId: mockUserId,
      });
      expenseModelMock.$queryInterface.$useHandler(function (
        query,
        queryOptions
      ) {
        if (query === "findAll") {
          if (
            queryOptions?.[0]?.where?.businessId?.["LIKE"] === `%${mockUserId}%`
          ) {
            return [mockExpenseRecord];
            // Result found, return it
          } else {
            // No results
            return null;
          }
        }
      });
      let res = {
        locals: { userId: mockUserId },
        status: () => {
          return res;
        },
        send: (input) => {
          try {
            expect(input[0]).toEqual(mockExpenseRecord);
            done();
          } catch (error) {
            done(error);
          }
        },
      };
      expenseController.getexpenses({}, res);
    });
  });

  afterEach(() => {
    expenseModelMock.$queryInterface.$clearHandlers();
  });
});
