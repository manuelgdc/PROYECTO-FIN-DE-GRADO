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
import { EvaluacionService } from '../services/EvaluacionService';
import { ProyectoService } from '../services/ProyectoService';
import { AppComponent } from '../app.component';
import { Router } from "@angular/router";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
var MenunewevaluationComponent = /** @class */ (function () {
    function MenunewevaluationComponent(_proyectoService, _sectionService, _router, _evaluacionService, _appComponent, modalService) {
        var _this = this;
        this._proyectoService = _proyectoService;
        this._sectionService = _sectionService;
        this._router = _router;
        this._evaluacionService = _evaluacionService;
        this._appComponent = _appComponent;
        this.modalService = modalService;
        this.ErrorMessage = null;
        this.ListaDeDatos = [];
        this.Evaluacion = null;
        //Empezamos cargando el usuario en el componente mientras verificamos si esta logueado
        //En caso de no estar logeado nos enviara devuelta al login
        //En caso de no tener asignado ningun proyecto nos enviara a home para que lo seleccionemos
        this.ProjectSelected = this._appComponent._storageDataService.UserProjectSelected;
        this.Evaluacion = this._appComponent._storageDataService.Evaluacion;
        if (!this._proyectoService.verificarUsuario()) {
            this._router.navigate(['/login']);
        }
        else if (this.ProjectSelected == null || this.ProjectSelected == undefined || this.Evaluacion == null || this.Evaluacion == undefined) {
            this._router.navigate(['/home']);
        }
        //Recogemos el nombre del usuario con el que nos logueamos
        this.UserSelected = this._proyectoService.UsuarioLogeado;
        //Recogemos todos los datos
        this._sectionService.getSectionInfo(this.Evaluacion.id).subscribe(function (res) {
            _this.ListaDeDatos = res;
        }, function (error) {
            console.log("Error al recoger los datos.");
        });
    }
    MenunewevaluationComponent.prototype.ngOnInit = function () {
    };
    //Calcula el total de las ceremonias que llevamos completadas de forma dinamica
    MenunewevaluationComponent.prototype.CalcularPorcentaje = function (preguntasRespondidas, totalPreguntas) {
        //Calculamos el porcentaje de las preguntas respondidas a partir del total
        var Total = (preguntasRespondidas / totalPreguntas) * 100;
        //Redondeamos el porcentaje obtenido y lo devolvemos
        return Math.round(Total * 10) / 10;
    };
    //Permite refirigir y guardar la id de la sección seleccionada
    MenunewevaluationComponent.prototype.RedirectToAsignaciones = function (id) {
        this._appComponent._storageDataService.IdSection = id;
        this._router.navigate(['/nuevaevaluacion']);
    };
    //Este metodo guarda la evaluacion y cambia su estado como finalizado
    MenunewevaluationComponent.prototype.FinishEvaluation = function () {
        var _this = this;
        this.Evaluacion.estado = true;
        this._evaluacionService.updateEvaluacion(this.Evaluacion).subscribe(function (res) {
            _this._router.navigate(['/home']);
        }, function (error) {
            console.log("ocurrio un error en el update: " + error);
        });
    };
    MenunewevaluationComponent.prototype.AbrirModal = function (content) {
        var _this = this;
        this.modalService.open(content).result.then(function (closeResult) {
            //Esto realiza la acción de cerrar la ventana
            //Console.log("Cerro la ventana con: ", content);
        }, function (dismissReason) {
            if (dismissReason == 'Home') {
                //Si no desea finalizar lo mandaremos a home
                _this._router.navigate(['/home']);
            }
            else if (dismissReason == 'Finish') {
                //Si decide finalizarlo usaremos el metodo para finalizar la evaluación
                _this.FinishEvaluation();
            }
        });
    };
    MenunewevaluationComponent = __decorate([
        Component({
            selector: 'app-menunewevaluation',
            templateUrl: './menunewevaluation.component.html',
            styleUrls: ['./menunewevaluation.component.scss'],
            providers: [SectionService, ProyectoService, EvaluacionService]
        }),
        __metadata("design:paramtypes", [ProyectoService,
            SectionService,
            Router,
            EvaluacionService,
            AppComponent,
            NgbModal])
    ], MenunewevaluationComponent);
    return MenunewevaluationComponent;
}());
export { MenunewevaluationComponent };
//# sourceMappingURL=C:/Users/Manuel/Desktop/finalScrum-2/ScrumMeter/everisapi.API/src/app/menunewevaluation/menunewevaluation.component.js.map