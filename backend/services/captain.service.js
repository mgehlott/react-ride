const Captain = require("../models/captain.model");

module.exports.createCaptain = async ({
  firstName,
  lastName,
  email,
  password,
  color,
  plate,
  vehicleType,
  capacity,
}) => {
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !color ||
    !plate ||
    !vehicleType ||
    !capacity
  ) {
    throw new Error("All fields are required");
  }

  const captain = Captain.create({
    fullName: { firstName, lastName },
    email,
    password,
    vehicle: { color, plate, vehicleType, capacity },
  });
  return captain;
};

module.exports.getCaptainByEmail = async (email) => {
  return await Captain.findOne({ email });
};
module.exports.getCaptainByEmailWithPassword = async (email) => {
  return await Captain.findOne({ email }).select("+password");
};

module.exports.getCaptainById = async (id) => {
  return await Captain.findById(id);
};
