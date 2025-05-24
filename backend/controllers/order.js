const Order = require('../models/order');  

/* Créer un ordre */
async function createOrder(req, res) {
  try {
    const order = await Order.create({ ...req.body, userId: req.user.id });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}

/* Récupérer un ordre par ID */
async function getOrderById(req, res) {
  try {
    const order = await Order.findOne({ _id: req.params.id, userId: req.user.id });
    if (!order) return res.status(404).json({ msg: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}

/* Lister les ordres de l’utilisateur connecté */
async function listUserOrders(req, res) {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort('-createdAt');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}

module.exports = { createOrder, getOrderById, listUserOrders };
