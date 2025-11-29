import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Enrollment from './models/Enrollment.js';

dotenv.config();

const clearDuplicates = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');

    // Find and remove all enrollments with null user or course
    const result = await Enrollment.deleteMany({
      $or: [
        { user: null },
        { course: null }
      ]
    });

    console.log(`🗑️  Removed ${result.deletedCount} invalid enrollments`);

    // Find and remove duplicate enrollments (keep the first one)
    const enrollments = await Enrollment.find().sort({ createdAt: 1 });
    const seen = new Set();
    let duplicatesRemoved = 0;

    for (const enrollment of enrollments) {
      const key = `${enrollment.user}_${enrollment.course}`;
      if (seen.has(key)) {
        await Enrollment.findByIdAndDelete(enrollment._id);
        duplicatesRemoved++;
        console.log(`Removed duplicate: User ${enrollment.user}, Course ${enrollment.course}`);
      } else {
        seen.add(key);
      }
    }

    console.log(`✅ Removed ${duplicatesRemoved} duplicate enrollments`);
    console.log('✅ Database cleaned successfully!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

clearDuplicates();
