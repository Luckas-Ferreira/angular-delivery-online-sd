-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 28/01/2024 às 01:11
-- Versão do servidor: 10.4.28-MariaDB
-- Versão do PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `tercio_delivery`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `clientes`
--

CREATE TABLE `clientes` (
  `cliente_id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `tipo` varchar(255) NOT NULL,
  `saldo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `clientes`
--

INSERT INTO `clientes` (`cliente_id`, `nome`, `senha`, `tipo`, `saldo`) VALUES
(1, 'Noemy Roberta', '1234', 'cliente', 0);

-- --------------------------------------------------------

--
-- Estrutura para tabela `lanche`
--

CREATE TABLE `lanche` (
  `lanche_id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `valor` double NOT NULL,
  `descricao` varchar(255) NOT NULL,
  `quantDispo` int(3) NOT NULL,
  `foto` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `pedidos`
--

CREATE TABLE `pedidos` (
  `pedido_id` int(11) NOT NULL,
  `cliente_id` int(11) NOT NULL,
  FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`cliente_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `pedido_lanches`
--

CREATE TABLE `pedido_lanches` (
  `pedido_lanches_id` int(11) NOT NULL PRIMARY KEY,
  `pedido_id` int(11) NOT NULL,
  `lanche_id` int(11) NOT NULL,
  `quantDispo` int(3) NOT NULL,
  FOREIGN KEY (`lanche_id`) REFERENCES `lanche` (`lanche_id`),
  FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`pedido_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`cliente_id`);

--
-- Índices de tabela `lanche`
--
ALTER TABLE `lanche`
  ADD PRIMARY KEY (`lanche_id`);

--
-- Índices de tabela `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`pedido_id`),
  ADD UNIQUE KEY `cliente_id` (`cliente_id`);

--
-- Índices de tabela `pedido_lanches`
--
ALTER TABLE `pedido_lanches`
  ADD PRIMARY KEY (`pedido_lanches_id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `clientes`
--
ALTER TABLE `clientes`
  MODIFY `cliente_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `lanche`
--
ALTER TABLE `lanche`
  MODIFY `lanche_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `pedido_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `pedido_lanches`
--
ALTER TABLE `pedido_lanches`
  MODIFY `pedido_lanches_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
