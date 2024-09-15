## Relay Compliance

To guarantee that the backend is compliant with the Relay specification the server must implement the following:

```graphql
interface Node {
  id: ID!
}

query {
  node(id: ID!): Node
}
```