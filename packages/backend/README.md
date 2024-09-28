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

## API DateTime Format

All datetime fields in this API are in UTC and follow the ISO 8601 format: 
`YYYY-MM-DDTHH:mm:ss.sssZ`

Example: `2023-09-22T15:30:00.000Z`

Clients should convert this UTC time to the user's local timezone for display purposes.