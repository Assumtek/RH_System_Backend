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
exports.EditActiveUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class EditActiveUserService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ user_id }) {
            // Primeiro, busque o usuário pelo ID
            const user = yield prisma_1.default.user.findUnique({
                where: { id: user_id }
            });
            if (!user) {
                throw new Error('User not found');
            }
            // Inverta o valor de "active" (se for true, muda para false e vice-versa)
            const updatedUser = yield prisma_1.default.user.update({
                where: { id: user_id },
                data: {
                    active: !user.active
                }
            });
            return updatedUser;
        });
    }
}
exports.EditActiveUserService = EditActiveUserService;
