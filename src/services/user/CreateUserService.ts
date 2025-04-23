import { hash, genSalt } from 'bcryptjs'
import prismaClient from "../../prisma"

interface UserRequest {
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

class CreateUserService {
  async execute({ name, email, password, phoneNumber, profilePhoto, role, contrato, cidade, nascimento, CPF, RG, Modality }: UserRequest) {

    // Verifica se tem alguim campo vazio
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


    // Verifica se já existe o use com o email
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
}

export { CreateUserService }