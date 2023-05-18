const express = require("express");
const indexRouter = express.Router();
const receiptController = require("../controllers/receipt.controller");
const upload = require("../middleware/upload");

indexRouter.get("/", receiptController.createReceipt);

indexRouter.post("/uploadImage", upload.single("image"), async (req, res) => {
  try {
    res.send({ path: req.file.filename });
  } catch (error) {
    res.status(500).send("Error");
  }
});

module.exports = indexRouter;
