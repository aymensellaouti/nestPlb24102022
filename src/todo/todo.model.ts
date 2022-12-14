
export enum TodoStatusEnum {
  'actif' = 'En cours',
  'waiting' = 'En attente',
  'done' = 'Finalisé',
}

export class TodoModel {

  constructor(
    public id: string = '',
    public name: string = '',
    public description: string = '',
    public userId: number,
    public createdAt: Date = new Date(),
    public status: TodoStatusEnum = TodoStatusEnum.waiting
  ) {}
}
