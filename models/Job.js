const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema(
  {
    id: String,
    title: String,
    company: String,
    description: String,
    contractType: String,
    redirectURL: String,
    location: String,
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
