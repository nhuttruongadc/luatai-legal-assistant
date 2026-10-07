import { legalCategories } from "@/lib/legal-data";

export function getLegalCategoryTags() {
  return legalCategories.slice(0, 8).map((item) => item.name);
}
