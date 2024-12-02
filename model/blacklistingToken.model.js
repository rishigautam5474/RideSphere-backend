import mongoose from "mongoose";

// Define the schema for blacklisted JWT tokens
const blacklistSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate tokens
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set to the current date/time
    expires: 86400, // TTL index set to 24 hours (in seconds)
  },
});

// Create the model
const BlacklistedToken = mongoose.model('BlacklistedToken', blacklistSchema);

export default BlacklistedToken;