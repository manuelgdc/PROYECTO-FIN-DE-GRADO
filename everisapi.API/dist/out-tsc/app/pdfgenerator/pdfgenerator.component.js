var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, ViewChild } from '@angular/core';
import { AppComponent } from 'app/app.component';
import { Router } from '@angular/router';
import { SectionService } from 'app/services/SectionService';
import { DatePipe } from '@angular/common';
var PdfgeneratorComponent = /** @class */ (function () {
    function PdfgeneratorComponent(_appComponent, _router, _sectionService, datePipe) {
        var _this = this;
        this._appComponent = _appComponent;
        this._router = _router;
        this._sectionService = _sectionService;
        this.datePipe = datePipe;
        this.ListaDeDatos = [];
        this.UserName = "";
        this.Project = null;
        this.Evaluacion = null;
        this.Mostrar = false;
        //Datos de la barras
        this.barChartType = 'bar';
        this.barChartLegend = true;
        this.ListaNPreguntas = [];
        this.ListaNRespuestas = [];
        this.ListaNombres = [];
        //Datos para la grafica
        this.barChartOptions = {
            scaleShowVerticalLines: true,
            responsive: true
        };
        //Estos son los datos introducidos en la grafica para que represente sus formas
        this.barChartData = [
            { data: this.ListaNPreguntas, label: 'Nº total de preguntas' },
            { data: this.ListaNRespuestas, label: 'Preguntas Respondidas' }
        ];
        //Recupera los datos y los comprueba
        this.Project = this._appComponent._storageDataService.UserProjectSelected;
        this.Evaluacion = this._appComponent._storageDataService.EvaluacionToPDF;
        if (this._appComponent._storageDataService.UserData == undefined || this._appComponent._storageDataService.UserData == null) {
            this.UserName = localStorage.getItem("user");
            if (this.UserName == undefined || this.UserName == null || this.UserName == "") {
                this._router.navigate(['/login']);
            }
            if (this.Project == null || this.Project == undefined || this.Evaluacion == null || this.Evaluacion == undefined) {
                this._router.navigate(['/home']);
            }
        }
        else {
            this.UserName = this._appComponent._storageDataService.UserData.nombre;
        }
        //Recoge los datos del servicio
        this._sectionService.getSectionInfo(this.Evaluacion.id).subscribe(function (res) {
            _this.ListaDeDatos = res;
            _this.shareDataToChart();
        }, function (error) {
            console.log("Error al recoger los datos.");
        });
    }
    PdfgeneratorComponent.prototype.ngOnInit = function () {
    };
    //Da los datos a las diferentes listas que usaremos para las graficas
    PdfgeneratorComponent.prototype.shareDataToChart = function () {
        for (var i = 0; i < this.ListaDeDatos.length; i++) {
            this.ListaNombres.push(this.ListaDeDatos[i].nombre);
            this.ListaNPreguntas.push(this.ListaDeDatos[i].preguntas);
            this.ListaNRespuestas.push(this.ListaDeDatos[i].respuestas);
        }
        this.Mostrar = true;
    };
    PdfgeneratorComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    //Genera un pdf a partir de una captura de pantalla
    //Mediante css eliminamos los componentes que no deseamos
    PdfgeneratorComponent.prototype.downloadPDF = function () {
        var date = this.datePipe.transform(this.Evaluacion.fecha, 'MM-dd-yyyy');
        document.title = this.Evaluacion.nombre + date + "ScrumMeter";
        window.print();
    };
    __decorate([
        ViewChild('content'),
        __metadata("design:type", ElementRef)
    ], PdfgeneratorComponent.prototype, "content", void 0);
    PdfgeneratorComponent = __decorate([
        Component({
            selector: 'app-pdfgenerator',
            templateUrl: './pdfgenerator.component.html',
            styleUrls: ['./pdfgenerator.component.scss'],
            providers: [SectionService, DatePipe]
        }),
        __metadata("design:paramtypes", [AppComponent,
            Router,
            SectionService,
            DatePipe])
    ], PdfgeneratorComponent);
    return PdfgeneratorComponent;
}());
export { PdfgeneratorComponent };
//# sourceMappingURL=C:/Users/Manuel/Desktop/finalScrum-2/ScrumMeter/everisapi.API/src/app/pdfgenerator/pdfgenerator.component.js.map