import { SelectQueryBuilder } from "typeorm";

export function dateIntervalDb(
  qb:  SelectQueryBuilder<any>,
  dateMin : Date,
  dateMax : Date,
  fieldName = 'createdAt'
) {
  if (dateMin) {
    qb.andWhere(`${fieldName} > :dateMin`, {dateMin})
  }
  if (dateMax) {
    qb.andWhere(`${fieldName} < :dateMax`, {dateMax})
  }
}
