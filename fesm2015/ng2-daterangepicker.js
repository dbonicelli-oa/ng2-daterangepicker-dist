import { ɵɵdefineInjectable, Injectable, EventEmitter, Directive, ElementRef, KeyValueDiffers, Input, Output, NgModule } from '@angular/core';
import 'daterangepicker';
import $ from 'jquery';

class DaterangepickerConfig {
    constructor() {
        this.settings = {};
    }
}
DaterangepickerConfig.ɵprov = ɵɵdefineInjectable({ factory: function DaterangepickerConfig_Factory() { return new DaterangepickerConfig(); }, token: DaterangepickerConfig, providedIn: "root" });
DaterangepickerConfig.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
DaterangepickerConfig.ctorParameters = () => [];

class DaterangepickerComponent {
    constructor(input, config, differs) {
        this.input = input;
        this.config = config;
        this.differs = differs;
        this.targetOptions = {};
        this._differ = {};
        this.options = {};
        this.selected = new EventEmitter();
        this.cancelDaterangepicker = new EventEmitter();
        this.applyDaterangepicker = new EventEmitter();
        this.hideCalendarDaterangepicker = new EventEmitter();
        this.showCalendarDaterangepicker = new EventEmitter();
        this.hideDaterangepicker = new EventEmitter();
        this.showDaterangepicker = new EventEmitter();
        this._differ['options'] = this.differs.find(this.options).create();
        this._differ['settings'] = this.differs.find(this.config.settings).create();
    }
    ngAfterViewInit() {
        this.render();
        this.attachEvents();
    }
    ngDoCheck() {
        let optionsChanged = this._differ['options'].diff(this.options);
        let settingsChanged = this._differ['settings'].diff(this.config.settings);
        if (optionsChanged || settingsChanged) {
            this.render();
            this.attachEvents();
            if (this.activeRange && this.datePicker) {
                this.datePicker.setStartDate(this.activeRange.start);
                this.datePicker.setEndDate(this.activeRange.end);
            }
        }
    }
    ngOnDestroy() {
        this.destroyPicker();
    }
    render() {
        this.targetOptions = Object.assign({}, this.config.settings, this.options);
        $(this.input.nativeElement).daterangepicker(this.targetOptions, this.callback.bind(this));
        if (this.options.customClasses && this.options.customClasses.length) {
            for (let customClass of this.options.customClasses) {
                this.datePicker = $(this.input.nativeElement).data('daterangepicker').container.addClass(customClass);
            }
        }
        else {
            this.datePicker = $(this.input.nativeElement).data('daterangepicker');
        }
    }
    callback(start, end, label) {
        this.activeRange = {
            start: start,
            end: end,
            label: label
        };
        this.selected.emit(this.activeRange);
    }
    destroyPicker() {
        try {
            $(this.input.nativeElement).data('daterangepicker').remove();
        }
        catch (e) {
            console.log(e.message);
        }
    }
    attachEvents() {
        $(this.input.nativeElement).on('cancel.daterangepicker', (e, picker) => {
            let event = { event: e, picker: picker };
            this.cancelDaterangepicker.emit(event);
        });
        $(this.input.nativeElement).on('apply.daterangepicker', (e, picker) => {
            let event = { event: e, picker: picker };
            this.applyDaterangepicker.emit(event);
        });
        $(this.input.nativeElement).on('hideCalendar.daterangepicker', (e, picker) => {
            let event = { event: e, picker: picker };
            this.hideCalendarDaterangepicker.emit(event);
        });
        $(this.input.nativeElement).on('showCalendar.daterangepicker', (e, picker) => {
            let event = { event: e, picker: picker };
            this.showCalendarDaterangepicker.emit(event);
        });
        $(this.input.nativeElement).on('hide.daterangepicker', (e, picker) => {
            let event = { event: e, picker: picker };
            this.hideDaterangepicker.emit(event);
        });
        $(this.input.nativeElement).on('show.daterangepicker', (e, picker) => {
            let event = { event: e, picker: picker };
            this.showDaterangepicker.emit(event);
        });
    }
}
DaterangepickerComponent.decorators = [
    { type: Directive, args: [{
                selector: '[daterangepicker]'
            },] }
];
DaterangepickerComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: DaterangepickerConfig },
    { type: KeyValueDiffers }
];
DaterangepickerComponent.propDecorators = {
    options: [{ type: Input }],
    selected: [{ type: Output }],
    cancelDaterangepicker: [{ type: Output }],
    applyDaterangepicker: [{ type: Output }],
    hideCalendarDaterangepicker: [{ type: Output }],
    showCalendarDaterangepicker: [{ type: Output }],
    hideDaterangepicker: [{ type: Output }],
    showDaterangepicker: [{ type: Output }]
};

class Daterangepicker {
}
Daterangepicker.decorators = [
    { type: NgModule, args: [{
                declarations: [DaterangepickerComponent],
                imports: [],
                exports: [DaterangepickerComponent]
            },] }
];

/*
 * Public API Surface of ng2-daterangepicker
 */

/**
 * Generated bundle index. Do not edit.
 */

export { Daterangepicker, DaterangepickerComponent, DaterangepickerConfig };
//# sourceMappingURL=ng2-daterangepicker.js.map
