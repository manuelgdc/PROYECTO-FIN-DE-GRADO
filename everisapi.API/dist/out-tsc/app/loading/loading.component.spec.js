import { async, TestBed } from '@angular/core/testing';
import { LoadingComponent } from './Loading.component';
describe('LoadingComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [LoadingComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(LoadingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=C:/Users/Manuel/Desktop/finalScrum-2/ScrumMeter/everisapi.API/src/app/loading/loading.component.spec.js.map