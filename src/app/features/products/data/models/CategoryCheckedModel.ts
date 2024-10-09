import {Category} from "../../../../common/data-classes/Category";

export interface CategoryCheckedModel {
  categoryId: number,
  categoryName: string,
  isChecked: boolean,
  subCategories: CategoryCheckedModel[]
}
