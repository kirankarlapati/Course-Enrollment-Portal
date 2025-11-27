import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['enrollment', 'payment', 'system'],
      default: 'enrollment',
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    metadata: {
      enrollmentId: mongoose.Schema.Types.ObjectId,
      userId: mongoose.Schema.Types.ObjectId,
      courseId: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
