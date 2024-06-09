-- Cria o banco de dados
CREATE DATABASE Estoque;

-- Usa o banco de dados
USE Estoque;

-- Cria a tabela de Categorias
CREATE TABLE Categorias (
    CategoriaID INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(255) NOT NULL
);

-- Cria a tabela de Fornecedores
CREATE TABLE Fornecedores (
    FornecedorID INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(255) NOT NULL,
    Contato VARCHAR(255)
);

-- Cria a tabela de Produtos
CREATE TABLE Produtos (
    ProdutoID INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(255) NOT NULL,
    Preco DECIMAL(10, 2) NOT NULL,
    Quantidade INT NOT NULL,
    CategoriaID INT,
    FornecedorID INT,
    FOREIGN KEY (CategoriaID) REFERENCES Categorias(CategoriaID),
    FOREIGN KEY (FornecedorID) REFERENCES Fornecedores(FornecedorID)
);

-- Popula a tabela de Categorias
INSERT INTO Categorias (Nome) VALUES 
('Eletrônicos'),
('Roupas'),
('Alimentos');

-- Popula a tabela de Fornecedores
INSERT INTO Fornecedores (Nome, Contato) VALUES 
('Fornecedor A', 'contato@fornecedora.com'),
('Fornecedor B', 'contato@fornecedorb.com');

-- Popula a tabela de Produtos
INSERT INTO Produtos (Nome, Preco, Quantidade, CategoriaID, FornecedorID) VALUES 
('Smartphone', 1999.99, 50, 1, 1),
('Camiseta', 29.99, 200, 2, 2),
('Refrigerante', 2.99, 500, 3, 1);

CREATE VIEW ProdutosDetalhados AS 
SELECT p.ProdutoID, p.Nome AS ProdutoNome, p.Preco, p.Quantidade, c.Nome AS CategoriaNome, f.Nome AS FornecedorNome 
FROM Produtos p 
INNER JOIN Fornecedores f USING(FornecedorID) inner join Categorias c using (CategoriaID);