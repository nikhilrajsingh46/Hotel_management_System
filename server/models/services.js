import mongoose from "mongoose";

const ServicesSchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
      enum: [
        "Cleaning",
        "Laundry",
        "Grocery Shopping",
        "food order",
        "Meal Preparation",
        "Transportation",
        "Childcare",
        "Pet Care",
        "food",
        "Handyman Services",
        "Personal Shopping",
      ],
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

// Exporting model
const Services = mongoose.model("Services", ServicesSchema);
export default Services;
