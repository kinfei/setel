const env = process.env.BABEL_ENV || process.env.NODE_ENV;
const plugins = [
  "@babel/plugin-transform-destructuring",
  [
    "@babel/plugin-proposal-decorators",
    {
      decoratorsBeforeExport: true,
    },
  ],
  [
    "@babel/plugin-proposal-class-properties",
    {
      loose: false,
    },
  ],
  "@babel/plugin-syntax-dynamic-import",
  "@babel/plugin-proposal-object-rest-spread",
  "@babel/plugin-proposal-export-default-from",
  [
    "@babel/plugin-transform-regenerator",
    {
      asyncGenerators: false,
      generators: true,
      async: false,
    },
  ],
  [
    "import",
    {
      libraryName: "antd",
      libraryDirectory: env === "test" ? "lib" : "es",
      style: true,
    },
  ],
  "@babel/plugin-proposal-optional-catch-binding",
];
const presets = [
  [
    "@babel/preset-env",
    {
      exclude: ["transform-async-to-generator"],
      modules: env === "test" ? "commonjs" : false,
      useBuiltIns: "entry",
    },
  ],
  [
    "@babel/preset-react",
    {
      development: env === "development",
    },
  ],
];
const options = {};

module.exports = { ...options, plugins, presets };
