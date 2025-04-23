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
exports.CreatePresenceDayService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CreatePresenceDayService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ userId, day }) {
            // Verifica se tem alguim campo vazio
            if (!userId) {
                throw new Error("User não enviado");
            }
            if (!day) {
                throw new Error("Data não enviado");
            }
            // Cria o registro do dia presencial
            const presenceDay = yield prisma_1.default.presenceDay.create({
                data: {
                    userId,
                    day: new Date(day), // Armazena a data enviada
                },
            });
            return presenceDay;
        });
    }
}
exports.CreatePresenceDayService = CreatePresenceDayService;
