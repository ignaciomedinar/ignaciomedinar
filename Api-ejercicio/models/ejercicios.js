/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const Ejercicio = sequelize.define(
    "ejercicios",
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      nombre: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      numero: {
        type: DataTypes.FLOAT(30),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      status: {
        type: DataTypes.BOOLEAN(),
        allowNull: false,
        defaultValue: 1
      }
    },
    {
      tableName: "ejercicios"
    }
  );

  return Ejercicio;
};
