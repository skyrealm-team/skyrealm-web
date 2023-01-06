import { CodegenConfig } from "@graphql-codegen/cli";
import * as dotenv from "dotenv-flow";

import nextConfig from "./next.config";

dotenv.config({
  node_env: "development",
});

const config: CodegenConfig = {
  schema: nextConfig.publicRuntimeConfig?.env.BACKEND_API,
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
