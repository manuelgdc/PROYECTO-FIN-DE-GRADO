var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { GLOBAL } from './global';
var SectionService = /** @class */ (function () {
    function SectionService(_http) {
        this._http = _http;
        this.url = GLOBAL.url;
    }
    //Este metodo recoge todos los usuarios de la base de datos
    SectionService.prototype.getSections = function () {
        return this._http.get(this.url + 'sections')
            .map(function (response) { return response.json(); })
            .catch(this.errorHandler);
    };
    //Este metodo recoge un usuario si existe mediante un nombre de usuario
    SectionService.prototype.getOneSection = function (id) {
        return this._http.get(this.url + 'sections/' + id)
            .map(function (response) { return response.json(); })
            .catch(this.errorHandler);
    };
    //Este metodo recoge un usuario si existe mediante un nombre de usuario
    SectionService.prototype.getAsignacionesSection = function (id) {
        return this._http.get(this.url + 'sections/' + id + '/asignaciones')
            .map(function (response) { return response.json(); })
            .catch(this.errorHandler);
    };
    //Devuelve el numero de preguntas para cada sección segun que proyecto selecciones
    SectionService.prototype.getPreguntasSection = function (idSection, idProject) {
        return this._http.get(this.url + 'sections/' + idSection + '/evaluacion/' + idProject + "/preguntas")
            .map(function (response) { return response.json(); })
            .catch(this.errorHandler);
    };
    //Devuelve el numero de respuestas correctas para cada sección segun que proyecto selecciones
    SectionService.prototype.getRespuestasSection = function (idSection, idProject) {
        return this._http.get(this.url + 'sections/' + idSection + '/evaluacion/' + idProject + "/respuestas")
            .map(function (response) { return response.json(); })
            .catch(this.errorHandler);
    };
    //Recoge todos los datos extendidos de una evaluación
    SectionService.prototype.getSectionInfo = function (idEvaluacion) {
        return this._http.get(this.url + 'sections/evaluacion/' + idEvaluacion)
            .map(function (response) { return response.json(); })
            .catch(this.errorHandler);
    };
    //Devuelve las preguntas para una asignación en especifico
    SectionService.prototype.getPreguntasArea = function (id) {
        return this._http.get(this.url + 'asignaciones/' + id + '/preguntas')
            .map(function (response) { return response.json(); })
            .catch(this.errorHandler);
    };
    //Implementamos este metodo para permitir la recogida de los errores y su gestión
    SectionService.prototype.errorHandler = function (error) {
        return Observable.throw(error.status);
    };
    SectionService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http])
    ], SectionService);
    return SectionService;
}());
export { SectionService };
//# sourceMappingURL=C:/Users/Manuel/Desktop/finalScrum-2/ScrumMeter/everisapi.API/src/app/services/SectionService.js.map