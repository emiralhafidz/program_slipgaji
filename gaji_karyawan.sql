-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 13 Agu 2024 pada 04.04
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gaji_karyawan`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `akun`
--

CREATE TABLE `akun` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `detail`
--

CREATE TABLE `detail` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `nip` varchar(255) NOT NULL,
  `jabatan` varchar(255) NOT NULL,
  `gaji_pokok` float DEFAULT NULL,
  `thr` float DEFAULT NULL,
  `tunjangan_anak` float DEFAULT NULL,
  `tunjangan_kesehatan` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `detail`
--

INSERT INTO `detail` (`id`, `nama`, `nip`, `jabatan`, `gaji_pokok`, `thr`, `tunjangan_anak`, `tunjangan_kesehatan`) VALUES
(47, 'Dodo widodo', '354313', 'Direktur', 5677780, 34535400, 3453540, 55575800);

--
-- Trigger `detail`
--
DELIMITER $$
CREATE TRIGGER `before_insert_detail_karir` BEFORE INSERT ON `detail` FOR EACH ROW BEGIN
  DECLARE v_gaji_pokok FLOAT;
  DECLARE v_thr FLOAT;
  DECLARE v_tunjangan_anak FLOAT;
  DECLARE v_tunjangan_kesehatan FLOAT;

  SELECT gaji_pokok, thr, tunjangan_anak, tunjangan_kesehatan
  INTO v_gaji_pokok, v_thr, v_tunjangan_anak, v_tunjangan_kesehatan
  FROM karir
  WHERE jabatan = NEW.jabatan;

  SET NEW.gaji_pokok = v_gaji_pokok;
  SET NEW.thr = v_thr;
  SET NEW.tunjangan_anak = v_tunjangan_anak;
  SET NEW.tunjangan_kesehatan = v_tunjangan_kesehatan;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `before_insert_detail_pegawai` BEFORE INSERT ON `detail` FOR EACH ROW BEGIN
  DECLARE v_nip VARCHAR(255);

  SELECT nip
  INTO v_nip
  FROM pegawai
  WHERE nama = NEW.nama;

  SET NEW.nip = v_nip;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `before_update_detail_karir` BEFORE UPDATE ON `detail` FOR EACH ROW BEGIN
  DECLARE v_gaji_pokok FLOAT;
  DECLARE v_thr FLOAT;
  DECLARE v_tunjangan_anak FLOAT;
  DECLARE v_tunjangan_kesehatan FLOAT;

  SELECT gaji_pokok, thr, tunjangan_anak, tunjangan_kesehatan
  INTO v_gaji_pokok, v_thr, v_tunjangan_anak, v_tunjangan_kesehatan
  FROM karir
  WHERE jabatan = NEW.jabatan;

  SET NEW.gaji_pokok = v_gaji_pokok;
  SET NEW.thr = v_thr;
  SET NEW.tunjangan_anak = v_tunjangan_anak;
  SET NEW.tunjangan_kesehatan = v_tunjangan_kesehatan;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `before_update_detail_pegawai` BEFORE UPDATE ON `detail` FOR EACH ROW BEGIN
  DECLARE v_nip VARCHAR(255);

  SELECT nip
  INTO v_nip
  FROM pegawai
  WHERE nama = NEW.nama;

  SET NEW.nip = v_nip;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struktur dari tabel `karir`
--

CREATE TABLE `karir` (
  `id` int(11) NOT NULL,
  `jabatan` varchar(255) NOT NULL,
  `gaji_pokok` float NOT NULL,
  `thr` float NOT NULL,
  `tunjangan_anak` float NOT NULL,
  `tunjangan_kesehatan` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `karir`
--

INSERT INTO `karir` (`id`, `jabatan`, `gaji_pokok`, `thr`, `tunjangan_anak`, `tunjangan_kesehatan`) VALUES
(16, 'Direktur', 5677780, 34535400, 3453540, 55575800);

--
-- Trigger `karir`
--
DELIMITER $$
CREATE TRIGGER `after_update_karir` AFTER UPDATE ON `karir` FOR EACH ROW BEGIN
  UPDATE detail
  SET gaji_pokok = NEW.gaji_pokok,
      thr = NEW.thr,
      tunjangan_anak = NEW.tunjangan_anak,
      tunjangan_kesehatan = NEW.tunjangan_kesehatan
  WHERE jabatan = NEW.jabatan;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struktur dari tabel `pegawai`
--

CREATE TABLE `pegawai` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `nip` varchar(255) NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `image` text NOT NULL,
  `newimg` text NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `pegawai`
--

INSERT INTO `pegawai` (`id`, `nama`, `nip`, `alamat`, `email`, `image`, `newimg`, `date`) VALUES
(73, 'Dodo widodo', '354313', 'Jl. hasyim ashari', 'dodiwicaksono@gmail.com', '', '', '2024-08-13');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `akun`
--
ALTER TABLE `akun`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `detail`
--
ALTER TABLE `detail`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nama` (`nama`);

--
-- Indeks untuk tabel `karir`
--
ALTER TABLE `karir`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `jabatan` (`jabatan`);

--
-- Indeks untuk tabel `pegawai`
--
ALTER TABLE `pegawai`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nama` (`nama`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `nip` (`nip`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `akun`
--
ALTER TABLE `akun`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `detail`
--
ALTER TABLE `detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT untuk tabel `karir`
--
ALTER TABLE `karir`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT untuk tabel `pegawai`
--
ALTER TABLE `pegawai`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
