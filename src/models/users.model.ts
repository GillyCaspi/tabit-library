import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
});

const Users = mongoose.model("Users", usersSchema);

export default Users;
