/**
 * Commitlint configuration — Conventional Commits.
 *
 * File-only per WIS-28. The runner (husky/lefthook + CI hook) is wired up
 * in the scaffolding child issue, so this config exists to lock in the
 * rules now and to fail intentionally if anything tries to invoke it
 * without the dependency installed.
 *
 * Rule reference: https://www.conventionalcommits.org/en/v1.0.0/
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Allowed commit types — keep in sync with CONTRIBUTING when written.
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
      ],
    ],
    'subject-case': [2, 'never', ['upper-case', 'pascal-case', 'start-case']],
    'header-max-length': [2, 'always', 100],
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [2, 'always'],
  },
};
