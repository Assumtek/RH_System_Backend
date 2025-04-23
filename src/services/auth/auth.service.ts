import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { loginSchema, meSchema } from "./auth.schema";

interface AuthRequest {
    email: string,
    password: string
}

// Função para autenticar usuário (login)
export const authenticateService = async ({ email, password }: AuthRequest) => {
    try {
        // Validar dados com o schema do Yup
        await loginSchema.validate({ email, password }, { abortEarly: false });
        
        // Verifica se tem um user com o email cadastrado
        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (!user) {
            throw new Error("Email ou senha incorretos")
        }

        // Ele faz a verificação se a senha criptografada é a mesma enviada pelo user
        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new Error("Email ou senha incorretos")
        }

        // Gera um token JWT, armazena o nome e email do user
        const token = sign(
            {
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '1d'
            }
        )

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token
        }
    } catch (error) {
        // Verifica se é um erro de validação do Yup
        if (error.name === 'ValidationError') {
            // Formata a mensagem de erro
            const errors = error.inner.reduce((acc, err) => {
                return { ...acc, [err.path]: err.message };
            }, {});
            
            throw new Error(JSON.stringify(errors));
        }
        
        // Se não for um erro de validação, repassa o erro original
        throw error;
    }
}

// Função para obter detalhes do usuário
export const getUserDetailsService = async (user_id: string) => {
    try {
        // Validar o ID do usuário com o schema do Yup
        await meSchema.validate({ user_id }, { abortEarly: false });
        
        const user = await prismaClient.user.findFirst({
            where: { id: user_id },
            select: {
                id: true,
                name: true,
                email: true,
                phoneNumber: true,
                role: true,
                active: true,
                profilePhoto: true,
                Attendance: true,
                PresenceDay: true,
                password: true,
                createdAt: true,
                cidade: true,
                contrato: true,
                CPF: true,
                nascimento: true,
                RG: true
            }
        })

        if (!user) {
            throw new Error("Usuário não encontrado");
        }

        return user
    } catch (error) {
        // Verifica se é um erro de validação do Yup
        if (error.name === 'ValidationError') {
            // Formata a mensagem de erro
            const errors = error.inner.reduce((acc, err) => {
                return { ...acc, [err.path]: err.message };
            }, {});
            
            throw new Error(JSON.stringify(errors));
        }
        
        // Se não for um erro de validação, repassa o erro original
        throw error;
    }
} 