import eslint from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import sonarjs from 'eslint-plugin-sonarjs';
import tseslint from 'typescript-eslint';

export default defineConfig(
  globalIgnores(['**/node_modules/**', 'dist/**', 'bin/**', 'src/models/**']),
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  prettierRecommended,
  sonarjs.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['*.mjs'],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      import: importPlugin,
    },
    rules: {
      'class-methods-use-this': 'off',
      'consistent-return': 'off',
      'max-len': 'off',
      'no-restricted-syntax': 'off',
      'object-curly-newline': 'off',
      'import/prefer-default-export': 'off',
      'import/order': [
        'error',
        {
          groups: [['builtin', 'external', 'internal']],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'angle-bracket' }],
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      'sonarjs/no-duplicate-string': 'off',
    },
  }
);
