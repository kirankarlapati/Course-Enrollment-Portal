import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    instructor: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Programming', 'Data Science', 'Web Development', 'Mobile Development', 'Cloud Computing', 'DevOps'],
    },
    level: {
      type: String,
      required: true,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
    },
    duration: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      default: '#1976D2',
    },
    whatYouWillLearn: [String],
    prerequisites: [String],
    syllabus: [
      {
        title: String,
        topics: [String],
      },
    ],
    whyThisCourse: String,
    whoShouldTake: String,
  },
  { timestamps: true }
);

const Course = mongoose.model('Course', courseSchema);

export default Course;
