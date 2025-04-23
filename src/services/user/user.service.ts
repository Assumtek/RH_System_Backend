import { hash } from 'bcryptjs'
import prismaClient from "../../prisma"

// Interfaces
interface CreateUserRequest {
  name: string
  email: string
  password: string
  phoneNumber: string
  profilePhoto: string
  role: string
  contrato: string
  cidade: string
  nascimento: string
  CPF: string
  RG: string
  Modality: string
}

interface EditUserRequest {
  user_id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  role?: string;
  Modality?: string;
  contrato?: string;
  cidade?: string;
  nascimento?: string;
  CPF?: string;
  RG?: string;
}

interface EditActiveRequest {
  user_id: string
}

// Serviço para criar um novo usuário
export const createUserService = async ({ 
  name, 
  email, 
  password, 
  phoneNumber, 
  profilePhoto, 
  role, 
  contrato, 
  cidade, 
  nascimento, 
  CPF, 
  RG, 
  Modality 
}: CreateUserRequest) => {
  // Verifica se tem algum campo vazio
  if (!email) {
    throw new Error("E-mail incorreto")
  }
  if (!name) {
    throw new Error("Nome não informado")
  }
  if (!password) {
    throw new Error("Senha não informada")
  }
  if (!phoneNumber) {
    throw new Error("phoneNumber não informada")
  }
  if (!profilePhoto) {
    throw new Error("profilePhoto não informada")
  }
  if (!role) {
    throw new Error("role não informada")
  }
  if (!cidade) {
    throw new Error("cidade não informada")
  }
  if (!CPF) {
    throw new Error("CPF não informada")
  }
  if (!RG) {
    throw new Error("RG não informada")
  }
  if (!contrato) {
    throw new Error("contrato não informada")
  }
  if (!nascimento) {
    throw new Error("Data de nascimento não informada")
  }
  if (!Modality) {
    throw new Error("Modality não informada")
  }

  // Verifica se já existe o user com o email
  const userExists = await prismaClient.user.findFirst({
    where: {
      email: email
    }
  })

  if (userExists) {
    throw new Error("Usuário já cadastrado")
  }

  // Cria a criptografia da senha
  const hashedPassword = await hash(password, 8)

  // Cria o user
  const user = await prismaClient.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
      phoneNumber: phoneNumber,
      role: role,
      profilePhoto: profilePhoto,
      contrato: contrato, 
      cidade: cidade, 
      nascimento: nascimento, 
      CPF: CPF, 
      RG: RG,
      Modality: Modality
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
  })

  return user
}

// Serviço para editar usuário
export const editUserService = async ({
  user_id,
  name,
  email,
  phoneNumber,
  role,
  Modality,
  contrato,
  cidade,
  nascimento,
  CPF,
  RG,
}: EditUserRequest) => {
  // Valida os campos obrigatórios
  if (!user_id || !name || !email) {
    throw new Error("Campos obrigatórios não foram fornecidos");
  }

  // Busca o usuário pelo ID
  const user = await prismaClient.user.findUnique({
    where: { id: user_id },
  });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  // Atualiza os dados do usuário
  const updatedUser = await prismaClient.user.update({
    where: { id: user_id },
    data: {
      name,
      email,
      phoneNumber,
      role,
      Modality,
      contrato,
      cidade,
      nascimento,
      CPF,
      RG,
    },
  });

  return updatedUser;
}

// Serviço para ativar/desativar usuário
export const editActiveUserService = async ({ user_id }: EditActiveRequest) => {
  // Primeiro, busque o usuário pelo ID
  const user = await prismaClient.user.findUnique({
    where: { id: user_id }
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Inverta o valor de "active" (se for true, muda para false e vice-versa)
  const updatedUser = await prismaClient.user.update({
    where: { id: user_id },
    data: {
      active: !user.active
    }
  });

  return updatedUser;
}

// Serviço para listar todos os usuários
export const listUsersService = async () => {
  const listUsers = await prismaClient.user.findMany({
    orderBy: {
      name: 'asc',
    },
    include: {
      Attendance: true,
      PresenceDay: true
    }
  }) 

  return listUsers
} 