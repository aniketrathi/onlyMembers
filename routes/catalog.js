const express = require("express");
const router = express.Router();

const messages_controller = require("../controllers/messages-controller");

/// Messages Route ///
router.get("/",messages_controller.index);

module.exports = router;