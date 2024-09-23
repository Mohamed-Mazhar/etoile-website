export enum ApiType {
  appConfiguration = "api/v1/config",
  registration = "api/v1/auth/registration",
  login = "api/v1/auth/login",
  token = "api/v1/customer/cm-firebase-token",
  userProfile = "api/v1/customer/info",
  banners = "api/v1/banners",
  categories = "api/v1/categories",
  subCategories = "api/v1/categories/childes/{}",
  categoryProducts = "api/v1/categories/products/{}",
  latestProducts = "api/v1/products/latest",
  popularProducts = "api/v1/products/popular",
  recommendedProducts = "api/v1/products/recommended",
  frequentlyBought = "api/v1/products/frequently-bought"
}
