const db = require('../models/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required' });
    }
    try {
        const password_hash = await bcrypt.hash(password, 10);
        db.run(`INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)`, [name, email, password_hash], 
            function(err) {
            if(err){
                if(err.message.includes('UNIQUE')){
                    return res.status(400).json({message: 'Email already in use'});
                }
                return res.status(500).json({message: 'Database error', error: err.message});
            }

            res.status(201).json({
                id: this.lastID,
                name,
                email
            });
        }

        );} catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.login = async (req,res )=>{
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    db.get('SELECT * FROM users WHERE email =?', [email], async (err, user) => {
        if (err) return res.status(500).json({message: 'database error', error: err.message});
        if (!user) return res.status(400).json({message: 'Invalid email or password'});

        const match = await bcrypt.compare(password, user.password_hash);
        if(!match) return res.status(400).json({message: 'Invalid email or password'});

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES_IN}
    );

    res.json({message: 'login successful', token});
})};
