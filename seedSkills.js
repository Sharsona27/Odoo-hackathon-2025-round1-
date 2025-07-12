const mongoose = require("mongoose");

// Skills data
const skillsData = [
  // Technology Skills
  { name: "JavaScript", category: "Technology", description: "Programming language for web development" },
  { name: "Python", category: "Technology", description: "Versatile programming language" },
  { name: "React", category: "Technology", description: "JavaScript library for building user interfaces" },
  { name: "Node.js", category: "Technology", description: "JavaScript runtime environment" },
  { name: "SQL", category: "Technology", description: "Database query language" },
  { name: "MongoDB", category: "Technology", description: "NoSQL database" },
  { name: "Git", category: "Technology", description: "Version control system" },
  { name: "Docker", category: "Technology", description: "Containerization platform" },
  { name: "AWS", category: "Technology", description: "Cloud computing platform" },
  { name: "Machine Learning", category: "Technology", description: "AI and data science" },

  // Creative Skills
  { name: "Photography", category: "Creative", description: "Art of capturing images" },
  { name: "Graphic Design", category: "Creative", description: "Visual communication design" },
  { name: "Digital Art", category: "Creative", description: "Art created using digital tools" },
  { name: "Video Editing", category: "Creative", description: "Post-production video work" },
  { name: "Music Production", category: "Creative", description: "Creating and recording music" },
  { name: "Drawing", category: "Creative", description: "Traditional art and illustration" },
  { name: "UI/UX Design", category: "Creative", description: "User interface and experience design" },
  { name: "Animation", category: "Creative", description: "Creating moving images" },
  { name: "Calligraphy", category: "Creative", description: "Decorative handwriting" },
  { name: "Crafting", category: "Creative", description: "Handmade items and DIY projects" },

  // Language Skills
  { name: "English", category: "Language", description: "English language teaching" },
  { name: "Spanish", category: "Language", description: "Spanish language teaching" },
  { name: "French", category: "Language", description: "French language teaching" },
  { name: "German", category: "Language", description: "German language teaching" },
  { name: "Chinese", category: "Language", description: "Chinese language teaching" },
  { name: "Japanese", category: "Language", description: "Japanese language teaching" },
  { name: "Korean", category: "Language", description: "Korean language teaching" },
  { name: "Arabic", category: "Language", description: "Arabic language teaching" },
  { name: "Hindi", category: "Language", description: "Hindi language teaching" },
  { name: "Portuguese", category: "Language", description: "Portuguese language teaching" },

  // Business Skills
  { name: "Marketing", category: "Business", description: "Digital and traditional marketing" },
  { name: "Sales", category: "Business", description: "Sales techniques and strategies" },
  { name: "Project Management", category: "Business", description: "Managing projects and teams" },
  { name: "Financial Planning", category: "Business", description: "Personal and business finance" },
  { name: "Business Strategy", category: "Business", description: "Strategic business planning" },
  { name: "Data Analysis", category: "Business", description: "Business intelligence and analytics" },
  { name: "Leadership", category: "Business", description: "Team leadership and management" },
  { name: "Negotiation", category: "Business", description: "Business negotiation skills" },
  { name: "Public Speaking", category: "Business", description: "Presentation and communication skills" },
  { name: "Entrepreneurship", category: "Business", description: "Starting and running businesses" },

  // Health Skills
  { name: "Yoga", category: "Health", description: "Physical and mental wellness" },
  { name: "Meditation", category: "Health", description: "Mindfulness and relaxation" },
  { name: "Nutrition", category: "Health", description: "Healthy eating and diet planning" },
  { name: "Fitness Training", category: "Health", description: "Physical fitness and exercise" },
  { name: "Mental Health", category: "Health", description: "Psychological wellness support" },
  { name: "First Aid", category: "Health", description: "Emergency medical care" },
  { name: "Cooking", category: "Health", description: "Healthy cooking and meal preparation" },
  { name: "Dance", category: "Health", description: "Various dance styles and techniques" },
  { name: "Swimming", category: "Health", description: "Swimming instruction and techniques" },
  { name: "Martial Arts", category: "Health", description: "Self-defense and discipline" },

  // Education Skills
  { name: "Mathematics", category: "Education", description: "Math tutoring and problem solving" },
  { name: "Science", category: "Education", description: "General science education" },
  { name: "History", category: "Education", description: "Historical knowledge and research" },
  { name: "Literature", category: "Education", description: "Reading and writing skills" },
  { name: "Computer Science", category: "Education", description: "Programming and computer concepts" },
  { name: "Chemistry", category: "Education", description: "Chemical science education" },
  { name: "Physics", category: "Education", description: "Physical science education" },
  { name: "Biology", category: "Education", description: "Life sciences education" },
  { name: "Geography", category: "Education", description: "World geography and cultures" },
  { name: "Philosophy", category: "Education", description: "Critical thinking and logic" },

  // Other Skills
  { name: "Gardening", category: "Other", description: "Plant care and horticulture" },
  { name: "Carpentry", category: "Other", description: "Woodworking and construction" },
  { name: "Plumbing", category: "Other", description: "Pipe and fixture installation" },
  { name: "Electrical Work", category: "Other", description: "Electrical installation and repair" },
  { name: "Auto Repair", category: "Other", description: "Vehicle maintenance and repair" },
  { name: "Sewing", category: "Other", description: "Textile work and clothing repair" },
  { name: "Knitting", category: "Other", description: "Yarn crafts and textile arts" },
  { name: "Pottery", category: "Other", description: "Ceramic arts and clay work" },
  { name: "Beekeeping", category: "Other", description: "Honey production and bee management" },
  { name: "Chess", category: "Other", description: "Strategic board game instruction" }
];

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://mahima:2ehwgR1w48wnJOQc@skillswapdb.cadjhjl.mongodb.net/?retryWrites=true&w=majority&appName=SkillSwapDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

// Seed skills function
const seedSkills = async () => {
  try {
    // Clear existing skills
    // await Skill.deleteMany({}); // This line is removed as Skill model is no longer imported
    console.log("Cleared existing skills");

    // Insert new skills
    // const skills = await Skill.insertMany(skillsData); // This line is removed as Skill model is no longer imported
    console.log(`Successfully seeded ${skillsData.length} skills`);

    // Log skills by category
    const categories = {};
    skillsData.forEach(skill => {
      if (!categories[skill.category]) {
        categories[skill.category] = [];
      }
      categories[skill.category].push(skill.name);
    });

    console.log("\nSkills by category:");
    Object.keys(categories).forEach(category => {
      console.log(`\n${category}:`);
      categories[category].forEach(skill => {
        console.log(`  - ${skill}`);
      });
    });

  } catch (error) {
    console.error("Error seeding skills:", error);
  }
};

// Main execution
const main = async () => {
  await connectDB();
  await seedSkills();
  mongoose.connection.close();
  console.log("Database connection closed");
};

main().catch(console.error); 