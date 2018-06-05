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
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { GLOBAL } from './global';
var EvaluacionService = /** @class */ (function () {
    function EvaluacionService(_http) {
        this._http = _http;
        this.url = GLOBAL.url;
    }
    //Este metodo recoge todas las evaluaciones de la base de datos
    EvaluacionService.prototype.getEvaluaciones = function () {
        return this._http.get(this.url + 'evaluaciones')
            .map(function (response) { return response.json(); })
            .catch(this.errorHandler);
    };
    //Este metodo recoge una evaluacion si existe mediante una id de evaluacion
    EvaluacionService.prototype.getEvaluacion = function (id) {
        return this._http.get(this.url + 'evaluaciones/' + id)
            .map(function (response) { return response.json(); })
            .catch(this.errorHandler);
    };
    //Este metodo recoge una evaluacion con datos extendidos si existe mediante una id de evaluacion
    EvaluacionService.prototype.getEvaluacionInfo = function (id) {
        return this._http.get(this.url + 'evaluaciones/proyecto/' + id + '/info')
            .map(function (response) { return response.json(); })
            .catch(this.errorHandler);
    };
    //Este metodo recoge una evaluacion de un proyecto si existe mediante una id de proyecto
    EvaluacionService.prototype.getEvaluacionFromProject = function (id) {
        return this._http.get(this.url + 'evaluaciones/proyecto/' + id)
            .map(function (response) { return response.json(); })
            .catch(this.errorHandler);
    };
    //Devuelve una evaluacion si existe una que no se completo en ese proyecto
    EvaluacionService.prototype.getIncompleteEvaluacionFromProject = function (id) {
        return this._http.get(this.url + 'evaluaciones/proyecto/' + id + '/continue')
            .map(function (response) { return response.json(); })
            .catch(this.errorHandler);
    };
    //Nos permite incluir una evaluacion en la base de datos
    EvaluacionService.prototype.addEvaluacion = function (evaluacion) {
        var params = JSON.stringify(evaluacion);
        var headers = new Headers({
            'Content-Type': 'application/json'
        });
        return this._http.post(this.url + 'evaluaciones', params, { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(this.errorHandler);
    };
    //Nos permite realizar un update de una evaluacion en la base de datos
    EvaluacionService.prototype.updateEvaluacion = function (evaluacion) {
        var params = JSON.stringify(evaluacion);
        var headers = new Headers({
            'Content-Type': 'application/json'
        });
        return this._http.put(this.url + 'evaluaciones', params, { headers: headers })
            .map(function (res) { return res; })
            .catch(this.errorHandler);
    };
    //Implementamos este metodo para permitir la recogida de los errores y su gestión
    EvaluacionService.prototype.errorHandler = function (error) {
        return Observable.throw(error.status);
    };
    EvaluacionService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http])
    ], EvaluacionService);
    return EvaluacionService;
}());
export { EvaluacionService };
//# sourceMappingURL=C:/Users/Manuel/Desktop/finalScrum-2/ScrumMeter/everisapi.API/src/app/services/EvaluacionService.js.map