import mongoose from "mongoose";

const aichatSchema = new mongoose.Schema({
  userinput: {
    type: String,
    required: true,
  },
  aireply: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  markedImportent: {
    type: Boolean,
    default: Date.now,
  },
  tag: {
    type: String,
    default: Date.now,
  },
});

const AIchatH = mongoose.models.AIchatH || mongoose.model("AIchatH", aichatSchema);

export default AIchatH;
