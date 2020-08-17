import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Product {
    id: string;
    name: string;
    keyAlgorithm: string;
    keyPublic?: string;
    slug?: string;
}

@Injectable({
    providedIn: 'root'
})
export class ProductApiService {
    constructor(
        private readonly http: HttpClient
    ) {
    }

    public getAll(): Observable<Product[]> {
      return this.http.get<Product[]>('/api/products');
    }

    public createOne(product: Product): Observable<Product> {
        return this.http.post<Product>('/api/products', product);
    }

    public updateOne(product: Product): Observable<Product> {
        return this.http.post<Product>(`/api/products/${product.id}`, product);
    }

    public deleteOne(productId: string): Observable<Product> {
        return this.http.delete<Product>(`/api/products/${productId}`);
    }
}
