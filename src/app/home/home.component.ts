import { Component, OnInit, inject } from '@angular/core';
import { Product } from '../models/product.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  products: Product[] = [];
  firestore: AngularFirestore = inject(AngularFirestore);

  constructor(private router: Router) {
    this.firestore
      .collection('products')
      .valueChanges()
      .subscribe((products: any[]) => {
        this.products = products;
      });
  }

  addProduct() {
    this.router.navigate(['/product-form']);
  }

  editProduct(id: string) {
    this.router.navigate(['/product-form/' + id]);
  }
}
