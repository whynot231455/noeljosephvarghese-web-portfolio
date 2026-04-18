import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const config = [
  ...nextCoreWebVitals,
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "tsconfig.tsbuildinfo",
    ],
  },
];

export default config;
