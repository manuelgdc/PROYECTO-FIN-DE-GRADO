import { async, TestBed } from '@angular/core/testing';
import { MenunewevaluationComponent } from './menunewevaluation.component';
describe('MenunewevaluationComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [MenunewevaluationComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(MenunewevaluationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=C:/Users/Manuel/Desktop/finalScrum-2/ScrumMeter/everisapi.API/src/app/menunewevaluation/menunewevaluation.component.spec.js.map