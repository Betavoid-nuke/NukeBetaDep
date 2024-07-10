import mongoose from "mongoose";
import { string } from "zod";

const projectSchema = new mongoose.Schema({
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
    type: mongoose.Schema.Types.ObjectId
  },
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
  Prompt: {
    type: Array,
    ref: "Prompts",
  },
  Nodes: {
    type: Array,
    ref: "Nodes",
  },
  Edges: {
    type: Array,
    ref: "Edges",
  },
  Keywords: {
    type: Array,
    ref: "Keywords",
  },
  jsonextract: {
    type: Array,
    ref: "jsonextract"
  },
  Gen_Documentation: {
    type: String,
    ref: "Generated_Documentation",
  },
  Gen_Script: {
    type: String,
    ref: "Generated_Script",
  },
});

const Projects = mongoose.models.Projects || mongoose.model("Projects", projectSchema);

export default Projects;
