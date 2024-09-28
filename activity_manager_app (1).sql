-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-04-2021 a las 07:14:51
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `activity_manager_app`
--
CREATE DATABASE IF NOT EXISTS `activity_manager_app` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `activity_manager_app`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `activity`
--

CREATE TABLE `activity` (
  `id_activity` int(11) NOT NULL,
  `name_activity` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `Date_delivery` datetime NOT NULL,
  `Date_create` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `weighint` int(11) NOT NULL,
  `Status` tinyint(4) NOT NULL,
  `fkCodeSubjectCodeSubjects` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `activity`
--

INSERT INTO `activity` (`id_activity`, `name_activity`, `description`, `Date_delivery`, `Date_create`, `weighint`, `Status`, `fkCodeSubjectCodeSubjects`) VALUES
(1, 'prueba 1', 'sdfshfdjkh sdfkjds kf hksdh fsdjhfks fhdsk fhdshfsdhf sdhfksdhf kjhsdfkj sdkhsdf skdjhfksd fksdjfh kdsjfh sdfkdshf sdkfjhsd fkshdkfj', '2021-04-24 00:01:16', '2020-12-15 00:21:32.615972', 100, 0, 'bCqEsxaApS'),
(2, 'prueba 1', 'numero z', '2020-12-15 00:23:20', '2020-12-15 00:23:20.576436', 100, 1, 'bCqEsxaApS'),
(3, 'prueba 1', 'numero z', '2020-12-15 00:24:23', '2020-12-15 00:24:23.881363', 20, 1, 'bCqEsxaApS'),
(4, 'prueba 2', 'numero z', '2020-12-15 00:24:28', '2020-12-15 00:24:28.629227', 20, 1, 'bCqEsxaApS'),
(8, 'prueba 3', 'numero q', '2020-12-16 00:38:03', '2020-12-16 00:38:03.490140', 20, 1, 'bCqEsxaApS'),
(9, 'prueba 4', 'numero reales', '2020-12-16 00:38:12', '2020-12-16 00:38:12.271856', 20, 1, 'bCqEsxaApS'),
(10, 'prueba 4', 'numero reales', '2020-12-16 00:50:24', '2020-12-16 00:50:24.171718', 20, 1, 'RDGCwtpjsi'),
(11, 'taller', 'numero reales', '2020-12-16 00:50:43', '2020-12-16 00:50:43.357944', 20, 1, 'RDGCwtpjsi'),
(12, 'taller', 'numero reales', '2020-12-16 09:33:46', '2020-12-16 09:33:46.901633', 20, 1, 'RDGCwtpjsi'),
(13, 'taller', 'numero reales', '2020-12-16 09:40:50', '2020-12-16 09:40:51.006794', 20, 1, 'RDGCwtpjsi'),
(14, 'Prueba 12345', 'numero reales', '2020-12-21 20:40:56', '2020-12-21 20:40:56.590004', 20, 1, 'BThE5E7vHY'),
(15, 'taller prueba error', 'prueba 3443', '2021-04-13 09:10:58', '2021-04-13 09:10:58.262074', 20, 1, 'VQ77E9kDVq'),
(16, 'taller prueba error 1234523423', 'prueba 3443', '2021-04-13 09:11:07', '2021-04-13 09:11:07.845261', 20, 1, 'VQ77E9kDVq'),
(17, 'taller prueba error 1234523423', 'prueba 3443', '2021-04-13 09:12:23', '2021-04-13 09:12:23.516726', 20, 1, 'VQ77E9kDVq'),
(18, 'taller', 'numero reales', '2021-04-21 09:59:57', '2021-04-21 09:59:57.674078', 20, 1, 'RDGCwtpjsi'),
(19, 'taller', 'numero reales', '2021-04-21 10:00:07', '2021-04-21 10:00:07.878050', 20, 1, 'RDGCwtpjsi'),
(20, 'taller', 'numero reales 12344', '2021-04-21 10:00:42', '2021-04-21 10:00:42.370557', 20, 1, 'RDGCwtpjsi'),
(21, 'taller', 'numero reales 12344', '2021-12-01 00:00:00', '2021-04-21 10:01:55.397573', 20, 0, 'RDGCwtpjsi'),
(22, 'global taller', 'numero reales 12344', '2021-12-01 00:00:00', '2021-04-22 23:58:25.234432', 20, 1, 'RDGCwtpjsi'),
(23, 'global taller', 'numero reales 12344', '2021-12-01 00:00:00', '2021-04-22 23:58:26.908124', 20, 1, 'RDGCwtpjsi'),
(24, 'global taller', 'numero reales 12344', '2021-04-22 00:00:00', '2021-04-22 23:58:51.002292', 20, 1, 'RDGCwtpjsi'),
(25, 'global taller', 'numero reales sdfsdf12344', '2021-04-21 00:00:00', '2021-04-22 23:59:01.508341', 20, 1, 'RDGCwtpjsi'),
(26, 'global taller', 'numero reales 12344', '2021-04-23 00:00:00', '2021-04-22 23:59:05.975161', 20, 1, 'RDGCwtpjsi');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `activity_sinc_student`
--

CREATE TABLE `activity_sinc_student` (
  `id_activity_sinc_student` int(11) NOT NULL,
  `weighint` int(11) NOT NULL,
  `fkIdStudentIdStudent` int(11) DEFAULT NULL,
  `fkIdActivityIdActivity` int(11) DEFAULT NULL,
  `status_verific` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `activity_sinc_student`
--

INSERT INTO `activity_sinc_student` (`id_activity_sinc_student`, `weighint`, `fkIdStudentIdStudent`, `fkIdActivityIdActivity`, `status_verific`) VALUES
(1, 0, 3, 21, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `activity__send`
--

CREATE TABLE `activity__send` (
  `id_activity_send` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `url_server` varchar(255) NOT NULL,
  `weighint` int(11) NOT NULL,
  `fkCodeSubjectCodeSubjects` varchar(255) DEFAULT NULL,
  `fkActivityIdActivity` int(11) DEFAULT NULL,
  `fkStudentIdSubjectSincStudent` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `activity__send`
--

INSERT INTO `activity__send` (`id_activity_send`, `description`, `url_server`, `weighint`, `fkCodeSubjectCodeSubjects`, `fkActivityIdActivity`, `fkStudentIdSubjectSincStudent`) VALUES
(70, 'prueba 2 del corte 3', 'D:/Proyectos/Gestor de actividades/archivos_file/FORMATO PROPUESTA DE TRABAJO DE GRADO.docx', 0, 'RDGCwtpjsi', 21, 3),
(71, 'prueba 2 del corte 3', 'D:/Proyectos/Gestor de actividades/archivos_file/FORMATO PROPUESTA DE TRABAJO DE GRADO.(ZDWkkAV6IN).docx', 0, 'RDGCwtpjsi', 21, 3),
(72, 'prueba 2 del corte 3', 'D:/Proyectos/Gestor de actividades/archivos_file/FORMATO PROPUESTA DE TRABAJO DE GRADO.(0G6tSx2n7l).docx', 0, 'RDGCwtpjsi', 21, 3),
(73, 'prueba 2 del corte 3', 'D:/Proyectos/Gestor de actividades/archivos_file/FORMATO PROPUESTA DE TRABAJO DE GRADO.(uRLqSxlndJ).docx', 0, 'RDGCwtpjsi', 21, 3),
(74, 'prueba 2 del corte 3', 'D:/Proyectos/Gestor de actividades/archivos_file/FORMATO PROPUESTA DE TRABAJO DE GRADO.(V4Rq8mrUi3).docx', 0, 'RDGCwtpjsi', 21, 3),
(75, 'prueba 2 del corte 3', 'D:/Proyectos/Gestor de actividades/archivos_file/FORMATO PROPUESTA DE TRABAJO DE GRADO.(aBl1o6w83b).docx', 0, 'RDGCwtpjsi', 21, 3),
(76, 'prueba 2 del corte 3', 'D:/Proyectos/Gestor de actividades/archivos_file/FORMATO PROPUESTA DE TRABAJO DE GRADO.(MacwHh9f0M).docx', 0, 'RDGCwtpjsi', 21, 3),
(77, 'prueba 2 del corte 3', 'D:/Proyectos/Gestor de actividades/archivos_file/FORMATO PROPUESTA DE TRABAJO DE GRADO.(0mYK1LkD7t).docx', 0, 'RDGCwtpjsi', 21, 3),
(78, 'prueba 2 del corte 3', 'D:/Proyectos/Gestor de actividades/archivos_file/FORMATO PROPUESTA DE TRABAJO DE GRADO.(CtZFJhQ8Qe).docx', 0, 'RDGCwtpjsi', 21, 3),
(79, 'prueba 2 del corte 3', 'D:/Proyectos/Gestor de actividades/archivos_file/FORMATO PROPUESTA DE TRABAJO DE GRADO.(wZAYqklHcF).docx', 0, 'RDGCwtpjsi', 21, 3),
(80, 'prueba 2 del corte 3', 'D:/Proyectos/Gestor de actividades/archivos_file/FORMATO PROPUESTA DE TRABAJO DE GRADO.(YQnV2celUW).docx', 0, 'RDGCwtpjsi', 21, 3),
(81, 'prueba 2 del corte 3', 'D:/Proyectos/Gestor de actividades/archivos_file/FORMATO PROPUESTA DE TRABAJO DE GRADO.(agnuhcoOUj).docx', 0, 'RDGCwtpjsi', 21, 3),
(82, 'prueba 2 del corte 3', 'D:/Proyectos/Gestor de actividades/archivos_file/FORMATO PROPUESTA DE TRABAJO DE GRADO.(rH7Veun0Zp).docx', 0, 'RDGCwtpjsi', 21, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `student`
--

CREATE TABLE `student` (
  `id_student` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `frist_name` varchar(255) NOT NULL,
  `second_name` varchar(255) NOT NULL,
  `frist_surname` varchar(255) NOT NULL,
  `second_surname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `createAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `role` varchar(255) NOT NULL,
  `updateAt` datetime(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `student`
--

INSERT INTO `student` (`id_student`, `username`, `password`, `frist_name`, `second_name`, `frist_surname`, `second_surname`, `email`, `createAt`, `role`, `updateAt`) VALUES
(1, 'jhonnerg', '$2a$10$uI8o03GHHgG4y8Ijf/1Cb.eCmWkhk/jD7QVnUIvhh8DENWf54wLti', 'jhonner', 'gregorio', 'gonzalez', 'cordova', 'gonzalezjhonner@hotmail.com', '2020-12-14 21:52:20.305584', 'student', '2021-04-20 19:45:58.000000'),
(3, 'jhonnerg2', '$2a$10$LFK6xag.Pd0XrkBxbRjS1exVhw2dauCcsz4IqogIhODYookK/aud.', 'jhonner', 'gregorio', 'gonzalez', 'cordova', 'gonzalezjhonn2er@hotmail.com', '2020-12-15 16:12:30.092946', 'student', '2020-12-15 16:12:30.092946'),
(4, 'fsdfsd', '$2a$10$6GfqmCBPYt/ejW0Qkj9/j.QlVdBBYn6nVmFTuFpMmS3LoRMGFgHpW', 'dfsdsfsd', 'fsdfsdf', 'sdfsdf', 'fsdf', 'dfsdfsdf@dsffsd.com', '2021-04-20 01:39:30.446334', 'student', '2021-04-20 01:39:30.446334'),
(5, 'sdfsdfsdf', '$2a$10$OszFud03BJjPwybyc79pLOsuONzMY/vjLa8f8.DmPElRWgY1ScNjy', 'sdfsdfsdf', 'sdfsdfsd', 'fsddsfsdf', 'fsdfsdf', 'dsfdsfsdf2dfsdf@dfsd.com', '2021-04-20 01:40:32.219363', 'student', '2021-04-20 01:40:32.219363'),
(6, 'gfdgdfg', '$2a$10$VnLyfF9XkEpnpV1EYAbCt.C7AVN4mCsJkvVatEgWDqSf1N94f1/ne', 'dfgdfgdf', 'gdfgdfgdf', 'gdfgdfg', 'dfgdfg', 'ttryrt@dffbhdj.cd', '2021-04-20 07:49:53.235890', 'student', '2021-04-20 07:49:53.235890'),
(8, 'fgdfgdf', '$2a$10$.eLqcPaaMgpvIHVpJ2DcvekNSZRRc7bzXsMXYck21P7lP8AAQUbuW', 'gdfgdf', 'gdfgdfgdf', 'gdfgdfg', 'gdfgdfgd', 'dfgdfgdf@fkfkjf.pc', '2021-04-20 08:14:43.936871', 'student', '2021-04-20 08:14:43.936871'),
(9, 'dsfsdfs', '$2a$10$22eJvzpcil/d3V2gmR1L.uOFxOm0NZmMPoLQDVlWcR3w3krmvpXWC', 'fsdfsdf', 'sdfsdf', 'sdfsdf', 'fsdfsdf', 'sdssds@jss.com', '2021-04-20 08:19:42.891942', 'student', '2021-04-20 08:19:42.891942'),
(11, 'ertert', '$2a$10$sZniHYkK.01xcGpqIP2arOQ8FbXDrAl/xezavGuiGzkM1aOidwjIa', 'dreter', 'tertert', 'ertert', 'ertert', 'fdsgdfgdfgdfg@fjf.com', '2021-04-20 08:31:02.363957', 'student', '2021-04-20 08:31:02.363957'),
(12, 'sdfsdfsd', '$2a$10$wt7yBvpmKefmzNHEz6ThF.8HafgdddMIkY8mAnZwL3LtATVeF/RUG', 'sdfsdf', 'fsdfsdf', 'sdfsdfsd', 'fsdfsdf', 'sadasda@jdjd.com', '2021-04-20 08:33:02.469714', 'student', '2021-04-20 08:33:02.469714'),
(13, 'werewr', '$2a$10$1/iuLCHNREVZ6z2l0Or3bOHKeKPSY9cyslafieEccSrrlCqPgwixa', 'sdfsdfsd', 'fsdfsdf', 'dsfsdfs', 'dfsdf', 'werwe@fdsfsdf.cd', '2021-04-20 08:33:55.527229', 'student', '2021-04-20 08:33:55.527229'),
(15, 'sdfsdfsdfweqwe', '$2a$10$fPC5dyDetEInUeuE5DFZzO3n/3pm6uk7MAsVAtp4a6Y9AARaIaUne', 'dsfsdfs', 'dfsdfsdf', 'dsfdsfsd', 'sdfsd', 'fdsf@dsfjhsd.cd', '2021-04-20 08:35:25.706625', 'student', '2021-04-20 08:35:25.706625'),
(16, 'dfsdfsdf', '$2a$10$npER/VXYpbOUS1vBE56PzO8PyvinBJ/EU3TSOLLOTeHOKMG.MNIwu', 'fsdfsdf', 'sdfdsf', 'dsfsdf', 'sdfsdf', 'sdfsdf@fdf.vcv', '2021-04-20 08:36:22.466102', 'student', '2021-04-20 08:36:22.466102'),
(18, 'sdfsdfsdfwerwer', '$2a$10$jYNeH90WT3IRWUFCb3dOBuFq.aQgq8fsiTdIIsqzt75fVRedo0cj6', 'sdfsdfs', 'fsdfsd', 'sdfdsf', 'sdf', 'dsfsdfsd@dsfsd.cd', '2021-04-20 08:37:06.576323', 'student', '2021-04-20 08:37:06.576323'),
(20, 'rewrerwere3', '$2a$10$/c6sY.7Mt6g6L.1e2JZsN.sh18MaAwA/pw2fxlXCbLpMhU9zFHhvK', 'erwerwer', 'werwerw', 'erwer', 'werwer', 'rwer@ff.vcx', '2021-04-20 08:38:16.659955', 'student', '2021-04-20 08:38:16.659955'),
(22, 'sdfsdfsdfwfe', '$2a$10$MZSyDNF.YSF23XRKF41cueMvxxXwuS6fEJtYmngdJIgSt1Xqsb.1C', 'fdsfsd', 'sdfsdf', 'dsfsdf', 'fsdf', 'dfsdf@hfhf.com', '2021-04-20 08:39:44.870007', 'student', '2021-04-20 08:39:44.870007'),
(23, 'sadasdasd', '$2a$10$gSd7as1.mXU7uHaM5SkkZ.Oswafi72sf97.hluWsTtGjgi2RyiEry', 'asdasdas', 'dasdsad', 'sadasd', 'sadasd', 'asdasdasdassda@zhjfdsfs.om', '2021-04-20 08:56:28.817016', 'student', '2021-04-20 08:56:28.817016'),
(24, 'asdasdasd', '$2a$10$hVTHb/WPzAlNiIbdFkkreephsWlMd7WPVWM4XcJCUspMiIlNLjfke', 'adasda', 'dasdasd', 'asdasd', 'asdasd', 'dddd@ddd.com', '2021-04-20 10:49:24.546291', 'student', '2021-04-20 10:49:24.546291'),
(25, 'jkhhkgdfgdf', '$2a$10$4S0wXCA9ublgSK6YUOVgveMGzC8O5eoln0ENPrC3tO/RAWzYjuxjG', 'hgk', 'kkkkkkkkkkkkkkkkhj', 'ghk', 'khgk', 'jjjjj@ddd.com', '2021-04-20 10:50:46.437789', 'student', '2021-04-20 10:50:46.437789'),
(26, 'dsfsdf', '$2a$10$lz7tfJoS09hmLIzWKcyYRO0ouAfuFfVqjKdImM4vRvUri81aWiM5K', 'dfsdfsdf', 'dsfsdfsd', 'fsdfsdf', 'fsdfsdf', 'ffff@ddd.com', '2021-04-20 11:05:38.531223', 'student', '2021-04-20 11:05:38.531223'),
(28, 'sdfsdfsdfwewqe', '$2a$10$NE3IdPSgy8R91vF.4QbFSeRYaphRAlX.9E5WppUjbLe5uzLXh6Nym', 'sdfsdfsd', 'fsdfsd', 'sdfsdf', 'sdfsdfds', 'ffff@ddddcc.com', '2021-04-20 11:06:30.478980', 'student', '2021-04-20 11:06:30.478980'),
(29, 'hgnmdghmcsze', '$2a$10$v5fIwfN339kBjxvZe91sbuYuIngOt2D..EQ911g0Qx.YJxK8z3hBS', 'fsdfsdfsd', 'fsdfsdfsdf', 'sdfsdfsdf', 'sdfsdfsdf', 'ffff@dhhd.com', '2021-04-20 11:07:12.208331', 'student', '2021-04-20 11:07:12.208331');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subjects`
--

CREATE TABLE `subjects` (
  `name_subjects` varchar(255) NOT NULL,
  `section_subjects` varchar(255) NOT NULL,
  `turn` varchar(255) NOT NULL,
  `code_subjects` varchar(255) NOT NULL,
  `fkIdTeacherIdTeacher` int(11) DEFAULT NULL,
  `description_subjects` varchar(255) NOT NULL,
  `bool_deleted` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `subjects`
--

INSERT INTO `subjects` (`name_subjects`, `section_subjects`, `turn`, `code_subjects`, `fkIdTeacherIdTeacher`, `description_subjects`, `bool_deleted`) VALUES
('Seminario', '1010', 'Mañana', '3uU1rXiXeL', 1, '', 0),
('Seminario', '1010', 'Mañana', '5Br5BC8gol', 3, '', 0),
('Matematica', '1010', 'Mañana', 'bCqEsxaApS', 1, 'adsfsdkjgflkjsahhalkjghjk kljhgkhgakhfakljghfkljghlkjfahgkjhflkjghlkjaf hgkljfahgklj haflkjghlkfajhgjkhflkgjhalfkdjghlkfjdhglkjfdhlkgjhfdlkshglkjfdshglkjdfshgkjhdfslkjghlkdfjhglkjdfhgkljdsf', 0),
('ingenieria del software', '1010', 'Mañana', 'BThE5E7vHY', 1, 'fdgsdfkhgkshgkjgahflakdsghlkfahglkjhfdagkjhflkghlkjfdhglkjfdhgkljdfhslgkjhsdflkjghlkdsfjhglkdfhsgkljhdfslkghlkdfsjhglkjdfhsglkjhdflkgjhdflkjghlkfdjhglkjfdhglkfdhsgkljhflkdjghklfdjhgkljfdhgkljfdhsklghfdlksjghkljdfhgkljhdsflkgjhdfslkjghkljdfshgkljdsfhlkgj', 0),
('Programacion', '1010', 'Mañana', 'c88kavqsQB', 3, '', 0),
('Estadistica', '1010', 'Mañana', 'Ljom32cDSx', 1, '', 0),
('Estadistica', '1010', 'Mañana', 'MGHqc2pW03', 3, '', 0),
('Matematica', '1010', 'Mañana', 'pYc8I3unJx', 3, '', 0),
('ingenieria del software', '1010', 'Mañana', 'qke1HkbAQI', 3, '', 0),
('Programacion', '1010', 'Mañana', 'RDGCwtpjsi', 1, '', 0),
('Contabilidad', '1010', 'Mañana', 'rs9hNwS3H7', 1, '', 0),
('Contabilidad', '1010', 'Mañana', 'VQ77E9kDVq', 3, '', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subject_sinc_student`
--

CREATE TABLE `subject_sinc_student` (
  `id_subject_sinc_student` int(11) NOT NULL,
  `fkIdStudentIdStudent` int(11) DEFAULT NULL,
  `fkCodeSubjectsCodeSubjects` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `subject_sinc_student`
--

INSERT INTO `subject_sinc_student` (`id_subject_sinc_student`, `fkIdStudentIdStudent`, `fkCodeSubjectsCodeSubjects`) VALUES
(1, 1, 'BThE5E7vHY'),
(2, 1, 'qke1HkbAQI'),
(3, 3, 'bCqEsxaApS'),
(4, 3, 'BThE5E7vHY'),
(5, 3, 'RDGCwtpjsi'),
(6, 3, 'VQ77E9kDVq'),
(7, 3, '3uU1rXiXeL'),
(8, 3, '5Br5BC8gol');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `teacher`
--

CREATE TABLE `teacher` (
  `id_teacher` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `frist_name` varchar(255) NOT NULL,
  `second_name` varchar(255) NOT NULL,
  `frist_surname` varchar(255) NOT NULL,
  `second_surname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `createAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `role` varchar(255) NOT NULL,
  `updateAt` datetime(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `teacher`
--

INSERT INTO `teacher` (`id_teacher`, `username`, `password`, `frist_name`, `second_name`, `frist_surname`, `second_surname`, `email`, `createAt`, `role`, `updateAt`) VALUES
(1, 'ProfesorJhonnerg', '$2a$10$W43vvnA7KAdCX4OKF.5Fmu2WJYeGDpBLrX/rFflbJaUxRfM4ixjSm', 'jhonner', 'gregorio', 'gonzalez', 'cordova', 'Gonzalezjhonner@hotmail.com', '2020-12-14 21:52:55.492880', 'teacher', '2021-04-20 20:23:32.000000'),
(3, 'ProfesorJhonnerg2', '$2a$10$.d48BFkDWHZzGFWA1WWoD.uRN4rYzXu4nMoW//ZJTUqZy2u5j6vQa', 'jhonner', 'gregorio', 'gonzalez', 'cordova', 'elprangregorio_1997@hotmail.com', '2020-12-14 21:56:37.015114', 'teacher', '2020-12-14 21:56:37.015114'),
(5, 'ProfesorJhonnerg3', '$2a$10$uBkQJjqt/KQjmKzVUfgUe.xTgRvoqPQYbbnqMvOk05Gu2j4zX76CO', 'jhonner', 'gregorio', 'gonzalez', 'cordova', 'elprangregorio_19972@hotmail.com', '2020-12-16 09:32:46.871404', 'teacher', '2020-12-16 09:32:46.871404'),
(7, 'sdfsdfsdf', '$2a$10$k.a3Vd3WF//RJM5M4FlpvOy9XDKwLLa1Mczwy6mJOy9hatWKtq6xi', 'dfsdfsdfsd', 'fdsfsdf', 'sdfsdf', 'sdfsdfsdf', 'dddddddd@ddd.cm', '2021-04-20 20:05:26.500358', 'teacher', '2021-04-20 20:05:26.500358'),
(8, 'dfdfdfdf', '$2a$10$uHz97wcukT7Wn7B2JUUAn..gYQKdWDJ1berl/1DFu0tcVf8X0JFn.', 'ffff', 'fff', 'fff', 'fff', 'ffff@d.vv', '2021-04-20 20:06:58.934407', 'teacher', '2021-04-20 20:06:58.934407'),
(9, 'jhonnerg', '$2a$10$9UT1buqRfwjWn2egIkKs0.WGWQsoQheb4Cs5E2QVhoROp0bPPZTIq', 'sdfsdfsdf', 'sdfsdfds', 'dsfsdfsd', 'fsdfsdf', 'gonzalezjhonner97@gmail.com', '2021-04-20 21:51:38.608896', 'teacher', '2021-04-20 21:51:38.608896'),
(10, 'asdasd', '$2a$10$L1o4svc4LxHvqHhHB858mujcLI/Zz5eldc74/cY/62KcMa35uDMuu', 'asdasd', 'dasd', 'asdasd', 'asdasd', 'asdasdasd@dfsdfljk.csdf', '2021-04-21 19:39:29.361874', 'teacher', '2021-04-21 19:39:29.361874');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `token_black_list`
--

CREATE TABLE `token_black_list` (
  `id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `DateExpired` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `token_black_list`
--

INSERT INTO `token_black_list` (`id`, `token`, `DateExpired`) VALUES
(1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Impob25uZXJnIiwiaWF0IjoxNjE4OTYxODQ2LCJleHAiOjE2MTg5NjI0NDZ9.tVJXlxVeL69NpplCHPOklD1BmJ-LJKQZtWWFrMEe4Os', '1618962446'),
(2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlByb2Zlc29ySmhvbm5lcmciLCJpYXQiOjE2MTg5NjQ0NzYsImV4cCI6MTYxODk2NTA3Nn0.qj8LeYzsA7KgaK08Ugpklb00h4Mqn1WWKw89dReemn0', '1618965076');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`id_activity`),
  ADD KEY `FK_cebc32173ef787ebace53b549d9` (`fkCodeSubjectCodeSubjects`);

--
-- Indices de la tabla `activity_sinc_student`
--
ALTER TABLE `activity_sinc_student`
  ADD PRIMARY KEY (`id_activity_sinc_student`),
  ADD KEY `FK_7a9c690bbdffb5e3d9ba1bebfa8` (`fkIdStudentIdStudent`),
  ADD KEY `FK_7088b50a0d0421c840a51b68552` (`fkIdActivityIdActivity`);

--
-- Indices de la tabla `activity__send`
--
ALTER TABLE `activity__send`
  ADD PRIMARY KEY (`id_activity_send`),
  ADD UNIQUE KEY `IDX_4acb41ef8a333d3b45d0c805be` (`url_server`),
  ADD KEY `FK_45ff19b379bec9b17958483cc3d` (`fkCodeSubjectCodeSubjects`),
  ADD KEY `FK_3058d1b40d944de937b784dbcd9` (`fkActivityIdActivity`),
  ADD KEY `FK_faee7a1d09587eac35947dbe179` (`fkStudentIdSubjectSincStudent`);

--
-- Indices de la tabla `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id_student`),
  ADD UNIQUE KEY `IDX_a56c051c91dbe1068ad683f536` (`email`),
  ADD UNIQUE KEY `IDX_cdf9742519b09580df0bc13cb1` (`username`);

--
-- Indices de la tabla `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`code_subjects`),
  ADD UNIQUE KEY `IDX_3fc5f85bceee360940618020fd` (`code_subjects`),
  ADD KEY `FK_9c2a903604ed953cedde4ec7385` (`fkIdTeacherIdTeacher`);

--
-- Indices de la tabla `subject_sinc_student`
--
ALTER TABLE `subject_sinc_student`
  ADD PRIMARY KEY (`id_subject_sinc_student`),
  ADD KEY `FK_777559377ced8b35e65615244be` (`fkIdStudentIdStudent`),
  ADD KEY `FK_c44e0be72b3b95f291c03009ef9` (`fkCodeSubjectsCodeSubjects`);

--
-- Indices de la tabla `teacher`
--
ALTER TABLE `teacher`
  ADD PRIMARY KEY (`id_teacher`),
  ADD UNIQUE KEY `IDX_00634394dce7677d531749ed8e` (`email`),
  ADD UNIQUE KEY `IDX_76fd0cda3fc6719d3109237c72` (`username`);

--
-- Indices de la tabla `token_black_list`
--
ALTER TABLE `token_black_list`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_fb38537734b30c572cadbf8d27` (`token`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `activity`
--
ALTER TABLE `activity`
  MODIFY `id_activity` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `activity_sinc_student`
--
ALTER TABLE `activity_sinc_student`
  MODIFY `id_activity_sinc_student` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `activity__send`
--
ALTER TABLE `activity__send`
  MODIFY `id_activity_send` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT de la tabla `student`
--
ALTER TABLE `student`
  MODIFY `id_student` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `subject_sinc_student`
--
ALTER TABLE `subject_sinc_student`
  MODIFY `id_subject_sinc_student` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `teacher`
--
ALTER TABLE `teacher`
  MODIFY `id_teacher` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `token_black_list`
--
ALTER TABLE `token_black_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `activity`
--
ALTER TABLE `activity`
  ADD CONSTRAINT `FK_cebc32173ef787ebace53b549d9` FOREIGN KEY (`fkCodeSubjectCodeSubjects`) REFERENCES `subjects` (`code_subjects`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `activity_sinc_student`
--
ALTER TABLE `activity_sinc_student`
  ADD CONSTRAINT `FK_7088b50a0d0421c840a51b68552` FOREIGN KEY (`fkIdActivityIdActivity`) REFERENCES `activity` (`id_activity`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_7a9c690bbdffb5e3d9ba1bebfa8` FOREIGN KEY (`fkIdStudentIdStudent`) REFERENCES `student` (`id_student`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `activity__send`
--
ALTER TABLE `activity__send`
  ADD CONSTRAINT `FK_3058d1b40d944de937b784dbcd9` FOREIGN KEY (`fkActivityIdActivity`) REFERENCES `activity` (`id_activity`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_45ff19b379bec9b17958483cc3d` FOREIGN KEY (`fkCodeSubjectCodeSubjects`) REFERENCES `subjects` (`code_subjects`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_faee7a1d09587eac35947dbe179` FOREIGN KEY (`fkStudentIdSubjectSincStudent`) REFERENCES `subject_sinc_student` (`id_subject_sinc_student`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `subjects`
--
ALTER TABLE `subjects`
  ADD CONSTRAINT `FK_9c2a903604ed953cedde4ec7385` FOREIGN KEY (`fkIdTeacherIdTeacher`) REFERENCES `teacher` (`id_teacher`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `subject_sinc_student`
--
ALTER TABLE `subject_sinc_student`
  ADD CONSTRAINT `FK_777559377ced8b35e65615244be` FOREIGN KEY (`fkIdStudentIdStudent`) REFERENCES `student` (`id_student`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_c44e0be72b3b95f291c03009ef9` FOREIGN KEY (`fkCodeSubjectsCodeSubjects`) REFERENCES `subjects` (`code_subjects`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
