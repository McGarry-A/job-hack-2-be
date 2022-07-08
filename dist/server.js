"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./db/connection");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("./user/user.routes"));
const app = (0, express_1.default)();
const port = 5001;
app
    .use(express_1.default.json())
    .use((0, cors_1.default)())
    .use(user_routes_1.default);
app.get("/", (_, res) => {
    res
        .status(200)
        .send({ message: "home route" });
});
app.listen(port, () => console.log(`Running on port ${port}`));
//# sourceMappingURL=server.js.map