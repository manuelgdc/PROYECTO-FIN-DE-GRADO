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
import { AppComponent } from '../app.component';
var ProyectoService = /** @class */ (function () {
    function ProyectoService(_http, _app) {
        this._http = _http;
        this._app = _app;
        this.url = GLOBAL.url;
    }
    //Este metdo nos permite verificar si el usuario ya esta logeado en la web
    //Puede estar recordado o puede estar iniciado solo para esta sesión
    //Si no esta logeado de ninguna manera enviara false
    ProyectoService.prototype.verificarUsuario = function () {
        var local = localStorage.getItem("user");
        var storage = this._app._storageDataService.UserData;
        if (local != null && local != undefined) {
            this.UsuarioLogeado = localStorage.getItem("user");
            return true;
        }
        else if (storage != undefined && storage != null) {
            this.UsuarioLogeado = this._app._storageDataService.UserData.nombre;
            return true;
        }
        else {
            return false;
        }
    };
    //Este metodo devuelve todos los proyectos de todos los usuarios
    ProyectoService.prototype.getAllProyectos = function () {
        return this._http.get(this.url + 'users/fullproyectos')
            .map(function (response) { return response.json(); })
            .catch(this.errorHandler);
    };
    //Este metodo recoge todos los proyectos de un usuario de la base de datos
    ProyectoService.prototype.getProyectosDeUsuario = function () {
        return this._http.get(this.url + 'users/' + this.UsuarioLogeado + "/proyectos")
            .map(function (response) { return response.json(); })
            .catch(this.errorHandler);
    };
    //Este metodo recoge un proyecto de un usuario si existe mediante un nombre de usuario y su id de proyecto
    ProyectoService.prototype.getOneProjecto = function (idProyecto) {
        return this._http.get(this.url + 'users/' + this.UsuarioLogeado + '/proyecto/' + idProyecto)
            .map(function (response) { return response.json(); })
            .catch(this.errorHandler);
    };
    //Este metodo devuelve todos los permisos de un usuario
    ProyectoService.prototype.getRolesUsuario = function () {
        return this._http.get(this.url + 'users/' + this.UsuarioLogeado + '/roles')
            .map(function (response) { return response.json(); })
            .catch(this.errorHandler);
    };
    //Implementamos este metodo para permitir la recogida de los errores y su gestión
    ProyectoService.prototype.errorHandler = function (error) {
        return Observable.throw(error.status);
    };
    ProyectoService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http,
            AppComponent])
    ], ProyectoService);
    return ProyectoService;
}());
export { ProyectoService };
//# sourceMappingURL=C:/Users/Manuel/Desktop/finalScrum-2/ScrumMeter/everisapi.API/src/app/services/ProyectoService.js.map