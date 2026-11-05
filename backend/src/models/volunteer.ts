import { DataTypes, Model, type CreationOptional, type InferAttributes, type InferCreationAttributes } from 'sequelize';
import { sequelize } from '../db.js';

export class Volunteer extends Model<InferAttributes<Volunteer>, InferCreationAttributes<Volunteer>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare email: string;
  /** A calendar date, 'YYYY-MM-DD'. */
  declare shiftDate: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Volunteer.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    shiftDate: { type: DataTypes.DATEONLY, allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  { sequelize, modelName: 'Volunteer' },
);
