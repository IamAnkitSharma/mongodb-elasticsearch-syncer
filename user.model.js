import mongoose from "mongoose";
import mongoosastic from "mongoosastic";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
});

// jobSchema.plugin(mongoosastic, {
//   hosts: ["localhost:9200"],
//   index: "jobs",
// });

const User = mongoose.model("User", userSchema);

export { User };
