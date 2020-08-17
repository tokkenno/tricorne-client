import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Product, ProductApiService} from '../../../api/product-api.service';

@Component({
    selector: 'app-product-edit',
    templateUrl: './product-edit.component.html',
    styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
    public readonly form: FormGroup;

    public currentId: string = null;

    public get isEdit(): boolean {
        return this.currentId != null && this.currentId !== '';
    }

    set dataSource(product: Product) {
        this.currentId = product.id;
        this.form.get('name').setValue(product.name);
        this.form.get('slug').setValue(product.slug);
        this.form.get('keyAlgorithm').setValue(product.keyAlgorithm);
    }

    constructor(
        public readonly productApi: ProductApiService,
        public readonly formBuilder: FormBuilder,
        public readonly activeModal: NgbActiveModal
    ) {
        this.form = this.formBuilder.group({
            name: ['', Validators.compose([Validators.required, Validators.min(3), Validators.max(62)])],
            slug: ['', Validators.compose([Validators.required, Validators.pattern(/[\w-]*/)])],
            keyAlgorithm: ['rsa4096', Validators.required]
        });

        this.form.get('name').valueChanges.subscribe((elem) => {
            this.form.get('slug').setValue(elem.toLowerCase().replace(/[^\w-]*/gmi, ''));
        });
    }

    ngOnInit(): void {
    }

    save(): void {
        const formProduct: Product = {
            id: '',
            name: this.form.get('name').value,
            slug: this.form.get('slug').value,
            keyAlgorithm: this.form.get('keyAlgorithm').value
        };

        if (this.isEdit) {
            formProduct.id = this.currentId;
            this.productApi.updateOne(formProduct).subscribe((product) => this.onFinnish(product));
        } else {
            this.productApi.createOne(formProduct).subscribe((product) => this.onFinnish(product));
        }
    }

    private onFinnish(product: Product): void {
        this.activeModal.close(product);
    }
}
