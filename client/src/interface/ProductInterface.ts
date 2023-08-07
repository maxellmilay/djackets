interface ProductInterface {
  id: number;
  name: string;
  get_absolute_url: string;
  description: string;
  price: number;
  get_image: string;
  get_thumbnail: string;
}

export default ProductInterface;
