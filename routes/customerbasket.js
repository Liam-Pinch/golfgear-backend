const express = require('express');
const router = express.Router();
const db = require('../Models/database');
const authenticateToken = require('../middleware/authMiddleware');

// GET basket items
router.get('/', authenticateToken, (req, res) => {
    
    const userId = req.user.id;

    const query = `SELECT 
    b.id,
    b.quantity,
    b.product_id,
    p.name,
    p.price
    FROM baskets b
    INNER JOIN products p ON b.product_id = p.id
    WHERE b.user_id = ?`;

    db.all(query, [userId], (err, rows) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err.message });
        res.json(rows);
    });
});

// POST add/update basket item
router.post('/', authenticateToken, (req, res) => {
    const userId = req.user.id;
    const { product_id, quantity } = req.body;
    console.log("Body:", req.body);
    console.log("userId:", userId);
    if (!product_id || !quantity) return res.status(400).json({ message: 'Product ID and Quantity are required' });


    db.get('SELECT * FROM baskets WHERE user_id = ? AND product_id = ?', [userId, product_id], (err, row) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err.message });

        if (row) {
            const newQty = row.quantity + quantity;
            db.run('UPDATE baskets SET quantity = ? WHERE id = ?', [newQty, row.id], function(err) {
                if (err) return res.status(500).json({ message: 'Database error', error: err.message });
                res.json({ message: 'Basket updated', basket: { id: row.id, user_id: userId, product_id, quantity: newQty } });
            });
        } else {
            db.run(
                'INSERT INTO baskets (user_id, product_id, quantity) VALUES (?, ?, ?)',
                [userId, product_id, quantity],
                function(err) {
                    if (err) return res.status(500).json({ message: 'Database error Insert', error: err.message });
                    res.status(201).json({
                        message: 'Product added to basket',
                        basket: { id: this.lastID, user_id: userId, product_id, quantity }
                    });
                }
            );
        }
    });
}); 

// DELETE basket item
router.delete('/:id', authenticateToken, (req, res) => {
    const userId = req.user.id;
    const basketId = req.params.id;

    db.get('SELECT * FROM baskets WHERE id = ? AND user_id = ?', [basketId, userId], (err, row) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err.message });
        if (!row) return res.status(404).json({ message: 'Basket item not found' });

        db.run('DELETE FROM baskets WHERE id = ?', [basketId], function(err) {
            if (err) return res.status(500).json({ message: 'Database error', error: err.message });
            res.json({ message: 'Basket item removed' });
        });
    });
});

module.exports = router;
