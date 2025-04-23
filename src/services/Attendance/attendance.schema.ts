import * as yup from "yup";

export const createAttendanceSchema = yup.object().shape({
  userId: yup.string().required("ID do usuário é obrigatório"),
  type: yup.string().required("Tipo de registro é obrigatório")
});

export const updateAttendanceSchema = yup.object().shape({
  attendanceId: yup.string().required("ID da presença é obrigatório"),
  status: yup.string().required("Status é obrigatório")
});

export const deleteAttendanceSchema = yup.object().shape({
  attendanceId: yup.string().required("ID da presença é obrigatório")
});

export const countTimeSchema = yup.object().shape({
  userId: yup.string().required("ID do usuário é obrigatório"),
  contract: yup.string()
    .required("Tipo de contrato é obrigatório")
    .oneOf(["CLT", "PJ"], "Contrato deve ser 'CLT' ou 'PJ'")
}); 