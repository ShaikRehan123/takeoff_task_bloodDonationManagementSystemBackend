-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 15, 2022 at 03:07 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blood_donation`
--

-- --------------------------------------------------------

--
-- Table structure for table `blood_banks`
--

CREATE TABLE `blood_banks` (
  `id` int(11) NOT NULL,
  `b_name` varchar(255) NOT NULL,
  `b_email` varchar(255) NOT NULL,
  `b_phone` varchar(255) NOT NULL,
  `b_add` varchar(255) NOT NULL,
  `b_desc` varchar(255) NOT NULL,
  `dat` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `blood_banks`
--

INSERT INTO `blood_banks` (`id`, `b_name`, `b_email`, `b_phone`, `b_add`, `b_desc`, `dat`) VALUES
(2, 'A Positive ', 'a.positive@gmail.com', '8328877997', 'Venkatagiri, Bus Stand', 'Blood bank for A positive ', '15/06/2022 15:30:31');

-- --------------------------------------------------------

--
-- Table structure for table `hospitals`
--

CREATE TABLE `hospitals` (
  `id` int(11) NOT NULL,
  `h_name` varchar(255) NOT NULL,
  `h_email` varchar(255) NOT NULL,
  `h_phone` varchar(255) NOT NULL,
  `h_add` varchar(255) NOT NULL,
  `h_desc` varchar(255) NOT NULL,
  `dat` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hospitals`
--

INSERT INTO `hospitals` (`id`, `h_name`, `h_email`, `h_phone`, `h_add`, `h_desc`, `dat`) VALUES
(3, 'Ruia ', 'ruia.hospitals@gmail.com', '8746259841', 'Sri Venkateswara Ramnarayan Ruia Government General Hospital', 'Sri Venkateswara Institute of Medical Sciences is a Medical Institute under State Legislature Act and a speciality hospital in Tirupati, Andhra Pradesh, India. SVIMS was conceived on the lines of All India Institute of Medical Sciences Delhi, and was crea', '15/06/2022 11:35:27'),
(4, 'Sri Venkateswara Ramnarayan Ruia Government General Hospital', 'rehj@galds', '-2', 'Sri Venkateswara Ramnarayan Ruia Government General Hospital', 'Sri Venkateswara Ramnarayan Ruia Government General Hospital', '15/06/2022 11:35:55'),
(5, 'Sri Venkateswara Ramnarayan Ruia Government General Hospital', 'svims@svims.com', '1', 'Sri Venkateswara Ramnarayan Ruia Government General Hospital', 'Sri Venkateswara Ramnarayan Ruia Government General Hospital', '15/06/2022 11:36:16'),
(7, 'Sri Venkateswara Ramnarayan Ruia Government General Hospital', 'svims@svims.com', '-1', 'Sri Venkateswara Ramnarayan Ruia Government General Hospital', 'Sri Venkateswara Ramnarayan Ruia Government General Hospital', '15/06/2022 11:36:58');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `blood_group` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `dat` varchar(255) NOT NULL,
  `role_id` int(11) NOT NULL,
  `active` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone`, `blood_group`, `password`, `address`, `dat`, `role_id`, `active`) VALUES
(1, 'admin', 'admin@gmail.com', '', '', 'admin', '', '29/03/2020 12:18:17', 1, 0),
(3, 'test New', 'test@gmail.com', '7410852963', 'O-(Negative)', '123', 'hfghfghfghffhf', '29/03/2020 17:18:51', 2, 1),
(4, 'test New', 'test1@gmail.com', '7410852963', 'O-(Negative)', '123', 'hfghfghfghffhf', '05/04/2020 11:35:30', 2, 1),
(7, 'Rehan Shaik', 'abacusrehan@gmail.com', '8328519900', 'B-(Negative)', 'Farruboti786', 'MEESEVA NEHRU NAGAR, I S MAHAL ROAD, Tirupati, Andhra Pradesh 517501', '15/06/2022 09:52:34', 2, 0),
(8, 'Farhan Shaik', 'farhanop@gmail.com', '8341261509', 'A+', 'Farruboti786', 'MEESEVA NEHRU NAGAR, I S MAHAL ROAD, Tirupati, Andhra Pradesh 517501', '15/06/2022 10:21:37', 2, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blood_banks`
--
ALTER TABLE `blood_banks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hospitals`
--
ALTER TABLE `hospitals`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blood_banks`
--
ALTER TABLE `blood_banks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `hospitals`
--
ALTER TABLE `hospitals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
