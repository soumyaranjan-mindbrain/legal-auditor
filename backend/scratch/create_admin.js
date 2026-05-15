const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const User = require('../src/models/User');

const createAdmin = async () => {
    try {
        console.log('>>> Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI || process.env.DATABASE_URL);
        console.log('>>> Connected successfully.');

        const email = 'sranjan41509@gmail.com';
        const plainPassword = 'Soumya@2ac';
        const name = 'Soumya Ranjan';

        // Check if user exists
        let user = await User.findOne({ email });
        
        if (user) {
            console.log('>>> User already exists. Updating to Admin and ensuring verification...');
            user.role = 'admin';
            user.isVerified = true;
            user.name = name;
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(plainPassword, salt);
            await user.save();
            console.log('>>> User updated to ADMIN successfully.');
        } else {
            console.log('>>> Creating new Admin user...');
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(plainPassword, salt);

            user = new User({
                name,
                email,
                password: hashedPassword,
                role: 'admin',
                isVerified: true,
                status: 'Active'
            });

            await user.save();
            console.log('>>> Admin user created successfully.');
        }

        process.exit(0);
    } catch (err) {
        console.error('!!! Error creating admin:', err);
        process.exit(1);
    }
};

createAdmin();
