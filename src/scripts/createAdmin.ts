import readline from 'readline';
import bcrypt from 'bcryptjs';
import { connectDB } from '../config/db.js';
import { Admin } from '../models/Admin.js';
import mongoose from 'mongoose';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt: string): Promise<string> {
  return new Promise((resolve) => rl.question(prompt, resolve));
}

async function main() {
  await connectDB();

  console.log('\n=== Create Smartcut Admin ===\n');

  const name = await question('Name: ');
  const email = await question('Email: ');
  const password = await question('Password (min 8 chars): ');

  if (!name || !email || !password || password.length < 8) {
    console.error('Invalid input. Name, email and password (min 8) required.');
    process.exit(1);
  }

  const existing = await Admin.findOne({ email: email.toLowerCase() });
  if (existing) {
    console.error('Admin with this email already exists.');
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await Admin.create({
    name,
    email: email.toLowerCase(),
    passwordHash,
    role: 'superadmin',
    active: true,
  });

  console.log('\nAdmin created successfully.');
  console.log('Email:', email.toLowerCase());
  console.log('Do not share the password.\n');

  rl.close();
  await mongoose.disconnect();
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
