"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_js_1 = require("../config/db.js");
const Admin_js_1 = require("../models/Admin.js");
const mongoose_1 = __importDefault(require("mongoose"));
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function question(prompt) {
    return new Promise((resolve) => rl.question(prompt, resolve));
}
async function main() {
    await (0, db_js_1.connectDB)();
    console.log('\n=== Create Smartcut Admin ===\n');
    const name = await question('Name: ');
    const email = await question('Email: ');
    const password = await question('Password (min 8 chars): ');
    if (!name || !email || !password || password.length < 8) {
        console.error('Invalid input. Name, email and password (min 8) required.');
        process.exit(1);
    }
    const existing = await Admin_js_1.Admin.findOne({ email: email.toLowerCase() });
    if (existing) {
        console.error('Admin with this email already exists.');
        process.exit(1);
    }
    const passwordHash = await bcryptjs_1.default.hash(password, 12);
    await Admin_js_1.Admin.create({
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
    await mongoose_1.default.disconnect();
    process.exit(0);
}
main().catch((err) => {
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=createAdmin.js.map