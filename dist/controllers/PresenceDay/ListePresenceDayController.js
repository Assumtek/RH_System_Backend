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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListePresenceDayController = void 0;
const ListPresenceDayService_1 = require("../../services/PresenceDay/ListPresenceDayService");
class ListePresenceDayController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const listPresenceDayService = new ListPresenceDayService_1.ListPresenceDayService();
            const listPresenceDay = yield listPresenceDayService.execute();
            res.json(listPresenceDay);
        });
    }
}
exports.ListePresenceDayController = ListePresenceDayController;
