import {
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

@Table({
  tableName: 'Kategori',
  timestamps: false,
})
export class Kategori extends Model<Kategori> {
  @PrimaryKey
  @Default(uuidv4)
  @Column({
    type: DataType.STRING(36),
    allowNull: false,
  })
  id_kategori: string;

  @Column({
    type: DataType.STRING(50),
    unique: true,
  })
  nama_kategori: string;
}
