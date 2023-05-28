import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Product } from '../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  productId: string | null = null;
  product: Product = {
    id: '',
    name: '',
    price: 0,
    quantity: 0,
  };
  isToastOpen: boolean = false;
  toastMessage: string = '';
  showBtnDelete: boolean = false;

  constructor(
    private router: ActivatedRoute,
    private firestore: AngularFirestore,
    private navCtrl: NavController,
    private platform: Platform
  ) {}

  ngOnInit(): void {
    this.productId = this.router.snapshot.paramMap.get('id');
    this.showBtnDelete = this.productId != null;
    this.loadProduct();
  }

  getProductsCollection() {
    return this.firestore.collection('products');
  }

  loadProduct() {
    if (this.productId == null) return;

    this.getProductsCollection()
      .doc(this.productId)
      .get()
      .subscribe((doc) => {
        if (doc.exists) {
          this.product = doc.data() as Product;
        }
      });
  }

  saveProduct() {
    let productDoc;
    if (this.productId) {
      productDoc = this.getProductsCollection().doc(this.productId);
    } else {
      productDoc = this.getProductsCollection().doc();
      this.product.id = productDoc.ref.id;
    }

    productDoc
      .set(this.product)
      .then(() => {
        this.toastMessage = 'Produto salvo com sucesso';
        this.setOpen(true);
      })
      .catch((error) => {
        this.toastMessage = 'Erro ao salvar o produto';
        this.setOpen(true);
      });
  }

  deleteProduct() {
    if (this.productId == null) return;

    this.getProductsCollection()
      .doc(this.productId)
      .delete()
      .then(() => {
        this.back();
      })
      .catch(() => {
        this.toastMessage = 'Erro ao deletar o produto';
        this.setOpen(true);
      });
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  back() {
    if (this.platform.is('cordova')) {
      this.navCtrl.navigateBack('');
    } else {
      window.history.back();
    }
  }
}
