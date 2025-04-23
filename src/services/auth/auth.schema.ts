import * as yup from "yup";

export const loginSchema = yup.object().shape({
    email: yup.string().email("Email inválido").required("Email é obrigatório"),
    password: yup.string().required("Senha é obrigatória"),
})

export const meSchema = yup.object().shape({
    user_id: yup.string().required("ID do usuário é obrigatório"),
})







