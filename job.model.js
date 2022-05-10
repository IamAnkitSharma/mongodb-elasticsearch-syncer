import mongoose from 'mongoose';
// import mongoosastic from "mongoosastic";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// jobSchema.plugin(mongoosastic, {
//   hosts: [process.env.ELASTIC_SEARCH_URL],
//   index: "jobs",
// });

const Job = mongoose.model('Job', jobSchema);

export { Job };
