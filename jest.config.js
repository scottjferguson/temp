module.exports = {
  preset: 'jest-expo',
  setupFiles: ['./config/jest/setup.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testPathIgnorePatterns: [
    'node_modules/',
    'assets/',
    'config/',
    'src/theme',
    'styles.js',
  ],
  coveragePathIgnorePatterns: ['node_modules/', 'src/theme', 'styles.js'],
};
