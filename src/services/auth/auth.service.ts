import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthRequest {
    email: string,
    password: string
}

// Função para autenticar usuário (login)
export const authenticateService = async ({ email, password }: AuthRequest) => {
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
}

// Função para obter detalhes do usuário
export const getUserDetailsService = async (user_id: string) => {
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

    return user
} 