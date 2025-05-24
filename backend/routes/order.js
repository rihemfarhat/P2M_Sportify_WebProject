// routes/order.js  (CommonJS)
const express = require('express');
const orderController = require('../controllers/order');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', auth, orderController.createOrder);
router.get('/:id', auth, orderController.getOrderById);
router.get('/', auth, orderController.listUserOrders);

module.exports = router;
