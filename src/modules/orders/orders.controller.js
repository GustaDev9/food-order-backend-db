const ordersService = require('./orders.service')

async function getOrders(req, res) {
    const orders = await ordersService.getOrders()
    return res.json(orders)
}

async function createOrder(req, res) {
    const { user_id } = req.body

    const order = await ordersService.createOrder(user_id)

    return res.status(201).json(order)
}

async function addItem(req, res) {
    const { id } = req.params
    const { product_id, quantity } = req.body

    await ordersService.addItem(id, product_id, quantity)

    return res.json({ message: 'Item adicionado com sucesso' })
}

module.exports = {
    getOrders,
    createOrder,
    addItem
}