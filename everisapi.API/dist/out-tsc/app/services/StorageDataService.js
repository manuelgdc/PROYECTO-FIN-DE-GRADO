var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
var StorageDataService = /** @class */ (function () {
    function StorageDataService() {
        this.UserProjects = [];
        this.DataUnfinished = false;
        this.IdSection = 1;
        this.Evaluacion = null;
        this.EvaluacionToPDF = null;
    }
    StorageDataService = __decorate([
        Injectable()
    ], StorageDataService);
    return StorageDataService;
}());
export { StorageDataService };
//# sourceMappingURL=C:/Users/Manuel/Desktop/finalScrum-2/ScrumMeter/everisapi.API/src/app/services/StorageDataService.js.map