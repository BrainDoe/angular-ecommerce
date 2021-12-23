import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'uix-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  @Input() images: string[] | string | any;
  @Input() mainImage!: string | any

  selectedImageUrl!: string; 


  constructor() { }

  ngOnInit(): void {
    if(this.hasImages) {
      this.selectedImageUrl = this.images[0]
    }
  }

  changeSelectedImage(imageUrl: string) {
    this.selectedImageUrl = imageUrl
  }

  get hasImages() {
    return this.images?.length > 0
  }

}
