const express = require("express");
const cartRouter = express.Router()
const { requireUser } = require('./utils');

const {
    getOrderByUser, createCartItem, renderCart, deleteCartItem
} = require('../db')

cartRouter.get('/', requireUser, async (req, res, next) => {
    console.log('recalling user cart', req.path);
    try {
        const order = await getOrderByUser(req.user.username);
        const cart = await renderCart(order.id);
        res.send({
            order,
            cart
        })
    } catch ({ name, message }) {
        next({ name, message })
    }
});


cartRouter.post('/:productId', requireUser, async (req, res, next) => {
    try {
        const cart = await getOrderByUser(req.user.username)
        console.log('cart', cart)
        const item = await createCartItem(req.params.productId, cart.id, 1)
        res.send({
            cart,
            item
        })
    } catch ({ name, message }) {
        next({ name, message })
    }
});

cartRouter.delete('/:productId', requireUser, async (req, res, next) => {
    console.log('hiting delete cart router')
    try {
        const cart = await getOrderByUser(req.user.username)
        const item = await deleteCartItem(req.params.productId, cart.id)
        res.send({
            cart,
            item
        })
    } catch ({ name, message }) {
        next({ name, message })
    }
});

module.exports = cartRouter;