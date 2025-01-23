import type { Node, PageInfo } from "../types/graphql";

export interface ConnectionArgs {
  first?: number;
  after?: string;
}

export interface Edge<T> {
  cursor: string;
  node: T;
}

export interface Connection<T> {
  edges: Edge<T>[];
  pageInfo: PageInfo;
}

export function buildConnection<T extends Node>(options: {
  nodes: T[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  createCursor?: (node: T) => string;
}): Connection<T> {
  const {
    nodes,
    hasNextPage,
    hasPreviousPage,
    createCursor = (node) => node.id,
  } = options;

  const edges = nodes.map((node) => ({
    cursor: createCursor(node),
    node,
  }));

  return {
    edges,
    pageInfo: {
      hasNextPage,
      hasPreviousPage,
      startCursor: edges[0]?.cursor ?? null,
      endCursor: edges[edges.length - 1]?.cursor ?? null,
    },
  };
}
