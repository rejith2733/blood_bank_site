const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect("mongodb+srv://admin2:admin2@cluster0.d99ahoq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: true,
  });

  console.log("MongoDB Connected");
};

module.exports = connectDB;