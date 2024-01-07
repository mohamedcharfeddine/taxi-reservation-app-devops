import mongoose, { Types } from "mongoose";

const reservationSchema = new mongoose.Schema({

  name: {
    type: String,
    required : true
  },

  email: { type: String },

  phoneNumber: { type: String, required: true },

  passengerNumber: { type: String, required: true },

  startDestination: { type: String, required: true },

  endDestination: { type: String, required: true },


 

  date: { type: Date, required: true },

  time: { type: String, required: true},

  message: {type: String  },

  isRoundTrip: { type: Boolean, default: false },

  status: { 
    type: String,
    enum: ["accepte", "refuse", "en attente"],
    default: "en attente",
  },
  baggageCount: { type: Number },

  createdAt: {
    type: Date,
    default: Date.now,  
},

});

export const Reservation = mongoose.model('Reservation', reservationSchema);