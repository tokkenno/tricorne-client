import {Component, OnInit} from '@angular/core';
import {Product, ProductApiService} from '../../api/product-api.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ProductEditComponent} from './product-edit/product-edit.component';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
    public dataSource: Product[] = [];

    constructor(
        private readonly modal: NgbModal,
        private readonly productApi: ProductApiService
    ) {
    }

    ngOnInit(): void {
        this.productApi.getAll().subscribe((products) => {
            this.dataSource = products;
        });
    }

    add(): void {
        const dialog = this.modal.open(ProductEditComponent);
        dialog.result.then((result) => {
            console.log(result);
        }).catch((error) => {
        });
    }

    edit(product: Product): void {

    }

    delete(product: Product): void {

    }

    downloadPubKey(product: Product): void {

    }
}
