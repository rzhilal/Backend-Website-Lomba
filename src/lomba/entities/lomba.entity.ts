import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Kategori } from 'src/kategori/entities/kategori.entity';
import { User } from 'src/users/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

@Table({
  tableName: 'lomba',
  timestamps: false,
})
export class Lomba extends Model<Lomba> {
  @PrimaryKey
  @Default(uuidv4)
  @Column({
    type: DataType.CHAR(36),
    allowNull: false,
  })
  id_lomba: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.CHAR(36),
    allowNull: false,
  })
  id_users: string;

  @BelongsTo(() => User)
  user: User;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  nama_lomba: string;

  @Column({
    type: DataType.STRING(2083),
    allowNull: false,
  })
  deskripsi: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  tanggal_pendaftaran: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  tanggal_akhir_pendaftaran: Date;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  penyelenggara_lomba: string;

  @Column({
    type: DataType.STRING(2083),
    allowNull: false,
  })
  link_pendaftaran_lomba: string;

  @Column({
    type: DataType.STRING(2083),
    allowNull: false,
  })
  link_narahubung: string;

  @ForeignKey(() => Kategori)
  @Column({
    type: DataType.CHAR(36),
    allowNull: false,
  })
  id_kategori: string;

  @BelongsTo(() => Kategori)
  kategori: Kategori;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  tingkat_perlombaan: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: 0,
  })
  biaya_pendaftaran: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  image_lomba: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: 0,
  })
  views: number;

  @Column({
    type: DataType.TINYINT,
    allowNull: true,
    defaultValue: 1,
  })
  is_active: boolean;
}
