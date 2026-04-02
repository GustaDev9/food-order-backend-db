const connection = require('../../database/connection')

async function getOrders() {
    const [rows] = await connection.query(`
        SELECT 
            o.id AS order_id,
            u.name AS user,
            p.name AS product,
            oi.quantity,
            oi.unit_price
        FROM orders o
        JOIN users u ON o.user_id = u.id
        JOIN order_items oi ON o.id = oi.order_id
        JOIN products p ON oi.product_id = p.id
        ORDER BY o.id
    `)

    return rows
}

async function createOrder(user_id) {
    const [result] = await connection.query(
        'INSERT INTO orders (user_id, status) VALUES (?, ?)',
        [user_id, 'pending']
    )

    return {
        id: result.insertId,
        user_id
    }
}

async function createOrder(req, res) {
    const { user_id } = req.body

    const order = await ordersService.createOrder(user_id)

    return res.status(201).json(order)
}

async function addItem(order_id, product_id, quantity) {

    const [existing] = await connection.query(
        'SELECT * FROM order_items WHERE order_id = ? AND product_id = ?',
        [order_id, product_id]
    )

    if (existing.length > 0) {
        await connection.query(
            'UPDATE order_items SET quantity = quantity + ? WHERE order_id = ? AND product_id = ?',
            [quantity, order_id, product_id]
        )
    } else {
        const [[product]] = await connection.query(
            'SELECT price FROM products WHERE id = ?',
            [product_id]
        )

        await connection.query(
            'INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)',
            [order_id, product_id, quantity, product.price]
        )
    }

    await connection.query(`
        UPDATE orders
        SET total = (
            SELECT SUM(quantity * unit_price)
            FROM order_items
            WHERE order_id = ?
        )
        WHERE id = ?
    `, [order_id, order_id])
}

module.exports = {
    getOrders,
    createOrder,
    addItem
}

