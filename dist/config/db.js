"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = connectDB;
const mongoose_1 = __importDefault(require("mongoose"));
const env_js_1 = require("./env.js");
let isConnected = false;
async function connectDB() {
    if (isConnected) {
        return;
    }
    if (!env_js_1.env.MONGODB_URI) {
        console.error('MONGODB_URI is not defined');
        process.exit(1);
    }
    try {
        const conn = await mongoose_1.default.connect(env_js_1.env.MONGODB_URI);
        isConnected = true;
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}
mongoose_1.default.connection.on('disconnected', () => {
    isConnected = false;
    console.log('MongoDB disconnected');
});
//# sourceMappingURL=db.js.map