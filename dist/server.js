"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var mongoose_1 = __importDefault(require("mongoose"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var bodyParser = require("body-parser");
var environment_1 = require("./config/environment");
var swagger_config_1 = require("./swagger-config");
var auth_1 = __importDefault(require("./routes/auth"));
var user_1 = __importDefault(require("./routes/user"));
var listing_1 = __importDefault(require("./routes/listing"));
var app = (0, express_1.default)();
// CORS configuration for Vercel deployment
var allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://pawtopia.vercel.app',
    'https://pawtopia-web.vercel.app',
    'https://pawtopia-web-app.vercel.app',
    'https://pawtopia-frontend.vercel.app',
    /https:\/\/pawtopia.*\.vercel\.app$/,
    /https:\/\/.*\.vercel\.app$/ // Allow all Vercel preview deployments
];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, curl, etc)
        if (!origin)
            return callback(null, true);
        // Check if origin is allowed
        var isAllowed = allowedOrigins.some(function (allowed) {
            if (allowed instanceof RegExp) {
                return allowed.test(origin);
            }
            return allowed === origin;
        });
        if (isAllowed) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'auth-token']
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// MongoDB Connection
mongoose_1.default.set('strictQuery', false);
var mongodbUri = environment_1.config.MONGODB_URI;
mongoose_1.default
    .connect(mongodbUri, {})
    .then(function () {
    console.log("✅ Connected to MongoDB");
})
    .catch(function (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
});
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_config_1.swaggerDocs));
app.use("/auth", auth_1.default);
app.use("/user", user_1.default);
app.use("/listing", listing_1.default);
app.get("/", function (req, res) {
    res.send("Pawtopia API");
});
var PORT = environment_1.config.PORT;
app.listen(PORT, function () {
    console.log("\uD83D\uDE80 Server is running on port ".concat(PORT));
    console.log("\uD83D\uDCDA API Docs: http://localhost:".concat(PORT, "/api-docs"));
});
