import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  chatId: [{ type: mongoose.Schema.Types.ObjectId, ref: "chat" }],
  sender: { type: String, required: true },
  content: { type: String, required: true },
  time: { type: String, required: true },
});

export default mongoose.models.Message || mongoose.model('Message', MessageSchema);
