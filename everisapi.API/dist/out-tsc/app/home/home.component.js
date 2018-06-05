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
import { ProyectoService } from '../services/ProyectoService';
import { EvaluacionService } from '../services/EvaluacionService';
import { Router } from "@angular/router";
import { AppComponent } from '../app.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
var HomeComponent = /** @class */ (function () {
    function HomeComponent(_proyectoService, _evaluacionService, modalService, _router, _appComponent) {
        this._proyectoService = _proyectoService;
        this._evaluacionService = _evaluacionService;
        this.modalService = modalService;
        this._router = _router;
        this._appComponent = _appComponent;
        this.ErrorMessage = null;
        this.ListaDeProyectosAdmin = [];
        this.ListaDeProyectos = [];
        this.permisosDeUsuario = [];
        this.AdminOn = false;
        this.Deshabilitar = false;
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        //Empezamos cargando el usuario en el componente mientras verificamos si esta logueado
        //En casao de no estar logeado nos enviara devuelta al login
        if (!this._proyectoService.verificarUsuario()) {
            this._router.navigate(['/login']);
        }
        //Recogemos el nombre del usuario con el que nos logueamos
        this.NombreDeUsuario = this._proyectoService.UsuarioLogeado;
        //Intentamos recoger los roles de los usuarios
        this._proyectoService.getRolesUsuario().subscribe(function (res) {
            _this.permisosDeUsuario = res;
            //Si no hay errores y son recogidos busca si tienes permisos de usuario
            for (var num = 0; num < _this.permisosDeUsuario.length; num++) {
                if (_this.permisosDeUsuario[num].role == "Administrador") {
                    _this.AdminOn = true;
                }
            }
            //Llamamos al metodo para asignar proyectos
            _this.RecogerProyectos();
        }, function (error) {
            //Si el servidor tiene algún tipo de problema mostraremos este error
            if (error == 404) {
                _this.ErrorMessage = "El usuario autenticado no existe.";
            }
            else if (error == 500) {
                _this.ErrorMessage = "Ocurrio un error en el servidor, contacte con el servicio técnico.";
            }
        });
    };
    //Metodo que asigna los proyectos por permisos y usuario
    HomeComponent.prototype.RecogerProyectos = function () {
        var _this = this;
        //Segun el tipo de rol que tengas te permitira tener todos los proyectos o solo los tuyos
        //El servicio se encargara de enviar una respuesta con el listado de proyecto
        //El usuario necesario ya tendria que haber sido cargado en el logueo
        if (!this.AdminOn) {
            //Aqui se entra solo si no tienes permisos de administrador dandote los proyectos que te tocan
            this._proyectoService.getProyectosDeUsuario().subscribe(function (res) {
                _this.ListaDeProyectos = res;
            }, function (error) {
                //Si el servidor tiene algún tipo de problema mostraremos este error
                if (error == 404) {
                    _this.ErrorMessage = "El usuario autenticado no existe.";
                }
                else if (error == 500) {
                    _this.ErrorMessage = "Ocurrio un error en el servidor, contacte con el servicio técnico.";
                }
            });
        }
        else {
            //Aqui entra si eres administrador dandote todos los proyectos
            this._proyectoService.getAllProyectos().subscribe(function (res) {
                _this.ListaDeProyectos = res;
            }, function (error) {
                //Si el servidor tiene algún tipo de problema mostraremos este error
                if (error == 404) {
                    _this.ErrorMessage = "El usuario autenticado no existe.";
                }
                else if (error == 500) {
                    _this.ErrorMessage = "Ocurrio un error en el servidor, contacte con el servicio técnico.";
                }
            });
            //Tambien recogemos los proyectos del administrador para saber cuales son asignados a el
            this._proyectoService.getProyectosDeUsuario().subscribe(function (res) {
                _this.ListaDeProyectosAdmin = res;
            }, function (error) {
                //Si el servidor tiene algún tipo de problema mostraremos este error
                if (error == 404) {
                    _this.ErrorMessage = "El usuario autenticado no existe.";
                }
                else if (error == 500) {
                    _this.ErrorMessage = "Ocurrio un error en el servidor, contacte con el servicio técnico.";
                }
            });
        }
    };
    //Este metodo guarda el proyecto que a sido seleccionado en el front
    HomeComponent.prototype.SeleccionDeProyecto = function (index) {
        this.ProyectoSeleccionado = this.ListaDeProyectos[index];
        this._appComponent._storageDataService.UserProjectSelected = this.ProyectoSeleccionado;
    };
    //Este metodo crea una nueva evaluación y la manda para guardarla en la base de datos
    HomeComponent.prototype.GuardarEvaluacion = function () {
        var _this = this;
        var NuevaEvaluacion = { 'estado': false, 'proyectoid': this.ProyectoSeleccionado.id };
        this._evaluacionService.addEvaluacion(NuevaEvaluacion).subscribe(function (res) {
            _this._appComponent._storageDataService.Evaluacion = res;
            _this._router.navigate(['/menunuevaevaluacion']);
        }, function (error) {
            console.log("Error al guardar la evaluación");
        });
    };
    //Este metodo comprueba si el proyecto seleccionado es correcto y si es así pasa al siguiente elemento
    //Guardara los datos en el service de almacenamiento
    HomeComponent.prototype.NuevaEvaluacion = function () {
    };
    //Este metodo consulta las evaluaciones anteriores de este proyecto si esta seleccionado y existe
    HomeComponent.prototype.EvaluacionesAnteriores = function () {
        if (this.ProyectoSeleccionado != null && this.ProyectoSeleccionado != undefined) {
            this._router.navigate(['/evaluacionprevia']);
        }
        else {
            this.ErrorMessage = "Seleccione un proyecto para realizar esta acción.";
        }
    };
    //Este metodo guarda la evaluacion y cambia su estado como finalizado
    HomeComponent.prototype.FinishEvaluation = function () {
        var _this = this;
        //Recoge la evaluación
        var Evaluacion = this._appComponent._storageDataService.Evaluacion;
        //La cambia a temrinada
        Evaluacion.estado = true;
        //La envia a la base de datos ya terminada
        this._evaluacionService.updateEvaluacion(Evaluacion).subscribe(function (res) {
            //Una vez terminado guarda una nueva evaluación
            _this.GuardarEvaluacion();
        }, function (error) {
            console.log("ocurrio un error en el update: " + error);
        });
    };
    //Muestra un modal con lo que se debe hacer en cada caso
    HomeComponent.prototype.showModal = function (content) {
        var _this = this;
        //Deshabilito la parte de atras del modal
        this.Deshabilitar = true;
        //Comprueba si existe un proyecto seleccionado
        if (this.ProyectoSeleccionado != null && this.ProyectoSeleccionado != undefined) {
            this._evaluacionService.getIncompleteEvaluacionFromProject(this.ProyectoSeleccionado.id).subscribe(function (res) {
                //Habilitamos la pagina nuevamente
                _this.Deshabilitar = false;
                //Si hay un proyecto sin finalizar muestra un modal y deja seleccionar
                if (res != null) {
                    _this.modalService.open(content).result.then(function (closeResult) {
                    }, function (dismissReason) {
                        //Lo guarda en el storage
                        _this._appComponent._storageDataService.Evaluacion = res;
                        //Si selecciona continuar cargara la valuación que no termino
                        if (dismissReason == 'Continuar') {
                            _this._router.navigate(['/menunuevaevaluacion']);
                        }
                        else if (dismissReason == 'Nueva') {
                            //Si selecciona nuevo que es la otra opción cogera la evaluación anterior lo finalizara
                            //cargara una nueva y lo mostrara
                            _this.FinishEvaluation();
                        }
                    });
                }
                else {
                    //Si no encuentra ninguna repetida directamente te crea una nueva evaluación
                    _this.GuardarEvaluacion();
                }
            }, function (error) {
                //Habilitamos la pagina nuevamente
                _this.Deshabilitar = false;
                console.log("error incompleta evaluacion comprobacion");
            });
        }
        else {
            this.ErrorMessage = "Seleccione un proyecto para realizar esta acción.";
        }
    };
    HomeComponent = __decorate([
        Component({
            selector: 'app-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.scss'],
            providers: [ProyectoService, EvaluacionService]
        }),
        __metadata("design:paramtypes", [ProyectoService,
            EvaluacionService,
            NgbModal,
            Router,
            AppComponent])
    ], HomeComponent);
    return HomeComponent;
}());
export { HomeComponent };
//# sourceMappingURL=C:/Users/Manuel/Desktop/finalScrum-2/ScrumMeter/everisapi.API/src/app/home/home.component.js.map