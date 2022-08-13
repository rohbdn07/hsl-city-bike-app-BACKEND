module.exports = {
    preset: "ts-jest",
    globals: {
        "ts-jest": {
            tsconfigFile: "tsconfig.json",
        },
    },
    moduleFileExtensions: ["ts", "js"],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },

    testMatch: ["**/test/**/*.test.(ts|js)"],
    testEnvironment: "node",
};
