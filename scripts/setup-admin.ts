/**
 * One-time setup script to create the admin user
 *
 * Usage:
 *   tsx scripts/setup-admin.ts
 *
 * You will be prompted to enter a password.
 * The script will create the admin user in MongoDB.
 */

import * as readline from "readline";
import { config } from "dotenv";
import { resolve } from "path";
import connectDB from "../lib/db/connection";
import User from "../lib/db/models/User";
import { hashPassword } from "../lib/auth/password";

// Load .env.local file
config({ path: resolve(process.cwd(), ".env.local") });

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "raafyshiham@gmail.com";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function setupAdmin() {
  try {
    console.log("🔧 Admin Setup Script\n");

    // Connect to database
    console.log("Connecting to MongoDB...");
    await connectDB();
    console.log("✅ Connected to MongoDB\n");

    // Check if admin user already exists
    const existingUser = await User.findOne({ email: ADMIN_EMAIL });

    if (existingUser) {
      console.log(`⚠️  Admin user (${ADMIN_EMAIL}) already exists!`);
      const answer = await question("Do you want to reset the password? (yes/no): ");

      if (answer.toLowerCase() !== "yes") {
        console.log("Setup cancelled.");
        rl.close();
        process.exit(0);
      }
    }

    // Get password from user
    const password = await question("\nEnter admin password: ");

    if (!password || password.length < 8) {
      console.error("❌ Password must be at least 8 characters long");
      rl.close();
      process.exit(1);
    }

    const confirmPassword = await question("Confirm password: ");

    if (password !== confirmPassword) {
      console.error("❌ Passwords do not match");
      rl.close();
      process.exit(1);
    }

    // Hash password
    console.log("\nHashing password...");
    const passwordHash = await hashPassword(password);

    // Create or update admin user
    if (existingUser) {
      existingUser.passwordHash = passwordHash;
      await existingUser.save();
      console.log("✅ Admin password updated successfully!");
    } else {
      await User.create({
        email: ADMIN_EMAIL,
        passwordHash,
      });
      console.log("✅ Admin user created successfully!");
    }

    console.log(`\n📧 Email: ${ADMIN_EMAIL}`);
    console.log("🔒 Password: ********\n");
    console.log("You can now log in to the admin portal at /admin/login");

    rl.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Setup failed:", error);
    rl.close();
    process.exit(1);
  }
}

setupAdmin();
