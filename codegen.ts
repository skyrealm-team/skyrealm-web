import { CodegenConfig } from "@graphql-codegen/cli";
import * as dotenv from "dotenv-flow";

dotenv.config({
  node_env: "development",
});

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_BACKEND_API,
  generates: {
    "./src/graphql/types.d.ts": {
      plugins: ["typescript"],
      config: {
        avoidOptionals: true,
        noExport: true,
      },
    },
  },
  ignoreNoDocuments: true,
  hooks: { afterOneFileWrite: ["prettier --write"] },
};

export default config;
