-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1
-- Üretim Zamanı: 03 Ara 2022, 22:51:27
-- Sunucu sürümü: 10.4.18-MariaDB
-- PHP Sürümü: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `mesajuygulamadb`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `mesajlar`
--

CREATE TABLE `mesajlar` (
  `mesajid` int(11) NOT NULL,
  `gonderenid` int(11) NOT NULL,
  `aliciid` int(11) NOT NULL,
  `mesaj` varchar(10000) COLLATE utf8_turkish_ci NOT NULL,
  `tarih` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `mesajlar`
--


-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `onaykodlari`
--

CREATE TABLE `onaykodlari` (
  `id` int(11) NOT NULL,
  `uyeid` int(11) NOT NULL,
  `onaykod` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `onaykodlari`
--


-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `uyeler`
--

CREATE TABLE `uyeler` (
  `id` int(11) NOT NULL,
  `kullaniciadi` varchar(30) COLLATE utf8_turkish_ci NOT NULL,
  `sifre` varchar(100) COLLATE utf8_turkish_ci NOT NULL,
  `eposta` varchar(50) COLLATE utf8_turkish_ci NOT NULL,
  `uyelikdurumu` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `uyeler`
--


--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `mesajlar`
--
ALTER TABLE `mesajlar`
  ADD PRIMARY KEY (`mesajid`);

--
-- Tablo için indeksler `onaykodlari`
--
ALTER TABLE `onaykodlari`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `uyeler`
--
ALTER TABLE `uyeler`
  ADD PRIMARY KEY (`id`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `mesajlar`
--
ALTER TABLE `mesajlar`
  MODIFY `mesajid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=115;

--
-- Tablo için AUTO_INCREMENT değeri `onaykodlari`
--
ALTER TABLE `onaykodlari`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- Tablo için AUTO_INCREMENT değeri `uyeler`
--
ALTER TABLE `uyeler`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
