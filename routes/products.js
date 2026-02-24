const express = require('express');
const router = express.Router();
const authenticateToken  = require('../middleware/authMiddleware');
const db = require('../models/database');

router.get('/', (req, res) => {
    db.all('SELECT * FROM products', [], (err, rows) => {
        if (err) {
            return res.status(500).json({message: 'Database error', error: err.message});
        }
        res.json(rows);
    });
});

router.get('/:id', (req, res) => {
    const productId = req.params.id;
    db.get('SELECT * FROM products WHERE id = ?', [productId], (err, row) => {
        if (err) {
            return res.status(500).json({message: 'Database error', error: err.message});
        }
        if (!row) {
            return res.status(404).json({message: 'Product not found'});
        }
        res.json(row);
    });
});

router.get('/:category', (req, res) =>{
    const category = req.params.category;
    db.get('SELECT * FROM products WHERE category = ?', [category], (err, rows)=>{
        if(err){
            return res.status(500).json({message: 'Database error', error: err.message})
        }
        if(!rows){
            return res.status(404).json({message:'No products found in this category'})
        }
        res.json(rows);
    })
})

router.post('/', authenticateToken, (req, res) => {
    const {name, description, price, category, stock} = req.body;
    if (!name || !price) return res.status(400).json({message: 'Name and price are required'});

    db.run('INSERT INTO products (name, description, price, category, stock) VALUES (?, ?, ?, ?, ?)',
        [name, description, price, category, stock], function(err) {
            if (err) {
                return res.status(500).json({message: 'Database error', error: err.message});
            }
            res.status(201).json({
                id: this.lastID,
                name,
                description,
                price,
                category,
                stock
            });
        });
});

module.exports = router;
