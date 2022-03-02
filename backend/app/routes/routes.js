module.exports = app => {
    const digimon_card = require("../controllers/db.controller.js");
    const img_upload = require("../models/img-upload.js");
  
    var router = require("express").Router();

    router.post("/", img_upload.single("file"), digimon_card.create);

    router.get("/", digimon_card.search_by_name);

    router.post("/ebay_search", digimon_card.search_ebay);

    router.get("/:id", digimon_card.search_by_card_id);
  
    app.use('/api/digimon_cards', router);
  };

