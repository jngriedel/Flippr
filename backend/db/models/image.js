'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    userId: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    content: DataTypes.TEXT,
    title: DataTypes.STRING(30)
  }, {});
  Image.associate = function(models) {
    Image.belongsTo(models.User, {foreignKey: 'userId'})
    Image.hasMany(models.Comment, {foreignKey: 'imageId',
  onDelete: 'CASCADE', hooks:true})
  };
  return Image;
};
