module.exports = {
    preset: 'ts-jest',  // Usando o preset do ts-jest para suportar TypeScript
    testEnvironment: 'node',  // Definindo o ambiente de teste para Node.js
    moduleNameMapper: {
      '^src/(.*)$': '<rootDir>/src/$1', // Mapeia o alias 'src/*' para o diretório 'src'
    },
};