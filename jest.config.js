module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["./src/test-utils/jest.setup.ts", "./src/test-utils/jest.each.ts"],
  testPathIgnorePatterns: ["./node_modules/", "./build/"],
}
