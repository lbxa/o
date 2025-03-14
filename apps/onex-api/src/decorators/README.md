# Decorators

This directory contains custom decorators for the application.

## CurrentUser

Used for GraphQL resolvers to extract the current user from the context.

```typescript
@Query(() => User)
@UseGuards(GqlJwtAuthGuard)
async me(@CurrentUser() userId: number) {
  return this.userService.findById(userId);
}
```

## CurrentUserHttp

Used for REST controllers to extract the current user from the request.

```typescript
@Get('profile')
@UseGuards(JwtAuthGuard)
getProfile(@CurrentUserHttp() userId: number) {
  return this.userService.findById(userId);
}
```

You can also extract specific fields from the JWT payload:

```typescript
@Get('email')
@UseGuards(JwtAuthGuard)
getEmail(@CurrentUserHttp('email') email: string) {
  return { email };
}
```

## Public

Used to mark routes as public (not requiring authentication).

```typescript
@Public()
@Post('login')
async login(@Body() loginDto: LoginDto) {
  // ...
}
``` 
