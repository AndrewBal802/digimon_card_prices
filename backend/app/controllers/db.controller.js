const db = require("../models");
const digimon_card_db = db.structure;
const Op = db.Sequelize.Op;
const fs = require("fs");

const eBay_api = require("ebay-node-api");
const {clientID, clientSecret, body } = require("./ebay");

console.log(module);
console.log(`${clientID}`);

const ebay = new eBay_api({
	clientID: clientID,
	clientSecret: clientSecret, 
	body: body
});




exports.create = (req, res) => {
    //console.log(req.body);
   
    //console.log(req.file);

    const digimon_card = {
        card_id: req.body.card_id,
        name:  req.body.name,
        level: req.body.level,
        DP: req.body.DP,
        type: req.body.type,
        price: req.body.price,
        price_difference: req.body.price_difference,
        img_type: req.file.mimetype,
        img_name: req.file.originalname,
        img_data:  fs.readFileSync(__basedir + "/resources/static/assets/uploads/" + req.file.filename)
    };
   

    digimon_card_db.create(digimon_card)
        .then(data => {
            fs.writeFileSync(__basedir + "/resources/static/assets/tmp/" + data.img_name, data.img_data );
            res.send(data);

        })
        .catch( err => {
            res.status(500).send({
                message: err.message || "Error with creating digimon card"
            });
        });
  
};

exports.search_by_name = (req, res) =>{
    const card_name = req.query.name;

    var search_for;
    if (card_name){
    	search_for = { name: {[Op.like]: `%${card_name}%`}};
    }else{
    	search_for =  null; //search everything
    }

   //console.log(search_for, card_name);

   //card_name = { [Op.like]: '%${card_name}%'};
   digimon_card_db.findAll({ where: search_for })
        .then(data => {
            //console.log(data);

            res.send(data);
    	})
        .catch( err => {
            res.status(500).send({
                message: err.message
            });
        });
     
};

exports.search_by_card_id = (req, res) =>{
    const card_id = req.params.id;

    var search_for;
    if (card_id){
    	search_for = { card_id: {[Op.like]: `%${card_id}%`}};
    }else{
    	search_for =  null; //search everything
    }
    
   digimon_card_db.findAll({ where: search_for })
        .then(data => {
            res.send(data);
    	})
        .catch( err => {
            res.status(500).send({
                message: err.message
            });
        });   
};

exports.search_ebay = (req, res) =>{
    const keyword = req.body.keyword;
    console.log("INCOMING KEYWORD FOR EBAY SEARCH IS ", req.body);

    
    ebay
        .findItemsByKeywords({
            keywords: `%${keyword}%`,
            sortOrder: "PricePlusShippingLowest", //https://developer.ebay.com/devzone/finding/callref/extra/fndcmpltditms.rqst.srtordr.html
            pageNumber: 1,
            limit: 10
        })
        .then(
            data => {
            console.log(data);
            res.send(data);
            },
            error => {
            console.log(error);
            }
        );

};
