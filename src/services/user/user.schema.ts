import * as yup from "yup";

export const createUserSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup.string().min(6, "Senha deve ter pelo menos 6 caracteres").required("Senha é obrigatória"),
  phoneNumber: yup.string().required("Número de telefone é obrigatório"),
  profilePhoto: yup.string().required("Foto do perfil é obrigatória"),
  role: yup.string().required("Cargo é obrigatório"),
  contrato: yup.string().required("Tipo de contrato é obrigatório"),
  cidade: yup.string().required("Cidade é obrigatória"),
  nascimento: yup.string().required("Data de nascimento é obrigatória"),
  CPF: yup.string().required("CPF é obrigatório"),
  RG: yup.string().required("RG é obrigatório"),
  Modality: yup.string().required("Modalidade é obrigatória")
});

export const editUserSchema = yup.object().shape({
  user_id: yup.string().required("ID do usuário é obrigatório"),
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  phoneNumber: yup.string(),
  role: yup.string(),
  Modality: yup.string(),
  contrato: yup.string(),
  cidade: yup.string(),
  nascimento: yup.string(),
  CPF: yup.string(),
  RG: yup.string()
});

export const editActiveUserSchema = yup.object().shape({
  user_id: yup.string().required("ID do usuário é obrigatório")
}); 