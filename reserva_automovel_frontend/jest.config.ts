module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Para arquivos TypeScript
    '^.+\\.jsx?$': 'babel-jest', // Para arquivos JS/JSX
  },
  testEnvironment: 'jest-environment-jsdom', // Para suporte a testes com JSX/React
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@tests/(.*)$': '<rootDir>/src/tests/$1',
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // Suporte a extensões relevantes
};
