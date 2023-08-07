import ProductInterface from './ProductInterface';

interface CategoryInterface {
  id: number;
  name: string;
  get_absolute_url: string;
  products: ProductInterface[];
}

export default CategoryInterface;
