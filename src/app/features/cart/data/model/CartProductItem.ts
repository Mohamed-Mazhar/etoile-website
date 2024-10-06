import {AddOns, Product} from "../../../../common/data-classes/ProductModel";

export interface CartProductItem {
  product : Product,
  count: number,
  productAddOns: AddOns[]
}
