const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const config = require('config');

// We'll export a function that accepts the Prisma client
module.exports = (prisma) => {

    // POST /api/auth/register
    router.post('/register', async (req, res) => {
        const { username, email, password } = req.body;
        try {
            const user = await prisma.user.findUnique({ where: { email } });
            if (user) {
                return res.status(400).json({ msg: 'User already exists' });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = await prisma.user.create({
                data: {
                    username,
                    email,
                    password: hashedPassword,
                },
            });

            const payload = { user: { id: newUser.id } };
            jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 3600 }, (err, token) => {
                if (err) throw err;
                res.json({ token });
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    });

    // POST /api/auth/login
    router.post('/login', async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await prisma.user.findUnique({ where: { email } });
            if (!user) {
                return res.status(400).json({ msg: 'Invalid credentials' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ msg: 'Invalid credentials' });
            }
            const payload = { user: { id: user.id } };
            jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 3600 }, (err, token) => {
                if (err) throw err;
                res.json({ token });
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    });

    return router;
};