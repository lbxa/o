import { execSync } from "node:child_process";
import type { PlopTypes } from "@turbo/gen";

interface PackageJson {
  name: string;
  scripts: Record<string, string>;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("init", {
    description: "Generate a new lib for the @o monorepo",
    prompts: [
      {
        type: "input",
        name: "name",
        message:
          "What is the name of the package? (You can skip the `@o/` prefix)",
      },
      {
        type: "input",
        name: "deps",
        message:
          "Enter a space separated list of dependencies you would like to install",
      },
    ],
    actions: [
      (answers) => {
        if ("name" in answers && typeof answers.name === "string") {
          if (answers.name.startsWith("@o/")) {
            answers.name = answers.name.replace("@o/", "");
          }
        }
        return "Config sanitized";
      },
      {
        type: "add",
        path: "libs/{{ name }}/eslint.config.mjs",
        templateFile: "templates/eslint.config.mjs.hbs",
      },
      {
        type: "add",
        path: "libs/{{ name }}/package.json",
        templateFile: "templates/package.json.hbs",
      },
      {
        type: "add",
        path: "libs/{{ name }}/tsconfig.json",
        templateFile: "templates/tsconfig.json.hbs",
      },
      {
        type: "add",
        path: "libs/{{ name }}/README.md",
        templateFile: "templates/README.md.hbs",
      },
      {
        type: "add",
        path: "libs/{{ name }}/src/index.ts",
        template: "export * from './lib';",
      },
      {
        type: "add",
        path: "libs/{{ name }}/src/lib/index.ts",
        template: "export const name = '{{ name }}';",
      },
      {
        type: "modify",
        path: "libs/{{ name }}/package.json",
        async transform(content, answers) {
          if ("deps" in answers && typeof answers.deps === "string") {
            const pkg = JSON.parse(content) as PackageJson;
            for (const dep of answers.deps.split(" ").filter(Boolean)) {
              const version = await fetch(
                `https://registry.npmjs.org/-/package/${dep}/dist-tags`,
              )
                .then((res) => res.json())
                .then((json) => json.latest);
              if (!pkg.dependencies) pkg.dependencies = {};
              pkg.dependencies[dep] = `^${version}`;
            }
            return JSON.stringify(pkg, null, 2);
          }
          return content;
        },
      },
      async (answers) => {
        /**
         * Install deps and format everything
         */
        if ("name" in answers && typeof answers.name === "string") {
          // execSync("pnpm dlx sherif@latest --fix", {
          //   stdio: "inherit",
          // });
          execSync("pnpm i", { stdio: "inherit" });
          execSync(`pnpm lint`, { stdio: "inherit" });
          return "Package linted";
        }
        return "Package not linted";
      },
    ],
  });
}