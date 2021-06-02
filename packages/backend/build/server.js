"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const donate_1 = require("./routes/donate");
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const port = process.env.PORT;
if (!port)
    throw new Error("Provide PORT variable in .env");
const mongoUri = process.env.MONGO_URI;
if (!mongoUri)
    throw new Error("Provide MONGO_URI variable in .env");
mongoose_1.default.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
const app = express_1.default();
const server = http_1.default.createServer(app);
app.use(cors_1.default());
app.use(express_1.default.json());
server.on("listening", () => {
    console.info(`Donation server started on port ${port}`);
});
server.on("error", (err) => {
    console.error(err);
});
console.log(`${__dirname}/public`);
app.use("/", express_1.default.static(`${__dirname}/../public`));
app.use("/donate", donate_1.getDonateRoute());
server.listen(port);
//# sourceMappingURL=server.js.map