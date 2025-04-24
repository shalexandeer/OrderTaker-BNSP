export const sortByAvailability = <T extends { availability: boolean }>(a: T, b: T): number => {
  if (a.availability && !b.availability) return -1;
  if (!a.availability && b.availability) return 1;
  return 0;
};

export const sortByIsFavorite = <T extends { favorite: number }>(a: T, b: T): number => {
  if (a.favorite && !b.favorite) return -1;
  if (!a.favorite && b.favorite) return 1;
  return 0;
}
