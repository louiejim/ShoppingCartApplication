import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { products } from '../../../../shared/model/products.interface';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  editForm!: FormGroup;
  dataSource!: MatTableDataSource<products>;
  products: products[] = [];
  showAddProductForm: boolean = false;
  newProduct: products = {
    id: '',
    name: '',
    price: 0,
    category: '',
    quantity_available: 0,
    img:''
  };
  originalProduct: products | null = null;
  confirmationDialog: boolean = false;
  productToDelete: products | null = null;
  selectedCategory: string = '';
  categories  = [
    'laptop',
    'keyboard',
    'mouse',
    'tablet',
    'monitor'
  ];
  totalItems = 0;
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<products>(this.products);
    this.dataSource.sort = this.sort;
    this.getProducts();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getProducts() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.dataSource.data = products;
      this.totalItems = products.length;
      this.dataSource.paginator = this.paginator; 
    });
  }

  toggleEditMode(product: products) {
    product.editMode = !product.editMode;
    if (product.editMode) {
      this.originalProduct = { ...product };
    } else {
      if (this.originalProduct) {
        Object.assign(product, this.originalProduct);
        this.originalProduct = null; 
        product.editMode = false;
      }
    }
  }
  
  isFormValid(product: products): boolean {
    return !!product.name && !!product.price && !!product.category && !!product.quantity_available && !!product.img;
  }
  

  addProduct(product: products) {
    this.productService.addProduct(product).subscribe(() => {
      this.getProducts();
      this.resetNewProduct();
    });
  }

  toggleAddProductForm() {
    this.showAddProductForm = !this.showAddProductForm;
    this.resetNewProduct();
  }

  updateProduct(product: products) {
    this.productService.updateProduct(product).subscribe(() => {
      this.getProducts();
    });
    product.editMode = false; 
  }

  deleteProduct(product: products) {
    this.productToDelete = product;
    this.confirmationDialog = true;
  }
  confirmDelete() {
    if (this.productToDelete) {
      this.productService.deleteProduct(this.productToDelete.id).subscribe(() => {
        this.products = this.products.filter(prod => prod.id !== this.productToDelete!.id);
        this.dataSource.data = this.products;
        this.closeConfirmationDialog();
      });
    }
  }

  closeConfirmationDialog() {
    this.confirmationDialog = false;
    this.productToDelete = null; 
  }

  addNewProduct() {
    this.newProduct.id = this.getNextProductId();
    this.newProduct.category = this.selectedCategory;
    this.addProduct(this.newProduct);
    this.showAddProductForm = !this.showAddProductForm;
  }

  private resetNewProduct() {
    this.newProduct = {
      id: '',
        name: '',
        price: 0,
        category: '',
        quantity_available: 0,
        img:''
    };
  }
  private getNextProductId(): string {
    const maxId = this.products.reduce((max, product) => (parseInt(product.id) > max ? parseInt(product.id) : max), 0);
    return (maxId + 1).toString();
  }
}