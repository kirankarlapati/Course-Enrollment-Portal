import mongoose from 'mongoose';
import Enrollment from './models/Enrollment.js';

const MONGO_URI = 'mongodb://localhost:27017/course-enrollment';

const deleteAllEnrollments = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB Connected\n');

    const result = await Enrollment.deleteMany({});
    
    console.log(`🗑️  Deleted ${result.deletedCount} enrollments`);
    console.log('✅ All enrollments cleared! You can now enroll fresh.\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

deleteAllEnrollments();
