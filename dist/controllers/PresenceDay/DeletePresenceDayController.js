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
exports.DeletePresenceDayController = void 0;
const DeletePreszenceDayService_1 = require("../../services/PresenceDay/DeletePreszenceDayService");
class DeletePresenceDayController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const presenceday_id = req.query.presenceday_id;
            console.log(presenceday_id);
            const deletePreszenceDayService = new DeletePreszenceDayService_1.DeletePreszenceDayService();
            const preszenceDay = yield deletePreszenceDayService.execute({ presenceday_id });
            return res.json(preszenceDay);
        });
    }
}
exports.DeletePresenceDayController = DeletePresenceDayController;
