import { join } from "path";
import { GraphQLDefinitionsFactory } from "@nestjs/graphql";

const definitionsFactory = new GraphQLDefinitionsFactory();
void definitionsFactory.generate({
  typePaths: ['./src/**/*.graphql'],
  path: join(process.cwd(), './src/types/graphql.ts'),
  watch: true,
  emitTypenameField: true
});