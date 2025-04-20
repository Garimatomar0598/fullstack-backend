"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
// Public routes
router.post('/signup', auth_controller_1.signup);
router.post('/login', auth_controller_1.login);
// Protected routes
router.get('/me', auth_middleware_1.authMiddleware, auth_controller_1.getCurrentUser);
router.post('/logout', auth_middleware_1.authMiddleware, auth_controller_1.logout);
exports.default = router;
