export type Accessor<T, V> = (item: T) => V;
export type Comparator<T, V> = (a: T, b: T) => V;

export interface RankingStrategy<T> {
  compare: Comparator<T, number>;
  rank(results: T[]): T[];
}

export abstract class BaseRankingStrategy<T> implements RankingStrategy<T> {
  constructor(
    private readonly comparator: Comparator<number, number>,
    private readonly accessor: Accessor<T, number>
  ) {}

  compare = (a: T, b: T) => {
    return this.comparator(this.accessor(a), this.accessor(b));
  };

  rank = (results: T[]): T[] => {
    return [...results].sort(this.compare);
  };
}

export class AscendingRankingStrategy<T> extends BaseRankingStrategy<T> {
  constructor(accessor: Accessor<T, number>) {
    super((a, b) => b - a, accessor);
  }
}

export class DescendingRankingStrategy<T> extends BaseRankingStrategy<T> {
  constructor(accessor: Accessor<T, number>) {
    super((a, b) => a - b, accessor);
  }
}

export class EuclideanDistanceStrategy<T> extends BaseRankingStrategy<T> {
  constructor(target: number, accessor: Accessor<T, number>) {
    super((a, b) => {
      const distA = Math.abs(a - target);
      const distB = Math.abs(b - target);
      return distA - distB;
    }, accessor);
  }
}
