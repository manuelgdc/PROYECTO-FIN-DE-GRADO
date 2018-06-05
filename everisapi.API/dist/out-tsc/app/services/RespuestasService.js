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
import { Http, Headers } from '@angular/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { GLOBAL } from './global';
var RespuestasService = /** @class */ (function () {
    function RespuestasService(_http) {
        this._http = _http;
        this.url = GLOBAL.url;
    }
    //Este metodo devuelve todas las respuestas de una asignacion en un proyecto
    RespuestasService.prototype.getRespuestasAsigProy = function (idEvaluacion, idAsignacion) {
        return this._http.get(this.url + 'respuestas/evaluacion/' + idEvaluacion + '/asignacion/' + idAsignacion)
            .map(function (response) { return response.json(); })
            .catch(this.errorHandler);
    };
    //Este metodo devuelve un listado con sus preguntas y respuestas de una evaluación y su asignación
    RespuestasService.prototype.getRespuestasAsig = function (idEvaluacion, idAsig) {
        return this._http.get(this.url + 'asignaciones/evaluacion/' + idEvaluacion + '/asignacion/' + idAsig)
            .map(function (response) { return response.json(); })
            .catch(this.errorHandler);
    };
    //Este metodo altera el valor de la respuesta en la base de datos
    RespuestasService.prototype.AlterEstadoRespuesta = function (id, change) {
        var httpParams = new HttpParams();
        var headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        return this._http.put(this.url + 'respuestas/' + id + '/change/' + change, httpParams, { headers: headers })
            .map(function (res) { return res; });
    };
    //Implementamos este metodo para permitir la recogida de los errores y su gestión
    RespuestasService.prototype.errorHandler = function (error) {
        return Observable.throw(error.status);
    };
    RespuestasService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http])
    ], RespuestasService);
    return RespuestasService;
}());
export { RespuestasService };
//# sourceMappingURL=C:/Users/Manuel/Desktop/finalScrum-2/ScrumMeter/everisapi.API/src/app/services/RespuestasService.js.map