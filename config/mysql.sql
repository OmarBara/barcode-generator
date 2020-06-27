
SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `sts`
--

-- --------------------------------------------------------

--
-- Table structure for table `acls`
--

CREATE TABLE IF NOT EXISTS `sequence` (
  `id` int(3) NOT NULL,
  `value` varchar(12) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



INSERT INTO `sequence` (`id`, `value`) VALUES
(1, '000000'),
(2, '000000'),
(3, '000000'),
(4, '000000'),
(5, '000000'),
(6, '000000'),
(7, '000000'),
(8, '000000'),
(9, '000000'),
(10, '000000'),
(11, '000000');
