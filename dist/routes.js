"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
// Middlewares
const isAuthenticated_1 = require("./middlewares/isAuthenticated");
// Controllers
const CreateUserController_1 = require("./controllers/user/CreateUserController");
const AuthUserController_1 = require("./controllers/user/AuthUserController");
const DetailUserController_1 = require("./controllers/user/DetailUserController");
const EditActiveUserController_1 = require("./controllers/user/EditActiveUserController");
const ListeUserController_1 = require("./controllers/user/ListeUserController");
const ListePresenceDayController_1 = require("./controllers/PresenceDay/ListePresenceDayController");
const CreatePresenceDayController_1 = require("./controllers/PresenceDay/CreatePresenceDayController");
const DeletePresenceDayController_1 = require("./controllers/PresenceDay/DeletePresenceDayController");
const CreateAttendanceController_1 = require("./controllers/Attendance/CreateAttendanceController");
const router = (0, express_1.Router)();
exports.router = router;
// Configuração do envio de arquivos
router.get('/', (req, res) => {
    return res.send(`
    <h1 style='font-family: sans-serif'>
        API ClassSysten!!! 👩‍🏫
    <h1>
  `);
});
// USER //
// Cria um novo usuario
router.post('/users', new CreateUserController_1.CreateUserController().handle);
// Pega todos os usuarios e seus cursos
router.get('/users', isAuthenticated_1.isAuthenticated, new ListeUserController_1.ListUserContoller().handle);
// Desativa um usuario
router.post('/users/edit', isAuthenticated_1.isAuthenticated, new EditActiveUserController_1.EditActiveUserController().handle);
// Faz a altenticação de login do usuario
router.post('/login', new AuthUserController_1.AuthUserController().handle);
// Pega os detalhes do usuario logado
router.get('/me', isAuthenticated_1.isAuthenticated, new DetailUserController_1.DetailUserController().handle);
// PRESENCE DAY //
// Pega todas as escalas do sistema
router.get('/presenceday', isAuthenticated_1.isAuthenticated, new ListePresenceDayController_1.ListePresenceDayController().handle);
// Cria um novo dia de trabalho
router.post('/presenceday', isAuthenticated_1.isAuthenticated, new CreatePresenceDayController_1.CreatePresenceDayController().handle);
// Delta presnece day
router.delete('/presenceday', isAuthenticated_1.isAuthenticated, new DeletePresenceDayController_1.DeletePresenceDayController().handle);
// ATTENDANCE //
// Cria um registro de ponto
router.post('/attendance', isAuthenticated_1.isAuthenticated, new CreateAttendanceController_1.CreateAttendanceController().handle);
