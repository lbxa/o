export interface BaseEntityProps {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateEntityProps<T> {
  id: string;
  props: T;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Entity<EntityProps> {
  public readonly id: string;
  public readonly createdAt: Date;
  private _props: EntityProps;

  protected _updatedAt: Date;

  constructor({
    id,
    props,
    createdAt,
    updatedAt,
  }: CreateEntityProps<EntityProps>) {
    this.id = id;
    this.createdAt = createdAt ?? new Date();
    this._updatedAt = updatedAt ?? new Date();
    this._props = props;
  }

  public mutateProps(
    updater: (props: EntityProps) => {
      [key in keyof EntityProps]: EntityProps[key];
    }
  ): void {
    this._props = updater(this._props);
    this._updatedAt = new Date();
  }

  public get props(): EntityProps {
    return this._props;
  }

  public get updatedAt(): Date {
    return this._updatedAt;
  }

  public validate() {
    // do nothing
  }
}
