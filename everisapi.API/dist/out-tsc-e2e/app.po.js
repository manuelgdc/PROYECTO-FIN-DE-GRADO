"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
var ScrumMeterPage = /** @class */ (function () {
    function ScrumMeterPage() {
    }
    ScrumMeterPage.prototype.navigateTo = function () {
        return protractor_1.browser.get('/');
    };
    ScrumMeterPage.prototype.getParagraphText = function () {
        return protractor_1.element(protractor_1.by.css('app-root h1')).getText();
    };
    return ScrumMeterPage;
}());
exports.ScrumMeterPage = ScrumMeterPage;
//# sourceMappingURL=app.po.js.map