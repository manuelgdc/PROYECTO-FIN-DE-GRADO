var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { SectionService } from '../services/SectionService';
import { RespuestasService } from '../services/RespuestasService';
import { AppComponent } from '../app.component';
import { Router } from "@angular/router";
var NewevaluationComponent = /** @class */ (function () {
    //Recogemos todos los datos de la primera area segun su id y las colocamos en la lista
    function NewevaluationComponent(_sectionService, _respuestasService, _router, _appComponent) {
        var _this = this;
        this._sectionService = _sectionService;
        this._respuestasService = _respuestasService;
        this._router = _router;
        this._appComponent = _appComponent;
        this.ListaAsignaciones = [];
        this.InfoAsignacion = { id: null, nombre: '', preguntas: null };
        this.NumMax = 0;
        this.PageNow = 1;
        this.Project = null;
        this.Evaluation = null;
        this.AreaAsignada = { 'id': 0, 'nombre': "undefined" };
        this.UserName = "";
        this.idSelected = 0;
        this.Deshabilitar = false;
        this.idSelected = this._appComponent._storageDataService.IdSection;
        //Recogemos el proyecto y el usuario si no coincide alguno lo redirigiremos
        this.Project = this._appComponent._storageDataService.UserProjectSelected;
        this.Evaluation = this._appComponent._storageDataService.Evaluacion;
        if (this._appComponent._storageDataService.UserData == undefined || this._appComponent._storageDataService.UserData == null) {
            this.UserName = localStorage.getItem("user");
            if (this.UserName == undefined || this.UserName == null || this.UserName == "") {
                this._router.navigate(['/login']);
            }
            if (this.Project == null || this.Project == undefined || this.Evaluation == null || this.Evaluation == undefined) {
                this._router.navigate(['/home']);
            }
        }
        else {
            this.UserName = this._appComponent._storageDataService.UserData.nombre;
        }
        this._sectionService.getAsignacionesSection(this.idSelected).subscribe(function (res) {
            if (res != null) {
                _this.ListaAsignaciones = res;
                _this.NumMax = _this.ListaAsignaciones.length;
                _this.getAsignacionActual(_this.Evaluation.id, _this.ListaAsignaciones[0].id);
            }
            else {
                console.log("Esto esta muy vacio");
            }
        }, function (error) {
            console.log("error lista asignaciones");
        });
    }
    NewevaluationComponent.prototype.ngOnInit = function () {
    };
    //Le proporciona a la asignación en la que nos encontramos todos los datos
    NewevaluationComponent.prototype.getAsignacionActual = function (idSelected, idAsignacion) {
        var _this = this;
        this._respuestasService.getRespuestasAsig(idSelected, idAsignacion).subscribe(function (res) {
            if (res != null) {
                _this.InfoAsignacion = res;
                _this.Deshabilitar = false;
            }
            else {
                console.log("Esto esta muy vacio");
            }
        }, function (error) {
            console.log("error lista asignaciones");
        });
    };
    //Cambia el estado de las preguntas
    NewevaluationComponent.prototype.ChangeEstadoDB = function (idarray) {
        var idRespuesta = this.InfoAsignacion.preguntas[idarray].respuesta.id;
        if (this.InfoAsignacion.preguntas[idarray].respuesta.estado) {
            this._respuestasService.AlterEstadoRespuesta(idRespuesta, false).subscribe(function (res) {
                //console.log("Cambio realizado");
            }, function (error) {
                console.log("Cambio fallido ", error);
            });
            this.InfoAsignacion.preguntas[idarray].respuesta.estado = false;
        }
        else {
            this._respuestasService.AlterEstadoRespuesta(idRespuesta, true).subscribe(function (res) {
                //console.log("Cambio realizado");
            }, function (error) {
                console.log("Cambio fallido ", error);
            });
            this.InfoAsignacion.preguntas[idarray].respuesta.estado = true;
        }
    };
    //Al presionar el boton va avanzado y retrocediendo
    NewevaluationComponent.prototype.NextPreviousButton = function (Option) {
        if (Option && this.PageNow < this.NumMax) {
            this.Deshabilitar = true;
            this.AreaAsignada = this.ListaAsignaciones[this.PageNow];
            this.getAsignacionActual(this.Evaluation.id, this.AreaAsignada.id);
            this.PageNow++;
        }
        else if (!Option && this.PageNow > 1) {
            this.PageNow--;
            this.Deshabilitar = true;
            var CualToca = this.PageNow - 1;
            this.AreaAsignada = this.ListaAsignaciones[CualToca];
            this.getAsignacionActual(this.Evaluation.id, this.AreaAsignada.id);
        }
        else if (Option && this.PageNow == this.NumMax) {
            this._router.navigate(['/menunuevaevaluacion']);
        }
    };
    NewevaluationComponent = __decorate([
        Component({
            selector: 'app-newevaluation',
            templateUrl: './newevaluation.component.html',
            styleUrls: ['./newevaluation.component.scss'],
            providers: [SectionService, RespuestasService]
        }),
        __metadata("design:paramtypes", [SectionService,
            RespuestasService,
            Router,
            AppComponent])
    ], NewevaluationComponent);
    return NewevaluationComponent;
}());
export { NewevaluationComponent };
//# sourceMappingURL=C:/Users/Manuel/Desktop/finalScrum-2/ScrumMeter/everisapi.API/src/app/newevaluation/newevaluation.component.js.map