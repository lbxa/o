import { v4 } from "uuid";

export type DomainEventActor =
  | {
      userId: string;
    }
  | {
      system: true;
    };

export class DomainEvent<T = unknown> {
  public readonly id: string = v4();
  public readonly name: string;
  public readonly data: T;
  public readonly aggregatedId: string;
  public readonly aggregateType: string;
  public readonly timestamp: Date = new Date();
  public readonly actor: DomainEventActor;

  constructor({
    name,
    data,
    aggregatedId,
    aggregateType,
    actor,
  }: {
    name: string;
    data: T;
    aggregatedId: string;
    aggregateType: string;
    actor: DomainEventActor;
  }) {
    this.name = name;
    this.data = data;
    this.aggregatedId = aggregatedId;
    this.aggregateType = aggregateType;
    this.actor = actor;
  }
}
