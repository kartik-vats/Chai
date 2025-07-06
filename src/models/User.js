import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  image: String,
  id: { type: String, unique: true }, // Unique identifier for the user
  provider: String, // Provider name (e.g., 'google', 'github'),
 contacts: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
      },
    },
  ],

  requests: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
