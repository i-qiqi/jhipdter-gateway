import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IInvoice } from 'app/shared/model/invoice.model';
import { InvoiceService } from './invoice.service';

@Component({
    selector: 'jhi-invoice-update',
    templateUrl: './invoice-update.component.html'
})
export class InvoiceUpdateComponent implements OnInit {
    private _invoice: IInvoice;
    isSaving: boolean;
    date: string;
    paymentDate: string;

    constructor(private invoiceService: InvoiceService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ invoice }) => {
            this.invoice = invoice;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.invoice.date = moment(this.date, DATE_TIME_FORMAT);
        this.invoice.paymentDate = moment(this.paymentDate, DATE_TIME_FORMAT);
        if (this.invoice.id !== undefined) {
            this.subscribeToSaveResponse(this.invoiceService.update(this.invoice));
        } else {
            this.subscribeToSaveResponse(this.invoiceService.create(this.invoice));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IInvoice>>) {
        result.subscribe((res: HttpResponse<IInvoice>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get invoice() {
        return this._invoice;
    }

    set invoice(invoice: IInvoice) {
        this._invoice = invoice;
        this.date = moment(invoice.date).format(DATE_TIME_FORMAT);
        this.paymentDate = moment(invoice.paymentDate).format(DATE_TIME_FORMAT);
    }
}
