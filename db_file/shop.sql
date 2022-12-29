-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 29 Gru 2022, 15:24
-- Wersja serwera: 10.4.25-MariaDB
-- Wersja PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `shop`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `produkty`
--

CREATE TABLE `produkty` (
  `type` varchar(20) NOT NULL,
  `photo` varchar(20) NOT NULL,
  `name` varchar(20) NOT NULL,
  `cena` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `produkty`
--

INSERT INTO `produkty` (`type`, `photo`, `name`, `cena`) VALUES
('Kreatyna', 'zdjecie1.jpg', 'Kreatyna 1', 250),
('Kreatyna', 'zdjecie2.jpg', 'Kreatyna 2', 220);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `shop_products`
--

CREATE TABLE `shop_products` (
  `Kreatyna` varchar(255) NOT NULL,
  `Przedtreningowki` varchar(255) NOT NULL,
  `Cytrulina` varchar(255) NOT NULL,
  `Bialko` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users_data`
--

CREATE TABLE `users_data` (
  `id` int(255) NOT NULL,
  `login` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `users_data`
--

INSERT INTO `users_data` (`id`, `login`, `password`) VALUES
(1, 'admin', 'admin'),
(2, 'test', 'test');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `produkty`
--
ALTER TABLE `produkty`
  ADD KEY `type` (`type`) USING BTREE;

--
-- Indeksy dla tabeli `shop_products`
--
ALTER TABLE `shop_products`
  ADD KEY `Bialko` (`Bialko`),
  ADD KEY `Cytrulina` (`Cytrulina`),
  ADD KEY `Kreatyna` (`Kreatyna`),
  ADD KEY `Przedtreningowki` (`Przedtreningowki`);

--
-- Indeksy dla tabeli `users_data`
--
ALTER TABLE `users_data`
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `users_data`
--
ALTER TABLE `users_data`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `shop_products`
--
ALTER TABLE `shop_products`
  ADD CONSTRAINT `shop_products_ibfk_1` FOREIGN KEY (`Bialko`) REFERENCES `produkty` (`type`),
  ADD CONSTRAINT `shop_products_ibfk_2` FOREIGN KEY (`Cytrulina`) REFERENCES `produkty` (`type`),
  ADD CONSTRAINT `shop_products_ibfk_3` FOREIGN KEY (`Kreatyna`) REFERENCES `produkty` (`type`),
  ADD CONSTRAINT `shop_products_ibfk_4` FOREIGN KEY (`Przedtreningowki`) REFERENCES `produkty` (`type`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
