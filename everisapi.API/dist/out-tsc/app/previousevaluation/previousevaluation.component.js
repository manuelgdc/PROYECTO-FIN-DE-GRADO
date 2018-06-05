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
import { AppComponent } from 'app/app.component';
import { Router } from '@angular/router';
import { EvaluacionService } from '../services/EvaluacionService';
var PreviousevaluationComponent = /** @class */ (function () {
    function PreviousevaluationComponent(_appComponent, _router, _evaluacionService) {
        this._appComponent = _appComponent;
        this._router = _router;
        this._evaluacionService = _evaluacionService;
        this.clicked = true;
        this.EvaluacionBuscada = { 'id': null, 'nombre': '', 'estado': null, 'fecha': '', 'userNombre': null, 'nPreguntas': null, 'nRespuestas': null };
        this.nrespuestas = '';
        this.FiltrarCompletados = null;
        this.UserName = "";
        this.Project = { 'id': null, 'nombre': '', 'fecha': null };
        this.Mostrar = false;
        this.PageNow = 1;
        this.NumMax = 0;
    }
    PreviousevaluationComponent.prototype.ngOnInit = function () {
        var _this = this;
        //Inicializar 
        this.Restablecer();
        //Recogemos los proyectos y realizamos comprobaciones
        this.Project = this._appComponent._storageDataService.UserProjectSelected;
        if (this._appComponent._storageDataService.UserData == undefined || this._appComponent._storageDataService.UserData == null) {
            this.UserName = localStorage.getItem("user");
            if (this.UserName == undefined || this.UserName == null || this.UserName == "") {
                this._router.navigate(['/login']);
            }
            if (this.Project == null || this.Project == undefined) {
                this._router.navigate(['/home']);
            }
        }
        else {
            this.UserName = this._appComponent._storageDataService.UserData.nombre;
        }
        //Recoge la información extendida necesaria para la lista de evaluaciones
        this._evaluacionService.getEvaluacionInfo(this.Project.id).subscribe(function (res) {
            _this.ListaDeEvaluaciones = res;
            _this.CalcularPaginas();
            _this.paginacionLista(0);
            _this.Mostrar = true;
        }, function (error) {
            console.log("Error recoger listado de evaluaciones: " + error);
        });
    };
    //Este metodo devuelve el número de paginas máximo que hay
    PreviousevaluationComponent.prototype.CalcularPaginas = function () {
        var NumeroDePaginas = Math.floor((this.ListaDeEvaluaciones.length / 5) * 100) / 100;
        if (NumeroDePaginas % 1 != 0) {
            this.NumMax = Math.floor(NumeroDePaginas) + 1;
        }
        else {
            this.NumMax = NumeroDePaginas;
        }
    };
    //Restablece los datos de la busqueda
    PreviousevaluationComponent.prototype.Restablecer = function () {
        if (this.clicked) {
            this.EvaluacionBuscada.fecha = "";
            this.EvaluacionBuscada.nombre = "";
            this.EvaluacionBuscada.userNombre = "";
            this.EvaluacionBuscada.nPreguntas = null;
            this.EvaluacionBuscada.nRespuestas = null;
            this.EvaluacionBuscada.estado = null;
            this.nrespuestas = '';
            this.clicked = false;
        }
        else {
            this.clicked = true;
        }
    };
    //Este metodo devuelve la transforma la lista de evaluaciones dada en una lista paginada
    PreviousevaluationComponent.prototype.paginacionLista = function (pageNumber) {
        var Skip = pageNumber * 5;
        var ListaPaginada = new Array();
        var contador = Skip;
        while (ListaPaginada.length != 5 && contador < this.ListaDeEvaluaciones.length) {
            ListaPaginada.push(this.ListaDeEvaluaciones[contador]);
            contador++;
        }
        this.ListaDeEvaluacionesPaginada = ListaPaginada;
    };
    //Utiliza los datos del filtrado para realizar un filtrado en el array
    PreviousevaluationComponent.prototype.Busqueda = function () {
        var _this = this;
        var BuscaPersonalizada = this.ListaDeEvaluacionesPaginada;
        this.CalcularPaginas();
        //Si no filtra por completos o incompletos
        if (this.FiltrarCompletados == null) {
            BuscaPersonalizada = this.ListaDeEvaluacionesPaginada.filter(function (x) { return x.fecha.includes(_this.EvaluacionBuscada.fecha) &&
                x.nombre.includes(_this.EvaluacionBuscada.nombre) &&
                x.userNombre.includes(_this.EvaluacionBuscada.userNombre) &&
                String(x.nRespuestas).includes(_this.nrespuestas); });
        }
        else {
            //Filtrando por completos
            if (this.FiltrarCompletados) {
                BuscaPersonalizada = this.ListaDeEvaluacionesPaginada.filter(function (x) { return x.estado &&
                    x.fecha.includes(_this.EvaluacionBuscada.fecha) &&
                    x.nombre.includes(_this.EvaluacionBuscada.nombre) &&
                    x.userNombre.includes(_this.EvaluacionBuscada.userNombre) &&
                    String(x.nRespuestas).includes(_this.nrespuestas); });
            }
            else {
                //Filtrando por incompletos
                BuscaPersonalizada = this.ListaDeEvaluacionesPaginada.filter(function (x) { return x.estado == false &&
                    x.fecha.includes(_this.EvaluacionBuscada.fecha) &&
                    x.nombre.includes(_this.EvaluacionBuscada.nombre) &&
                    x.userNombre.includes(_this.EvaluacionBuscada.userNombre) &&
                    String(x.nRespuestas).includes(_this.nrespuestas); });
            }
        }
        return BuscaPersonalizada;
    };
    //Guarda los datos en el storage y cambia de ruta hacia la generación de grafica
    PreviousevaluationComponent.prototype.SaveDataToPDF = function (evaluacion) {
        this._appComponent._storageDataService.EvaluacionToPDF = evaluacion;
        this._router.navigate(['/pdfgenerator']);
    };
    //Filtra por evaluaciones completas completas o ninguna
    PreviousevaluationComponent.prototype.ChangeFiltro = function (estado) {
        this.FiltrarCompletados = estado;
    };
    //Al presionar el boton va avanzado y retrocediendo
    PreviousevaluationComponent.prototype.NextPreviousButton = function (Option) {
        if (Option && this.PageNow < this.NumMax) {
            this.paginacionLista(this.PageNow++);
        }
        else if (!Option && this.PageNow > 1) {
            this.PageNow--;
            var CualToca = this.PageNow - 1;
            this.paginacionLista(CualToca);
        }
    };
    PreviousevaluationComponent = __decorate([
        Component({
            selector: 'app-previousevaluation',
            templateUrl: './previousevaluation.component.html',
            styleUrls: ['./previousevaluation.component.scss'],
            providers: [EvaluacionService]
        }),
        __metadata("design:paramtypes", [AppComponent,
            Router,
            EvaluacionService])
    ], PreviousevaluationComponent);
    return PreviousevaluationComponent;
}());
export { PreviousevaluationComponent };
//# sourceMappingURL=C:/Users/Manuel/Desktop/finalScrum-2/ScrumMeter/everisapi.API/src/app/previousevaluation/previousevaluation.component.js.map