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
import { UserService } from '../services/UserService';
import { AppComponent } from '../app.component';
import { Router } from "@angular/router";
var LoginComponent = /** @class */ (function () {
    function LoginComponent(_userService, _router, _app) {
        this._userService = _userService;
        this._router = _router;
        this._app = _app;
        this.ErrorMessage = null;
        this.nombreDeUsuario = "";
        this.passwordDeUsuario = "";
        this.UsuarioEntrante = null;
        this.Recuerdame = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        //Comprobamos si anteriormente queria que se recordara su usuario
        if (this.recuerdameOnOff()) {
            this.nombreDeUsuario = localStorage.getItem("user");
            this.passwordDeUsuario = localStorage.getItem("passuser");
            this.Recuerdame = true;
        }
    };
    //Mediante este metodo comprobaremos si el usuario espcificado existe o no
    //si es así sera redirigido a la pagina principal
    LoginComponent.prototype.SignUp = function () {
        var _this = this;
        //Comprueba si los campos tienen datos
        if (this.nombreDeUsuario != "" && this.passwordDeUsuario != "") {
            //Manda una petición a la api para ver si el nombre existe
            this._userService.SignUpMe(this.nombreDeUsuario).subscribe(function (res) {
                //Si no existe muestra un error
                if (!res) {
                    _this.ErrorMessage = "No existe el usuario especificado.";
                }
                else {
                    //Si existe comprueba si la contraseña es correcta y es redirigido
                    _this.UsuarioEntrante = res;
                    if (_this.UsuarioEntrante.password == _this.passwordDeUsuario) {
                        if (_this.Recuerdame) {
                            //Si el usuario quiere ser recordado lo guardara en el localStorage
                            localStorage.setItem("user", _this.UsuarioEntrante.nombre);
                            localStorage.setItem("passuser", _this.UsuarioEntrante.password);
                        }
                        else {
                            //Si el usuario no quiere ser recordado lo guardara en el servicio
                            _this._app._storageDataService.UserData = _this.UsuarioEntrante;
                        }
                        _this._router.navigate(['/home']);
                    }
                    else {
                        //Si no es correcta borra el usuario recogido y muestra mensaje de error
                        _this.ErrorMessage = "El nombre de usuario o contraseña no son correctos.";
                        _this.UsuarioEntrante = null;
                    }
                }
            }, function (error) {
                //Si el servidor tiene algún tipo de problema mostraremos este error
                if (error == 404) {
                    _this.ErrorMessage = "El nombre de usuario o contraseña no son correctos.";
                }
                else if (error == 500) {
                    _this.ErrorMessage = "Ocurrio un error en el servidor, contacte con el servicio técnico.";
                }
            });
        }
        else {
            this.ErrorMessage = "Introduzca todos los campos.";
        }
    };
    //Este metodo devuelve si el usuario estaba siendo recordado
    //Lo utilizamos en el html para cambiar el recuerdame y en el init del componente
    LoginComponent.prototype.recuerdameOnOff = function () {
        if (localStorage.getItem("user") != null && localStorage.getItem("user") != undefined) {
            return true;
        }
        else {
            return false;
        }
    };
    //Este metodo nos permite saber si el usuario quiere ser recordado
    LoginComponent.prototype.recuerdameChange = function () {
        if (this.Recuerdame) {
            localStorage.removeItem("user");
            localStorage.removeItem("passuser");
            this.Recuerdame = false;
        }
        else {
            this.Recuerdame = true;
        }
    };
    LoginComponent = __decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css'],
            providers: [UserService]
        }),
        __metadata("design:paramtypes", [UserService,
            Router,
            AppComponent])
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=C:/Users/Manuel/Desktop/finalScrum-2/ScrumMeter/everisapi.API/src/app/login/login.component.js.map