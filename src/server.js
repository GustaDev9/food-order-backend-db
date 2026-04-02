require('dotenv').config()

const express = require('express')

const app = express()

app.use(express.json())

// rota teste
app.get('/', (req, res) => {
    return res.json({ message: 'API rodando' })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})

//rotas
const ordersController = require('./modules/orders/orders.controller')

console.log(ordersController)
app.get('/orders', ordersController.getOrders)
app.post('/orders', ordersController.createOrder)
app.post('/orders/:id/items', ordersController.addItem)
