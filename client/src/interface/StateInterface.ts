import ItemInterface from './ItemInterface';

interface StateInterface {
  cart: {
    items: ItemInterface[]
  },
  isAuthenticated: boolean,
  token: string,
}

export default StateInterface
