import { Component } from '@angular/core';

@Component({
  selector: 'app-shop-preview',
  imports: [],
  templateUrl: './shop-preview.component.html',
  styleUrl: './shop-preview.component.css'
})
export class ShopPreviewComponent {

  clickUpgrade() {
    console.log("upgrade clicked");
  }
}
