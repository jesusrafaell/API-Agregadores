"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BodyTermStatusDto = exports.ParamTermDto = exports.CreateTerminalsDto = exports.SizeZeroOrOne = exports.TerminalValidation = void 0;
const class_validator_1 = require("@nestjs/class-validator");
const new_commerce_dto_1 = require("../../commerce/dto/new-commerce.dto");
const messages_validator_1 = require("../../commerce/dto/messages-validator");
let TerminalValidation = class TerminalValidation {
    validate(text) {
        return /(^[0-9]+$)/.test(text);
    }
    defaultMessage() {
        return '$property debe tener 8 numeros';
    }
};
TerminalValidation = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'customText', async: false })
], TerminalValidation);
exports.TerminalValidation = TerminalValidation;
let SizeZeroOrOne = class SizeZeroOrOne {
    validate(num) {
        return num == 0 || num == 1;
    }
    defaultMessage() {
        return '$property esta fuera de rango debe ser 0 o 1';
    }
};
SizeZeroOrOne = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'customRange', async: false })
], SizeZeroOrOne);
exports.SizeZeroOrOne = SizeZeroOrOne;
class CreateTerminalsDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(messages_validator_1.default.textNotEmpty),
    (0, class_validator_1.Length)(8, 8, messages_validator_1.default.textLength),
    (0, class_validator_1.Validate)(new_commerce_dto_1.RifValidation),
    __metadata("design:type", String)
], CreateTerminalsDto.prototype, "comerRif", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateTerminalsDto.prototype, "comerCantPost", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20, messages_validator_1.default.cuentaBanco),
    __metadata("design:type", String)
], CreateTerminalsDto.prototype, "comerCuentaBanco", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(messages_validator_1.default.textNotEmpty),
    (0, class_validator_1.Length)(2, 2, messages_validator_1.default.textLength),
    __metadata("design:type", String)
], CreateTerminalsDto.prototype, "prefijo", void 0);
exports.CreateTerminalsDto = CreateTerminalsDto;
class ParamTermDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(messages_validator_1.default.textNotEmpty),
    (0, class_validator_1.Length)(8, 8, messages_validator_1.default.textLength),
    (0, class_validator_1.Validate)(TerminalValidation, {
        message: 'El terminal deben ser 8 numeros',
    }),
    __metadata("design:type", String)
], ParamTermDto.prototype, "terminal", void 0);
exports.ParamTermDto = ParamTermDto;
class BodyTermStatusDto {
}
__decorate([
    (0, class_validator_1.IsNumber)({}, {
        message: 'Status debe ser de tipo numerico',
    }),
    (0, class_validator_1.IsNotEmpty)(messages_validator_1.default.textNotEmpty),
    (0, class_validator_1.Validate)(SizeZeroOrOne),
    __metadata("design:type", Number)
], BodyTermStatusDto.prototype, "status", void 0);
exports.BodyTermStatusDto = BodyTermStatusDto;
//# sourceMappingURL=create-terminals.dto.js.map