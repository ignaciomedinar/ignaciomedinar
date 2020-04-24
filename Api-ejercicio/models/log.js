module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define(
    "log",
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      id_ejercicio: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
      },
      accion: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      registro_antes: {
        type: DataTypes.TEXT(),
        allowNull: false,
      },
      registro_despues: {
        type: DataTypes.TEXT(),
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN(),
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      tableName: "log",
      timestamps: true,
    }
  );

  return Log;
};
