import { async, TestBed } from '@angular/core/testing';
import { PreviousevaluationComponent } from './previousevaluation.component';
describe('PreviousevaluationComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [PreviousevaluationComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(PreviousevaluationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=C:/Users/Manuel/Desktop/finalScrum-2/ScrumMeter/everisapi.API/src/app/previousevaluation/previousevaluation.component.spec.js.map