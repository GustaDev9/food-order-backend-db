# 🍔 Food Order API

API backend para gerenciamento de pedidos de comida.

## 🚀 Tecnologias

* Node.js
* Express
* MySQL

## 📦 Funcionalidades

* Criar pedidos
* Adicionar itens ao pedido
* Listar pedidos com produtos
* Cálculo automático do total

## 🔗 Endpoints

### GET /orders

Lista todos os pedidos

### POST /orders

Cria um novo pedido

Body:
{
"user_id": 1
}

### POST /orders/:id/items

Adiciona item ao pedido

Body:
{
"product_id": 1,
"quantity": 2
}

## ⚙️ Configuração

Criar arquivo .env:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=order_system

## ▶️ Rodar projeto

npm install
node src/server.js
