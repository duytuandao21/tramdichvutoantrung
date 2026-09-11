# Toàn Trung Garage — Codex Instructions

## UI development mode

For small visual/UI-only changes, prioritize fast iteration.

Examples:
- spacing
- padding
- margin
- font size
- font weight
- colors
- border radius
- shadows
- widths/heights
- alignment
- responsive layout
- Tailwind class changes
- visual component adjustments

For these UI-only changes:

1. Modify only the files directly related to the requested UI.
2. Do NOT run the full test suite.
3. Do NOT run a production build.
4. Do NOT run full-project lint unless necessary.
5. Do NOT restart the development server if it is already running.
6. Do NOT inspect unrelated project files.
7. Do NOT perform extensive validation after every small edit.
8. Use the existing dev server and hot reload whenever possible.
9. Review only the changed component and its direct dependencies.
10. Stop after the requested UI change is implemented.

Run full validation only when:
- functionality or application logic changes,
- dependencies change,
- routing changes,
- API/data logic changes,
- TypeScript errors are introduced,
- the user explicitly asks for a final validation/check.

## Final validation mode

When the user says:
"final check", "kiểm tra hoàn chỉnh", "production check",
or equivalent:

Run the appropriate:
- typecheck
- lint
- tests
- production build

and fix relevant issues.