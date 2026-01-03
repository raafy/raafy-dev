import mongoose, { Schema, Model } from "mongoose";
import type { IProject } from "@/types/project";

const ProjectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    translations: {
      type: Map,
      of: new Schema(
        {
          title: {
            type: String,
            trim: true,
          },
          description: {
            type: String,
          },
        },
        { _id: false }
      ),
      default: {},
    },
    imageUrl: {
      type: String,
      required: true,
    },
    techStack: {
      type: [String],
      required: true,
      default: [],
    },
    platforms: {
      type: [String],
      required: true,
      default: [],
    },
    categories: {
      type: [String],
      required: true,
      default: [],
    },
    githubUrl: {
      type: String,
      trim: true,
    },
    liveDemoUrl: {
      type: String,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["active", "archived"],
      default: "active",
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for efficient queries
ProjectSchema.index({ status: 1, featured: -1, order: 1 }); // Public page queries
ProjectSchema.index({ createdAt: -1 }); // Recent projects

const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
