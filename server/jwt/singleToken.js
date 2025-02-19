import jwt from "jsonwebtoken";

export const singleToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "5m",
  });
  return token;
};
