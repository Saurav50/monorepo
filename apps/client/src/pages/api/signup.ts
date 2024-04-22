// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Admin } from "db";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/lib/connectToDatabase";

type Data = {
  message?: string;
  token?: string;
};
const secretKey = "SECRET";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await connectToDatabase();
  const { username, password } = req.body;
  if (!username || !password)
    res
      .status(400)
      .json({ message: "Please provide both username and password" });
  else {
    // check for existing admin username
    const admin = await Admin.findOne({ username });
    if (admin)
      res.status(400).json({
        message: "Admin already exists",
      });
    else {
      const newAdmin = new Admin({
        username: username,
        password: password,
      });
      newAdmin.save();
      //   jwt token generate;
      const token = jwt.sign({ username, role: "admin" }, secretKey, {
        expiresIn: "1h",
      });
      res.json({ message: "Admin created successfully", token });
    }
  }
}
