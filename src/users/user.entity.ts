import {
  Model,
  Column,
  Table,
  DataType,
  PrimaryKey,
} from 'sequelize-typescript';

@Table({
  timestamps: false,
})
export class User extends Model<User> {
  @PrimaryKey
  @Column({
    type: DataType.STRING(36),
    allowNull: false,
  })
  id_users: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id_role: number;

  @Column({
    type: DataType.STRING(255),
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING(50),
    unique: true,
  })
  username: string;

  @Column({
    type: DataType.STRING(255),
  })
  password: string;

  @Column({
    type: DataType.STRING(100),
  })
  nama_lengkap: string;

  @Column({
    type: DataType.CHAR(1),
  })
  jenis_kelamin: string;

  @Column({
    type: DataType.STRING(15),
  })
  nomor_telepon: string;

  @Column({
    type: DataType.STRING(2083),
    allowNull: false,
  })
  alamat: string;

  @Column({
    type: DataType.STRING(80),
    allowNull: false,
  })
  tanggal_lahir: string;
}
