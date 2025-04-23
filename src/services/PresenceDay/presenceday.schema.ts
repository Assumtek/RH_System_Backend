import * as yup from "yup";

export const createPresenceDaySchema = yup.object().shape({
  userId: yup.string().required("ID do usuário é obrigatório"),
  day: yup.string().required("Data é obrigatória"),
  type: yup.string().required("Tipo é obrigatório"),
  description: yup.string().required("Descrição é obrigatória"),
  title: yup.mixed().required("Título é obrigatório")
});

export const deletePresenceDaySchema = yup.object().shape({
  presenceday_id: yup.string().required("ID do dia de presença é obrigatório")
}); 