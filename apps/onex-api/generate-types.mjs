import { join } from "path";
import { GraphQLDefinitionsFactory } from "@nestjs/graphql";

const definitionsFactory = new GraphQLDefinitionsFactory();
const typesPath = join(process.cwd(), './src/types/graphql.ts');

void definitionsFactory.generate({
  typePaths: ['./src/**/*.graphql'],
  path: join(process.cwd(), './src/types/graphql.ts'),
  watch: true,
  emitTypenameField: true,
  customScalarTypeMapping: {
    DateTime: "Date",
  }
});

console.log(`Types generated at: ${typesPath}`);
  