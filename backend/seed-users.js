const { MongoClient } = require('mongodb');
const readline = require('readline');

// MongoDB connection string - update this to match your setup
const MONGODB_URI = 'mongodb://localhost:27017/aws-lambda-app';

const names = [
    'John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson', 'David Brown',
    'Emily Davis', 'Chris Miller', 'Lisa Anderson', 'Tom Taylor', 'Amy White',
    'James Wilson', 'Maria Garcia', 'Robert Martinez', 'Jennifer Lopez', 'William Rodriguez',
    'Linda Gonzalez', 'Richard Perez', 'Patricia Torres', 'Joseph Lee', 'Barbara Clark'
];

const bios = [
    'Software Developer passionate about clean code',
    'UX Designer focused on user experience',
    'Product Manager with 5+ years experience',
    'Data Scientist working with ML algorithms',
    'DevOps Engineer specializing in cloud infrastructure',
    'Frontend Developer with React expertise',
    'Backend Developer working with Node.js',
    'QA Engineer ensuring software quality',
    'Project Manager leading agile teams',
    'Technical Writer creating documentation'
];

function generateRandomUser(index) {
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomBio = bios[Math.floor(Math.random() * bios.length)];
    const randomAge = Math.floor(Math.random() * 50) + 18; // 18-67 years old
    const isActive = Math.random() > 0.2; // 80% chance of being active

    return {
        name: randomName,
        email: `user${index + 1}@yopmail.com`,
        age: randomAge,
        bio: randomBio,
        isActive,
        createdAt: new Date(),
        updatedAt: new Date()
    };
}

function askQuestion(rl, question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            const num = parseInt(answer);
            resolve(isNaN(num) ? 0 : num);
        });
    });
}

async function seedUsers() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log('\n🌱 User Seeder');
    console.log('==============\n');

    const maxUsers = 200;
    console.log(`⚠️  Warning: Maximum ${maxUsers} users can be seeded in one run.\n`);

    const count = await askQuestion(rl, `How many users do you want to seed? (1-${maxUsers}): `);
    rl.close();

    if (count <= 0 || count > maxUsers) {
        console.log(`❌ Invalid number. Please enter a number between 1 and ${maxUsers}.`);
        return;
    }

    console.log(`\n🚀 Seeding ${count} users...\n`);

    let client;
    try {
        client = new MongoClient(MONGODB_URI);
        await client.connect();
        console.log('✅ Connected to MongoDB');

        const db = client.db();
        const collection = db.collection('users');

        const users = [];
        for (let i = 0; i < count; i++) {
            users.push(generateRandomUser(i));
        }

        const result = await collection.insertMany(users);

        console.log(`✅ Successfully seeded ${result.insertedCount} users!`);
        console.log(`📧 Email pattern: user1@yopmail.com to user${count}@yopmail.com`);
        console.log(`👥 Active users: ~${Math.floor(count * 0.8)}`);
        console.log(`📊 Inactive users: ~${Math.floor(count * 0.2)}`);

    } catch (error) {
        console.error('❌ Error seeding users:', error.message);
    } finally {
        if (client) {
            await client.close();
            console.log('✅ Disconnected from MongoDB');
        }
    }
}

// Run the seeder
seedUsers().catch(console.error);