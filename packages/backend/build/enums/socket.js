"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmitEvents = exports.ReceiveEvents = void 0;
var ReceiveEvents;
(function (ReceiveEvents) {
    ReceiveEvents["CONNECTION"] = "connection";
    ReceiveEvents["START_TYPING"] = "typing";
    ReceiveEvents["STOP_TYPING"] = "stopTyping";
    ReceiveEvents["SEND_MESSAGE"] = "sendMessage";
    ReceiveEvents["UPDATE_ACTIVITY"] = "updateActivity";
    ReceiveEvents["UNSUBSCRIBE"] = "unsubscribe";
    ReceiveEvents["REQUEST_PREV_MESSAGES"] = "requestPrevMessages";
})(ReceiveEvents = exports.ReceiveEvents || (exports.ReceiveEvents = {}));
var EmitEvents;
(function (EmitEvents) {
    EmitEvents["CONNECT"] = "connect";
    EmitEvents["DISCONNECT"] = "disconnect";
    EmitEvents["ERROR_MESSAGE"] = "errorMessage";
    EmitEvents["GET_MESSAGES"] = "getMessages";
    EmitEvents["GET_CHAT"] = "getChat";
    EmitEvents["USER_START_TYPING"] = "typing";
    EmitEvents["USER_STOP_TYPING"] = "stopTyping";
    EmitEvents["NEW_MESSAGE"] = "newMessage";
    EmitEvents["MESSAGE_SENT"] = "messageSent";
})(EmitEvents = exports.EmitEvents || (exports.EmitEvents = {}));
//# sourceMappingURL=socket.js.map