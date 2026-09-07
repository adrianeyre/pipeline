import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	{
		ignores: ['dist/**', 'dist-web/**', 'coverage/**', 'node_modules/**', 'public/**'],
	},
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		files: ['src/**/*.{ts,tsx}'],
		plugins: {
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			'@typescript-eslint/no-unused-vars': [
				'error',
				{ argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
			],
			'prefer-const': 'error',
			eqeqeq: ['error', 'always'],
		},
	},
	{
		// The test suite renders components and asserts on snapshots; the
		// `react-refresh` component-export rule is about dev-server hot reload
		// and has nothing to say about a test file.
		files: ['src/**/*.test.{ts,tsx}'],
		rules: {
			'react-refresh/only-export-components': 'off',
		},
	},
);
