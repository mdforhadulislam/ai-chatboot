"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigModule = void 0;
const config_1 = require("@nestjs/config");
const config_object_1 = __importDefault(require("./config.object"));
const env_validation_1 = require("./env.validation");
exports.ConfigModule = config_1.ConfigModule.forRoot({
    isGlobal: true,
    load: [config_object_1.default],
    validate: env_validation_1.validate,
});
//# sourceMappingURL=configuration.js.map