import mongoose from "mongoose";

const DBURI = process.env.MONOGO_URI;

export const dbConnections = async () => {
  if (mongoose.connections[0].readyState) {
    return mongoose.connections[0];
  }
  try {
    const data = await mongoose.connect(DBURI);
    console.log("======================> Database connected successfully", data.connection.name);
    return data.connection;
  } catch (error) {
    console.error(error, "===>db/index.js");
  }
};