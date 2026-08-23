"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const env_js_1 = require("./config/env.js");
const db_js_1 = require("./config/db.js");
const index_js_1 = __importDefault(require("./routes/index.js"));
const errorHandler_js_1 = require("./middleware/errorHandler.js");
const app = (0, express_1.default)();
// Security
app.use((0, helmet_1.default)({
    contentSecurityPolicy: false, // Adjust if needed for Maps etc.
    crossOriginEmbedderPolicy: false,
}));
app.use((0, cors_1.default)({
    origin: env_js_1.env.CLIENT_URL,
    credentials: true,
}));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)(env_js_1.env.COOKIE_SECRET));
app.use((0, express_mongo_sanitize_1.default)());
// Routes
app.use('/api', index_js_1.default);
// 404 & Error
app.use(errorHandler_js_1.notFoundHandler);
app.use(errorHandler_js_1.errorHandler);
async function start() {
    await (0, db_js_1.connectDB)();
    app.listen(env_js_1.env.PORT, () => {
        console.log(`Server running on port ${env_js_1.env.PORT} [${env_js_1.env.NODE_ENV}]`);
    });
}
start().catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
});
exports.default = app;
//# sourceMappingURL=server.js.map