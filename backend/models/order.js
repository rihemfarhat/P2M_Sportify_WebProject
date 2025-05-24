// models/order.js   ⬅️  nom de fichier en minuscules par convention
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        productId: String,
        name: String,
        quantity: Number,
        price: Number
      }
    ],
    delivery: {
      country: String,
      firstName: String,
      lastName: String,
      company: String,
      address: String,
      apartment: String,
      postalCode: String,
      city: String,
      phone: String
    },
    total: Number,
    method: { type: String, enum: ['credit', 'cash'], default: 'credit' },
    status: { type: String, enum: ['paid', 'pending'], default: 'paid' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
