const SequelizeMock = require("sequelize-mock");
const mockDb = new SequelizeMock();
let incomeModelMock;
jest.mock("../models", () => {
  const _incomeDbModel = mockDb.define("income", {
    businessId: "1",
    saveCustomer: 1,
    customerId: 0,
    date: "2022-08-10",
    description: "incomeTest",
    items: [],
    incomeSum: 100,
    paymentMethods: [],
  });
  incomeModelMock = _incomeDbModel;
  return {
    db: {
      Sequelize: { Op: { and: "AND" } },
      income: _incomeDbModel,
    },
  };
});
const incomeController = require("../controllers/income_controller");

describe("incomeController", () => {
  describe("Test getIncomesSum", () => {
    it("Should get value from mock", (done) => {
      const mockUserId = "1";
      const expectedIncomeSum = 150;

      incomeModelMock.$queryInterface.$useHandler(function (
        query,
        queryOptions
      ) {
        if (query === "findAll") {
          if (queryOptions[0].where?.["AND"]?.[0]?.businessId === mockUserId) {
            return [{ incomeSum: expectedIncomeSum }];
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
            expect(input[0]?.incomeSum).toEqual(expectedIncomeSum);
            done();
          } catch (error) {
            done(error);
          }
        },
      };
      incomeController.getIncomesSum({}, res);
    });
  
  });

  describe("Test getAllIncomes", () => {
    it("Should get value from mock", (done) => {
      const mockUserId = "1";
      const mockIncomeRecord = incomeModelMock.build({
        businessId: mockUserId,
      });
      incomeModelMock.$queryInterface.$useHandler(function (
        query,
        queryOptions
      ) {
        if (query === "findAll") {
          if (queryOptions[0].where.businessId === mockUserId) {
            return [mockIncomeRecord];
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
            expect(input[0]).toEqual(mockIncomeRecord);
            done();
          } catch (error) {
            done(error);
          }
        },
      };
      incomeController.getAllIncomes({}, res);
    });
  });

  afterEach(() => {
    incomeModelMock.$queryInterface.$clearHandlers();
  });
});
