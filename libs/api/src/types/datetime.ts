import { CustomScalar, Scalar } from "@nestjs/graphql";
import { Kind, ValueNode } from "graphql";

@Scalar("DateTime")
export class DateTimeScalar implements CustomScalar<string, Date> {
  description = "Date custom scalar type";

  parseValue(value: unknown): Date {
    let dateValue: Date;
    switch (typeof value) {
      case "number":
        dateValue = new Date(value);
        break;
      case "object":
        if (value instanceof Date) {
          dateValue = value;
        } else {
          throw new Error("Invalid date object");
        }
        break;
      case "string":
        dateValue = new Date(value);
        break;
      default:
        throw new Error("Invalid date value");
    }
    return dateValue;
  }

  serialize(value: unknown): string {
    if (value instanceof Date) {
      return value.toISOString();
    }
    throw new Error("Invalid date value for serialization");
  }

  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10));
    }
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    throw new Error("Invalid date literal");
  }
}
