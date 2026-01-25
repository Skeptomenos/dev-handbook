/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  options: {
    doNotFollow: {
      path: 'node_modules',
    },
    tsPreCompilationDeps: true,
    tsConfig: {
      fileName: 'tsconfig.json',
    },
  },
  forbidden: [
    /* RULES: 3-Layer Architecture Enforcement */
    {
      name: 'no-presentation-to-data',
      comment: 'Presentation Layer (UI/CLI) MUST NOT import directly from Data Layer (DB/Repo). Go through Service Layer.',
      severity: 'error',
      from: { path: '^(src/)?(presentation|controllers|cli|ui|components)' },
      to: { path: '^(src/)?(data|db|repositories|external)' },
    },
    {
      name: 'no-cross-feature-imports',
      comment: 'Features must be isolated. Use a Shared module for common code.',
      severity: 'error',
      from: { path: '^src/features/([^/]+)/.+' },
      to: {
        path: '^src/features/([^/]+)/.+',
        pathNot: ['^src/features/$1/.+'], // Allow importing own feature
      },
    },
    {
      name: 'no-circular',
      severity: 'error',
      from: {},
      to: { circular: true },
    },
  ],
};
