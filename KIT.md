# KIT.md — Prototype Verification Kit

**Status:** discovery-first. The current README links to an AI Studio app and supplies generic Node.js run instructions. This kit does not infer the prototype's purpose from its repository name.

## Read first
- `README.md`
- `package.json` and lockfile
- source entry points, assets, tests and deployment settings
- licence and data/privacy notices

## Requirements pack
From the source and interface, define one intended user task, inputs, expected output, error behaviour, data handling, external dependencies and pass/fail criteria. If intent remains unclear, record the gap rather than guessing.

## Setup and procurement
README instructions specify Node.js, `npm install`, `.env.local` with `GEMINI_API_KEY`, and `npm run dev`. Verify version/scripts first and use the lockfile. No paid service is assumed; model/API use may cost money, so check the provider terms before invoking it.

## Procedure
1. Inspect scripts and dependency versions.
2. Confirm local secrets are ignored by Git.
3. Install and run with the documented command.
4. Test a normal input, malformed input, empty state and API/network failure.
5. Record actual output and warnings.
6. Check privacy, network calls and client bundle for secret exposure.
7. Document exact environment, rollback and limitations.

## Acceptance
- [ ] Scope is based on observable source/interface.
- [ ] Startup instructions are reproducible.
- [ ] At least one positive and one negative case are recorded.
- [ ] External costs and data flows are disclosed.
- [ ] No secrets are exposed.
- [ ] Unverified behaviour remains labelled unverified.