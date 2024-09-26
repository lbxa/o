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

ID's are formed as base64 encoded `Entity:ID` strings where `Entity` is the name of the type of the object and `ID` is the unique identifier of the object. Refer to `global-id.ts`.
