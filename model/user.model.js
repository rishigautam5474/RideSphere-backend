import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: [3, "First Name is must be at 3 charactor long"],
  },
  lastName: {
    type: String,
    required: true,
    minlength: [3, "Last Name is must be at 3 charactor long"],
  },
  email: {
    type: String,
    required: true,
    minlength: [5, "Email is must be at 5 charactor long"],
  },
  password: {
    type: String,
    required: true,
  },
  socketId: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
