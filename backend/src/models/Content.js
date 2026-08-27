const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Content = sequelize.define(
  "Content",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    thumbnail_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    author_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    tableName: "contents",
    timestamps: true,
    underscored: true,
  }
);

Content.belongsTo(User, { foreignKey: "author_id", as: "author" });
User.hasMany(Content, { foreignKey: "author_id", as: "contents" });

module.exports = Content;
