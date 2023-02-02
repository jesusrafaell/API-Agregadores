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
exports.RifDto = void 0;
const class_validator_1 = require("class-validator");
const messages_validator_1 = require("./messages-validator");
const new_commerce_dto_1 = require("./new-commerce.dto");
class RifDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(messages_validator_1.default.textNotEmpty),
    (0, class_validator_1.Length)(7, 10, messages_validator_1.default.textLength),
    (0, class_validator_1.Validate)(new_commerce_dto_1.RifValidation, {
        message: 'Rif debe con una sola letra Ej:V,J,R',
    }),
    __metadata("design:type", String)
], RifDto.prototype, "comerRif", void 0);
exports.RifDto = RifDto;
//# sourceMappingURL=index.js.map