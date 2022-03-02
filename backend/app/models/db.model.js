module.exports = (sequelize, Sequelize) =>{
  const digimon_card_db = sequelize.define("digimon_card_db", {
    
    card_id: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING    
    },
    level: {
      type: Sequelize.INTEGER
    },
    DP: {
      type: Sequelize.INTEGER
    },
    type: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.FLOAT    
    },
    price_difference: {
      type: Sequelize.FLOAT
    },
    img_type: {
      type: Sequelize.STRING
    },
    img_name: {
      type: Sequelize.STRING
    },
    img_data: {
      type: Sequelize.BLOB("long")
    }
    
  });
  
  return digimon_card_db;
};
