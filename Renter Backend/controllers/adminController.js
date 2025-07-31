import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/adminModel.js';
import Owner from '../models/owner.js';

const createAdmin = async (req,res) => {

    const {email, password} = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        };

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({
            email,
            password: hashedPassword
        });

        await newAdmin.save();
        res.status(201).json({ message: 'Admin created successfully' });
        

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {

        if (!email || !password) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        };

        const admin = await Admin.findOne({ email });
        if (!admin || admin.role !== 'admin') {
            return res.status(401).json({ message: 'Invalid credentials or not an admin' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: admin._id, role: admin.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        // Set token in cookies
        res.status(200).json({ token, admin });

        res.json({ success: true, message: 'Login successful' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const owners = await Owner.find();
        res.status(200).json({ success: true, owners });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await Owner.find({ _id: id });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export { loginAdmin, getAllUsers, getUser, createAdmin };