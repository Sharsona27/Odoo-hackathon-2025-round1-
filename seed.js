const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./Models/UserModel');
const SkillSwapRequest = require('./Models/SkillSwapRequestModel');
const Rating = require('./Models/RatingModel');

const MONGODB_URI = 'mongodb+srv://mahima:2ehwgR1w48wnJOQc@skillswapdb.cadjhjl.mongodb.net/?retryWrites=true&w=majority&appName=SkillSwapDB';

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log('MongoDB Connected');

  // Clear old data
  await User.deleteMany({});
  await SkillSwapRequest.deleteMany({});
  await Rating.deleteMany({});

  // Create users
  const usersData = [
    {
      name: 'Alice Smith',
      email: 'alice@example.com',
      password: await hashPassword('password1'),
      location: 'New York',
      isPublic: true,
      availability: ['Evenings', 'Weekends'],
      skillsOffered: ['Guitar', 'Photoshop'],
      skillsWanted: ['French', 'Cooking'],
      role: 'user',
    },
    {
      name: 'Bob Johnson',
      email: 'bob@example.com',
      password: await hashPassword('password2'),
      location: 'San Francisco',
      isPublic: true,
      availability: ['Mornings'],
      skillsOffered: ['Cooking', 'JavaScript'],
      skillsWanted: ['Guitar'],
      role: 'user',
    },
    {
      name: 'Carol Lee',
      email: 'carol@example.com',
      password: await hashPassword('password3'),
      location: 'Chicago',
      isPublic: false,
      availability: ['Weekends'],
      skillsOffered: ['French', 'Yoga'],
      skillsWanted: ['JavaScript', 'Photoshop'],
      role: 'user',
    },
  ];
  const users = await User.insertMany(usersData);

  // Create swap requests
  const swapsData = [
    {
      fromUser: users[0]._id, // Alice
      toUser: users[1]._id,   // Bob
      offeredSkill: 'Photoshop',
      requestedSkill: 'Cooking',
      status: 'pending',
    },
    {
      fromUser: users[1]._id, // Bob
      toUser: users[2]._id,   // Carol
      offeredSkill: 'Cooking',
      requestedSkill: 'French',
      status: 'accepted',
    },
  ];
  const swaps = await SkillSwapRequest.insertMany(swapsData);

  // Create feedback
  const feedbackData = [
    {
      swapId: swaps[1]._id,
      fromUser: users[2]._id, // Carol
      toUser: users[1]._id,   // Bob
      rating: 5,
      comment: 'Great cooking lesson!',
    },
    {
      swapId: swaps[1]._id,
      fromUser: users[1]._id, // Bob
      toUser: users[2]._id,   // Carol
      rating: 4,
      comment: 'Carol was a quick learner!',
    },
  ];
  await Rating.insertMany(feedbackData);

  console.log('Database seeded with sample Skill Swap data!');
  mongoose.disconnect();
}

seed().catch(err => {
  console.error('Seeding error:', err);
  mongoose.disconnect();
});
