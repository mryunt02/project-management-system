"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
const listRoutes_1 = __importDefault(require("./routes/listRoutes"));
const eventRoutes_1 = __importDefault(require("./routes/eventRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
console.log('Connecting to MongoDB with URI:', process.env.MONGODB_URI);
// MongoDB bağlantısı
mongoose_1.default
    .connect(process.env.MONGODB_URI || '')
    .then(() => console.log('MongoDB bağlantısı başarılı'))
    .catch((err) => console.error('MongoDB bağlantısı başarısız', err));
// Rotaları kullan
app.use('/api', authRoutes_1.default);
app.use('/api', projectRoutes_1.default); // Use project routes
app.use('/api', listRoutes_1.default); // Use list routes
app.use('/api', eventRoutes_1.default); // Use event routes
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
