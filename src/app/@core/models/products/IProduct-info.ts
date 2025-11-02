import {IReview} from "./IReview";

export interface IProductInfo {
  id: number,
  title: string,
  description: string,
  category: string,
  price: number,
  discountPercentage?: number,
  rating?: number,
  stock?: number,
  tags?: Array<string>,
  brand: string,
  sku?: string,
  weight?: number
  dimensions?: IDimensions,
  warrantyInformation?: string,
  shippingInformation?: string,
  availabilityStatus?: string,
  reviews?: Array<IReview>,
  returnPolicy?: string,
  minimumOrderQuantity?: number,
  thumbnail?: string,
  images?: Array<string>
}
interface IDimensions {
  width: number,
  height: number,
  depth: number,
}
