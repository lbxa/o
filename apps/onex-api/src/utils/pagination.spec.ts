import type { Node } from "../types/graphql";
import { buildConnection } from "./pagination";

interface TestNode extends Node {
  id: string;
  name: string;
}

describe("Pagination Utils", () => {
  describe("buildConnection", () => {
    it("should build a connection with empty nodes", () => {
      const connection = buildConnection<TestNode>({
        nodes: [],
        hasNextPage: false,
        hasPreviousPage: false,
        createCursor: (node) => node.id,
      });

      expect(connection).toEqual({
        edges: [],
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: null,
          endCursor: null,
        },
      });
    });

    it("should build a connection with nodes using default cursor creation", () => {
      const nodes: TestNode[] = [
        { id: "1", name: "First" },
        { id: "2", name: "Second" },
      ];

      const connection = buildConnection({
        nodes,
        hasNextPage: true,
        hasPreviousPage: false,
        createCursor: (node) => node.id,
      });

      expect(connection).toEqual({
        edges: [
          { cursor: "1", node: nodes[0] },
          { cursor: "2", node: nodes[1] },
        ],
        pageInfo: {
          hasNextPage: true,
          hasPreviousPage: false,
          startCursor: "1",
          endCursor: "2",
        },
      });
    });

    it("should build a connection with custom cursor creation", () => {
      const nodes: TestNode[] = [
        { id: "1", name: "First" },
        { id: "2", name: "Second" },
      ];

      const connection = buildConnection({
        nodes,
        hasNextPage: false,
        hasPreviousPage: true,
        createCursor: (node) => `custom-${node.id}`,
      });

      expect(connection).toEqual({
        edges: [
          { cursor: "custom-1", node: nodes[0] },
          { cursor: "custom-2", node: nodes[1] },
        ],
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: true,
          startCursor: "custom-1",
          endCursor: "custom-2",
        },
      });
    });

    it("should handle single node connections", () => {
      const nodes: TestNode[] = [{ id: "1", name: "Single" }];

      const connection = buildConnection({
        nodes,
        hasNextPage: false,
        hasPreviousPage: false,
        createCursor: (node) => node.id,
      });

      expect(connection).toEqual({
        edges: [{ cursor: "1", node: nodes[0] }],
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: "1",
          endCursor: "1",
        },
      });
    });
  });
});
