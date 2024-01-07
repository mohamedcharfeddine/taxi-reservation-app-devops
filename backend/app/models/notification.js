import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
 
  content: String, 

isRead: {
    type: Boolean,
    default: false }, 
    
type: String,

createdAt: { 
    type: Date, 
    default: Date.now }, 
});

export const Notification = mongoose.model('Notification', notificationSchema);
