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
exports.CreateUserService = void 0;
const bcryptjs_1 = require("bcryptjs");
const prisma_1 = __importDefault(require("../../prisma"));
class CreateUserService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, email, password, phoneNumber, profilePhoto, role }) {
            // Verifica se tem alguim campo vazio
            if (!email) {
                throw new Error("E-mail incorreto");
            }
            if (!name) {
                throw new Error("Nome não informado");
            }
            if (!password) {
                throw new Error("Senha não informada");
            }
            if (!phoneNumber) {
                throw new Error("phoneNumber não informada");
            }
            if (!profilePhoto) {
                throw new Error("profilePhoto não informada");
            }
            if (!role) {
                throw new Error("role não informada");
            }
            // Verifica se já existe o use com o email
            const userExists = yield prisma_1.default.user.findFirst({
                where: {
                    email: email
                }
            });
            if (userExists) {
                throw new Error("Usuário já cadastrado");
            }
            // Cria a criptografia da senha
            const hashedPassword = yield (0, bcryptjs_1.hash)(password, 8);
            // Cria o user
            const user = yield prisma_1.default.user.create({
                data: {
                    name: name,
                    email: email,
                    password: hashedPassword,
                    phoneNumber: phoneNumber,
                    role: role,
                    profilePhoto: profilePhoto
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phoneNumber: true,
                    role: true,
                    active: true,
                    profilePhoto: true,
                }
            });
            return user;
        });
    }
}
exports.CreateUserService = CreateUserService;
