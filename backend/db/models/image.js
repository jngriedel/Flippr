'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    userId: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {});
  Image.associate = function(models) {
    Image.hasMany(models.Comment, {foreignKey: 'imageId'})
    Image.belongsTo(models.User, {foreignKey: 'userId'})
  };
  return Image;
};
