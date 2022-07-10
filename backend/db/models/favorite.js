'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    userId: DataTypes.INTEGER,
    imageId: DataTypes.INTEGER
  }, {});
  Favorite.associate = function(models) {
    Favorite.belongsTo(models.Image, {foreignKey:'imageId'});
    Favorite.belongsTo(models.User, {foreignKey:'userId'});  };
  return Favorite;
};
