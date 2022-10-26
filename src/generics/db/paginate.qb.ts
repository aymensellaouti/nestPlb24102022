import { SelectQueryBuilder } from "typeorm";

export function paginateQb(
  qb:  SelectQueryBuilder<any>,
  nbr = 10,
  page = 1,
) {
  const limit = (page - 1) * nbr;
  qb.take(nbr)
    .skip(limit);
}
