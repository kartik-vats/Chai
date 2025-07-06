import { connectDB } from "@/lib/db"; // You can set up your db connection here
import User from "@/models/User"; // Your Mongoose or Prisma model

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await connectDB();

    const { name, email, image, id, provider, } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ id });

    if (!existingUser) {
      const newUser = new User({
        name,
        email,
        image,
        id,
        provider,
        contacts: [], // Initialize with empty array
        requests: [], // Initialize with empty array

      });

      await newUser.save();
      return res.status(201).json({ message: "User created" });
    } else {
      return res.status(200).json({ message: "User already exists" });
    }
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
