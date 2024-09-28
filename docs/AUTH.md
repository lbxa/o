# Auth

```mermaid
flowchart LR
subgraph Passport Auth
  JwtStrategy --> JwtGuard
  RefreshTokenStrategy --> RefreshTokenGuard
end
```

A global `APP_GUARD` is used for the JwtStrategy whereas the `@UseGuards(RefreshTokenGuard)` decorator is used to protect the `authRefreshTokens` route. It should only be accessible to users who have a valid refresh token. There's a half [decent guide here](https://blog.devgenius.io/10-1-nestjs-graphql-jwt-authentication-with-accesstoken-and-refreshtoken-4adfd564b62a).
