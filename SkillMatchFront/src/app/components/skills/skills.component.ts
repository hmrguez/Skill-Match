import {Component, OnInit} from '@angular/core';

interface Column {
  field: string;
  header: string;
}

interface Product{
  code: string,
  name: string,
  category: string,
  quantity: number,
  inventoryStatus: string,
  rating: number
}


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit{
  products!: Product[];
  cols!: Column[];

  ngOnInit(): void {
    this.products = this.getProducts()

    this.cols = [
      { field: 'code', header: 'Code' },
      { field: 'name', header: 'Name' },
      { field: 'category', header: 'Category' },
      { field: 'quantity', header: 'Quantity' },
      { field: 'inventoryStatus', header: 'Status' },
      { field: 'rating', header: 'Rating' }
    ];
  }

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      default:
        return 'danger';
    }
  }

  getProducts(): Product[]{
    let first : Product = { category: "Tables", code: "TAB", inventoryStatus: "INSTOCK", name: "Wooden table", quantity: 2, rating: 3 }
    let second : Product = { category: "Jewelry", code: "TAB", inventoryStatus: "OUT", name: "Diamond necklace", quantity: 1, rating: 5 }
    let third : Product = { category: "PC", code: "TAB", inventoryStatus: "LOWSTOCK", name: "Macbook", quantity: 3, rating: 5 }

    return [ first, second, third ]
  }
}
