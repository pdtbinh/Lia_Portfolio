// Connecting to database
const mongoose = require('mongoose');

async function mongooseConnect() {
    await mongoose.connect('mongodb://localhost:27017/lia');
    console.log('Database connected...');
}

// Models
const { User, joiUser } = require('../models/user');
const { Project, joiProject } = require('../models/project');
const { Like, joiLike } = require('../models/like');

// Reset database
async function clearDB() {
    const models = [User, Project, Like];
    for (const model of models) {
        await model.deleteMany({});
    }
}

// Seed different models
const seedUsers = [...Array(20).keys()].map(e => {
    const count = e.toString();
    return {
        name: `Full Name ${count}`,
        username: count,
    }
})

async function seedUser() {
    const users = [];
    seedUsers.forEach(e => {
        const user = new User(e)
        users.push(user);
    })
    for (const user of users) {
        const newUser = await User.register(user, '1');
        console.log(newUser._doc);
    }
}

async function seed() {
    // Connect
    await mongooseConnect().catch(err => console.log(err));

    // Clear
    await clearDB();

    // 1. Seed users
    await seedUser();
}

// MAIN
seed();