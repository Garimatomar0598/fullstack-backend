"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.getCurrentUser = exports.login = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const auth_schema_1 = require("../schemas/auth.schema");
const prisma = new client_1.PrismaClient();
// Register a new user
const signup = async (req, res, next) => {
    try {
        // Validate request body
        const validatedData = auth_schema_1.SignupSchema.parse(req.body);
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: validatedData.email },
        });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Hash password
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(validatedData.password, salt);
        // Create user
        const user = await prisma.user.create({
            data: {
                email: validatedData.email,
                password: hashedPassword,
            },
        });
        // Remove password from response
        const { password, ...userWithoutPassword } = user;
        res.status(201).json(userWithoutPassword);
    }
    catch (error) {
        next(error);
    }
};
exports.signup = signup;
// Login user
const login = async (req, res, next) => {
    try {
        // Validate request body
        const validatedData = auth_schema_1.LoginSchema.parse(req.body);
        // Check if user exists
        const user = await prisma.user.findUnique({
            where: { email: validatedData.email },
        });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Check password
        const isPasswordValid = await bcryptjs_1.default.compare(validatedData.password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'fallback-secret', { expiresIn: '1d' });
        // Remove password from response
        const { password, ...userWithoutPassword } = user;
        res.status(200).json({
            token,
            user: userWithoutPassword,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
// Get current user
const getCurrentUser = async (req, res, next) => {
    var _a;
    try {
        // User is attached to request by auth middleware
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            return res.status(401).json({ message: 'Not authenticated' });
        }
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Remove password from response
        const { password, ...userWithoutPassword } = user;
        res.status(200).json(userWithoutPassword);
    }
    catch (error) {
        next(error);
    }
};
exports.getCurrentUser = getCurrentUser;
// Logout (client-side only)
const logout = (req, res) => {
    // JWT tokens are stateless, so we only need to tell client to remove token
    res.status(200).json({ message: 'Logged out successfully' });
};
exports.logout = logout;
