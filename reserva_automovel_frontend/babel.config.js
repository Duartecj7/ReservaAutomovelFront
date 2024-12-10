module.exports = {
    presets: [
      ['@babel/preset-env', { targets: { node: 'current' } }],
      ['@babel/preset-react', {runtime: "automatic"}],// Adiciona suporte a JSX
      '@babel/preset-typescript' // Adicionando suporte a TypeScript
    ],
  };
  