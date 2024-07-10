import mongoose from "mongoose";

const assembliesSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  parent: {
    type: String,
  },
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
});

const Assemblies = mongoose.models.Assemblies || mongoose.model("Assemblies", assembliesSchema);

export default Assemblies;
