import type { DomainEventActor } from "./domain-event";
import { DomainEvent } from "./domain-event";

interface CreateEntityProps<T> {
  id: string;
  props: T;
  createdAt?: Date;
  updatedAt?: Date;
  factoryEvent: {
    name: string;
    actor: DomainEventActor;
  } | null;
}

export abstract class AggregateRoot<EntityProps> {
  private _props: EntityProps;
  private _domainEvents: DomainEvent[] = [];

  public readonly id: string;
  public readonly createdAt: Date;

  protected _updatedAt: Date;

  constructor({
    id,
    props,
    createdAt,
    updatedAt,
    factoryEvent,
  }: CreateEntityProps<EntityProps>) {
    this._props = props;
    this.id = id;
    this.createdAt = createdAt ?? new Date();
    this._updatedAt = updatedAt ?? new Date();

    if (factoryEvent) {
      this.addEvent(
        this.createDomainEvent(factoryEvent.name, factoryEvent.actor, props)
      );
    }
  }

  public addEvent(event: DomainEvent): void {
    this._domainEvents.push(event);
  }

  protected createDomainEvent<T>(
    name: string,
    actor: DomainEventActor,
    data: T
  ): DomainEvent<T> {
    return new DomainEvent({
      name,
      data,
      aggregatedId: this.id,
      aggregateType: this.constructor.name,
      actor,
    });
  }

  protected onDomainEvent<T>(
    name: string,
    data: T,
    actor: DomainEventActor,
    handler: (data: T) => {
      [key in keyof EntityProps]: EntityProps[key];
    }
  ): void {
    const event = this.createDomainEvent(name, actor, data);
    const newProps = handler(data);
    this._props = newProps;
    this.addEvent(event);
    this._updatedAt = new Date();
  }

  public clearEvents(): void {
    this._domainEvents = [];
  }

  public get props(): EntityProps {
    return this._props;
  }

  public get domainEvents(): DomainEvent[] {
    return this._domainEvents;
  }
}
