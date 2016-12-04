interface GalleryItem {
  color: string,
  views: number
}

interface GalleryData {
  brand: string,
  style: string,
  colors: GalleryItem[] 
}

export class ItemGallery {

  constructor(private _data: GalleryData) { }

  private _prefixUrl(): string {
    return `/assets/${this._data.brand}/${this._data.style}`
  }

  getSwatches(): string[] {
    return this._data.colors.map(color => {
      return `${this._prefixUrl}/${color}.gif`;
    });
  }

  getImageSet(): any {
    return this._data.colors.map(color => {
      return {
        color,
        others: Array(color.views).map((val,idx)=> {
          return `${this._prefixUrl}/${color}/image${idx+1}xl.jpg`
        }),
        alternates: Array(color.views).map((val,idx) => {
          return `${this._prefixUrl}/${color}/image${idx+1}s.jpg`
        })
      }
    })
  }

}
