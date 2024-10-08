import mongoose from "mongoose";

const prospectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  linkedinUsername: {
    type: String,
    required: true
  },
  lastChecked: {
    type: Date,
    default: null
  },
  type: {
    type: String,
    enum: ['user', 'company'],
    default: 'user'
  }
}, { timestamps: true });

const Prospect = mongoose.model("Prospect", prospectSchema);

export default Prospect;