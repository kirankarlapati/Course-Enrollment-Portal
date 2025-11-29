import mongoose from 'mongoose';
import Enrollment from './models/Enrollment.js';
import User from './models/User.js';
import Course from './models/Course.js';

const MONGO_URI = 'mongodb://localhost:27017/course-enrollment';

const viewEnrollments = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB Connected\n');

    // Get all enrollments with user and course details
    const enrollments = await Enrollment.find()
      .populate('user', 'name email')
      .populate('course', 'title')
      .sort({ createdAt: -1 });

    console.log(`📊 Total Enrollments: ${enrollments.length}\n`);

    if (enrollments.length === 0) {
      console.log('No enrollments found.');
    } else {
      enrollments.forEach((enrollment, index) => {
        console.log(`${index + 1}. Enrollment ID: ${enrollment._id}`);
        console.log(`   User: ${enrollment.user?.name || 'Unknown'} (${enrollment.user?.email || 'N/A'})`);
        console.log(`   Course: ${enrollment.course?.title || 'Unknown'}`);
        console.log(`   Status: ${enrollment.status}`);
        console.log(`   Created: ${enrollment.createdAt}`);
        console.log('');
      });
    }

    // Ask if user wants to delete all
    console.log('\n💡 To delete ALL enrollments, run: node backend/deleteAllEnrollments.js');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

viewEnrollments();
