-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 20, 2024 at 08:25 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- --------------------------------------------------------

--
-- Table structure for table `kategori`
--

CREATE TABLE `kategori` (
  `id_kategori` char(36) NOT NULL,
  `nama_kategori` varchar(50) DEFAULT NULL,
  `deskripsi` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `kategori`
--

INSERT INTO `kategori` (`id_kategori`, `nama_kategori`, `deskripsi`) VALUES
('b5f1f856-2e58-11ef-809b-d843ae2f8e4a', 'Pendidikan', NULL),
('b5f1ffe9-2e58-11ef-809b-d843ae2f8e4a', 'Matematika & Sains', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `lomba`
--

CREATE TABLE `lomba` (
  `id_lomba` char(36) NOT NULL,
  `id_users` char(36) NOT NULL,
  `nama_lomba` varchar(100) NOT NULL,
  `tanggal_akhir` date NOT NULL,
  `penyelenggara_lomba` varchar(255) NOT NULL,
  `link_pendaftaran_lomba` varchar(2083) NOT NULL,
  `link_narahubung` varchar(2083) NOT NULL,
  `id_kategori` char(36) NOT NULL,
  `survei` varchar(2083) NOT NULL,
  `tingkat_perlombaan` varchar(100) NOT NULL,
  `biaya_pendaftaran` int(11) DEFAULT 0,
  `image_lomba` varchar(255) NOT NULL,
  `views` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `lomba`
--

INSERT INTO `lomba` (`id_lomba`, `id_users`, `nama_lomba`, `tanggal_akhir`, `penyelenggara_lomba`, `link_pendaftaran_lomba`, `link_narahubung`, `id_kategori`, `survei`, `tingkat_perlombaan`, `biaya_pendaftaran`, `image_lomba`, `views`, `is_active`) VALUES
('617872ec-2e59-11ef-809b-d843ae2f8e4a', 'd6a3a319-ecfc-4517-a7a6-7aed693a0cae', 'Lomba Mewarnai', '2024-06-30', 'Puri Bunda Hospital', 'https://www.google.com', 'wa.me/628987928615', 'b5f1f856-2e58-11ef-809b-d843ae2f8e4a', '', 'PAUD/TK', 15000, 'image/1718145919440.jpg', 550, 1);

-- --------------------------------------------------------

--
-- Table structure for table `pendaftaran`
--

CREATE TABLE `pendaftaran` (
  `id_lomba` char(36) NOT NULL,
  `id_users` char(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id_role` int(11) NOT NULL,
  `nama_role` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id_role`, `nama_role`) VALUES
(1, 'user'),
(2, 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_users` char(36) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `nama_lengkap` varchar(100) DEFAULT NULL,
  `jenis_kelamin` char(1) DEFAULT NULL,
  `nomor_telepon` varchar(15) DEFAULT NULL,
  `alamat` varchar(2083) NOT NULL,
  `tanggal_lahir` varchar(80) NOT NULL,
  `id_role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_users`, `email`, `username`, `password`, `nama_lengkap`, `jenis_kelamin`, `nomor_telepon`, `alamat`, `tanggal_lahir`, `id_role`) VALUES
('55d02041-a540-4792-a207-ae86eb22cee2', 'rzqhilal@gmail.com', 'rzqhilal', '$2b$10$rP2UzKgafDvIoL4e./9u2u1h5K1VTId4KLySDnXuhs5wcMyvV0c7.', 'Rizq Hilal Rifaasya', 'L', '081313583029', '', '', 1),
('d6a3a319-ecfc-4517-a7a6-7aed693a0cae', 'zhrtlmrdyh@gmail.com', 'zhrtlmrdyh', '$2b$10$pA8TL1y1HT4KhLmnswgvZ.lR7tNXB18eJS2pzwjZyo0wE6sq0bXMS', 'Zahratul Mardiyah', 'P', '081313583029', '', '', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `kategori`
--
ALTER TABLE `kategori`
  ADD PRIMARY KEY (`id_kategori`);

--
-- Indexes for table `lomba`
--
ALTER TABLE `lomba`
  ADD PRIMARY KEY (`id_lomba`),
  ADD KEY `id_users` (`id_users`),
  ADD KEY `lomba_ibfk_2` (`id_kategori`);

--
-- Indexes for table `pendaftaran`
--
ALTER TABLE `pendaftaran`
  ADD PRIMARY KEY (`id_lomba`,`id_users`),
  ADD KEY `id_users` (`id_users`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id_role`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_users`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `lomba`
--
ALTER TABLE `lomba`
  ADD CONSTRAINT `lomba_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users` (`id_users`),
  ADD CONSTRAINT `lomba_ibfk_2` FOREIGN KEY (`id_kategori`) REFERENCES `kategori` (`id_kategori`);

--
-- Constraints for table `pendaftaran`
--
ALTER TABLE `pendaftaran`
  ADD CONSTRAINT `pendaftaran_ibfk_1` FOREIGN KEY (`id_lomba`) REFERENCES `lomba` (`id_lomba`),
  ADD CONSTRAINT `pendaftaran_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users` (`id_users`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
