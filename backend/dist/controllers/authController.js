"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Kayıt olma (Register)
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, confirmPassword, name, surname } = req.body;
    // Şifre doğrulama
    if (password !== confirmPassword) {
        res.status(400).json({ message: 'Passwords do not match' });
        return;
    }
    if (password.length < 8) {
        res.status(400).json({ message: 'Password must be at least 8 characters' });
        return;
    }
    // İsim ve soyisim doğrulama
    if (!name || !surname) {
        res.status(400).json({ message: 'Name and surname required' });
        return;
    }
    try {
        // Email doğrulama
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'This email is already registered' });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = new User_1.default({
            email,
            password: hashedPassword,
            name,
            surname,
        });
        yield newUser.save();
        res
            .status(201)
            .json({ message: 'User successfully registered', user: newUser });
    }
    catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'User registration failed' });
        return;
    }
});
exports.register = register;
// Giriş yapma (Login)
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ email });
        // Kullanıcı bulunamazsa hata döndür
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        // Şifre geçerli değilse hata döndür
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET || '', {
            expiresIn: '1h',
        });
        return res.status(200).json({
            token,
            user: { email: user.email, name: user.name, surname: user.surname },
        });
    }
    catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});
exports.login = login;
