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
exports.CommerceDto = exports.LocationDTO = exports.SizeOneOrTwo = exports.RifValidation = void 0;
const class_validator_1 = require("@nestjs/class-validator");
const class_transformer_1 = require("class-transformer");
const class_validator_2 = require("class-validator");
const messages_validator_1 = require("./messages-validator");
let RifValidation = class RifValidation {
    validate(text) {
        return /(^[VEJR]{1})([0-9]+$)/.test(text);
    }
    defaultMessage() {
        return '$property debe comenzar con una letra Ej:V,J,R';
    }
};
RifValidation = __decorate([
    (0, class_validator_2.ValidatorConstraint)({ name: 'customText', async: false })
], RifValidation);
exports.RifValidation = RifValidation;
let SizeOneOrTwo = class SizeOneOrTwo {
    validate(num) {
        return num == 1 || num == 2;
    }
    defaultMessage() {
        return '$property esta fuera de rango debe ser 1 o 2';
    }
};
SizeOneOrTwo = __decorate([
    (0, class_validator_2.ValidatorConstraint)({ name: 'customRange', async: false })
], SizeOneOrTwo);
exports.SizeOneOrTwo = SizeOneOrTwo;
class LocationDTO {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(messages_validator_1.default.textNotEmpty),
    __metadata("design:type", String)
], LocationDTO.prototype, "estado", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(messages_validator_1.default.textNotEmpty),
    __metadata("design:type", String)
], LocationDTO.prototype, "municipio", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(messages_validator_1.default.textNotEmpty),
    __metadata("design:type", String)
], LocationDTO.prototype, "ciudad", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(messages_validator_1.default.textNotEmpty),
    __metadata("design:type", String)
], LocationDTO.prototype, "parroquia", void 0);
exports.LocationDTO = LocationDTO;
class Days {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(messages_validator_1.default.textNotEmpty),
    (0, class_validator_1.IsBoolean)(messages_validator_1.default.isBoolean),
    __metadata("design:type", Boolean)
], Days.prototype, "Lun", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(messages_validator_1.default.textNotEmpty),
    (0, class_validator_1.IsBoolean)(messages_validator_1.default.isBoolean),
    __metadata("design:type", Boolean)
], Days.prototype, "Mar", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(messages_validator_1.default.textNotEmpty),
    (0, class_validator_1.IsBoolean)(messages_validator_1.default.isBoolean),
    __metadata("design:type", Boolean)
], Days.prototype, "Mie", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(messages_validator_1.default.textNotEmpty),
    (0, class_validator_1.IsBoolean)(messages_validator_1.default.isBoolean),
    __metadata("design:type", Boolean)
], Days.prototype, "Jue", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(messages_validator_1.default.textNotEmpty),
    (0, class_validator_1.IsBoolean)(messages_validator_1.default.isBoolean),
    __metadata("design:type", Boolean)
], Days.prototype, "Vie", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(messages_validator_1.default.textNotEmpty),
    (0, class_validator_1.IsBoolean)(messages_validator_1.default.isBoolean),
    __metadata("design:type", Boolean)
], Days.prototype, "Sab", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(messages_validator_1.default.textNotEmpty),
    (0, class_validator_1.IsBoolean)(messages_validator_1.default.isBoolean),
    __metadata("design:type", Boolean)
], Days.prototype, "Dom", void 0);
class Contact {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(messages_validator_1.default.textNotEmpty),
    __metadata("design:type", String)
], Contact.prototype, "contNombres", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(messages_validator_1.default.textNotEmpty),
    __metadata("design:type", String)
], Contact.prototype, "contApellidos", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(messages_validator_1.default.textNotEmpty),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Contact.prototype, "contTelefLoc", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(messages_validator_1.default.textNotEmpty),
    __metadata("design:type", String)
], Contact.prototype, "contTelefMov", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(messages_validator_1.default.textNotEmpty),
    __metadata("design:type", String)
], Contact.prototype, "contMail", void 0);
class CommerceData {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(messages_validator_1.default.textNotEmpty),
    (0, class_validator_1.Length)(6, 10, messages_validator_1.default.textLength),
    (0, class_validator_1.Validate)(RifValidation),
    __metadata("design:type", String)
], CommerceData.prototype, "comerRif", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(messages_validator_1.default.textNotEmpty),
    (0, class_validator_1.Length)(15, 15, messages_validator_1.default.afiliadoLength),
    __metadata("design:type", String)
], CommerceData.prototype, "idActivityXAfiliado", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CommerceData.prototype, "comerDesc", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(messages_validator_1.default.textNotEmpty),
    (0, class_validator_1.Validate)(SizeOneOrTwo),
    __metadata("design:type", Number)
], CommerceData.prototype, "comerTipoPer", void 0);
__decorate([
    (0, class_validator_1.Length)(20, 20, messages_validator_1.default.cuentaBanco),
    __metadata("design:type", String)
], CommerceData.prototype, "comerCuentaBanco", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Validate)(SizeOneOrTwo),
    __metadata("design:type", Number)
], CommerceData.prototype, "comerCodTipoCont", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(4, 4, messages_validator_1.default.cuentaBanco),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CommerceData.prototype, "comerCodigoBanco2", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20, messages_validator_1.default.cuentaBanco),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CommerceData.prototype, "comerCuentaBanco2", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(4, 4, messages_validator_1.default.cuentaBanco),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CommerceData.prototype, "comerCodigoBanco3", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20, messages_validator_1.default.cuentaBanco),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CommerceData.prototype, "comerCuentaBanco3", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsObject)(messages_validator_1.default.isObject),
    (0, class_validator_1.IsNotEmptyObject)({ nullable: false }, messages_validator_1.default.isDefined),
    (0, class_transformer_1.Type)(() => LocationDTO),
    __metadata("design:type", LocationDTO)
], CommerceData.prototype, "locationCommerce", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsObject)(messages_validator_1.default.isObject),
    (0, class_validator_1.IsNotEmptyObject)({ nullable: false }, messages_validator_1.default.isDefined),
    (0, class_transformer_1.Type)(() => LocationDTO),
    __metadata("design:type", LocationDTO)
], CommerceData.prototype, "locationContact", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsObject)(messages_validator_1.default.isObject),
    (0, class_validator_1.IsNotEmptyObject)({ nullable: false }, messages_validator_1.default.isDefined),
    (0, class_transformer_1.Type)(() => LocationDTO),
    __metadata("design:type", LocationDTO)
], CommerceData.prototype, "locationPos", void 0);
__decorate([
    (0, class_validator_1.IsNotEmptyObject)({ nullable: false }, messages_validator_1.default.isDefined),
    (0, class_transformer_1.Type)(() => Days),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", Days)
], CommerceData.prototype, "daysOperacion", void 0);
class CommerceDto {
}
__decorate([
    (0, class_validator_1.IsObject)(messages_validator_1.default.isObject),
    (0, class_validator_1.IsNotEmptyObject)({ nullable: false }, messages_validator_1.default.isDefined),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CommerceData),
    __metadata("design:type", CommerceData)
], CommerceDto.prototype, "commerce", void 0);
__decorate([
    (0, class_validator_1.IsObject)(messages_validator_1.default.isObject),
    (0, class_validator_1.IsNotEmptyObject)({ nullable: false }, messages_validator_1.default.isDefined),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => Contact),
    __metadata("design:type", Contact)
], CommerceDto.prototype, "contacto", void 0);
exports.CommerceDto = CommerceDto;
//# sourceMappingURL=new-commerce.dto.js.map