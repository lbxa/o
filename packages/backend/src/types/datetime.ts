import { CustomScalar, Scalar } from "@nestjs/graphql";
import { GraphQLScalarType } from "graphql";
import { Kind, ValueNode } from "graphql";

@Scalar("DateTime")
export class DateTimeScalar implements CustomScalar<string, Date> {
  description = "Date custom scalar type";

  parseValue(value: string | number | Date): Date {
    return new Date(value);
  }

  serialize(value: Date): string {
    return value.toISOString();
  }

  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10));
    }
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  }
}
