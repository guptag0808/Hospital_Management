const express = require('express');


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User} =require('../model/userModel')
const userRouter = express.Router();








// Signup route
userRouter.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
		const user1=await User.findOne({email})
		if(!user1){
		return	res.send({"msg":"PLease register first"})
		}
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
});

// Login route
userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ "msg": 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, 'secretKey');
        res.status(200).json({"msg":"User Successfully login","token": token });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
});

module.exports={userRouter}
