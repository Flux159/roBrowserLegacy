# Community skill-effect repair review

This draft ports the accumulated local effect mappings and controllers for review. It is intentionally broader than the focused lifetime, item-loader, sound-volume, and icon-alias PRs. It depends on the lifetime fixes in PR #42.

The current upstream skill constants, newer skill metadata and built-in tree merging are retained. Local Builder paths, phone controls, account data, economy settings, and companion replacement logic are not imported.

The implementation covers cast/success/hit event separation, original STR and sound references, explicit ground-unit mappings, one-shot ground audio with bounded deduplication, status-driven phases, server-owned cleanup, directional rendering, color pulses, and modern spirit-sphere counters. Failed casts must not be treated as successful effect triggers.

## Resource requirements

No game data is included. The mappings require compatible resources supplied by the user. Recovery recipes and an English inventory of resource mods are published in [the community repair kit](https://github.com/varconti/ragnarokoffline-community-repairs). A renderer mapping cannot restore a missing texture by itself.

## Compatibility and limits

- The local reference uses a current Renewal rAthena setup. Native skill-unit IDs must be checked against the app's pinned server before enabling server-specific Refraction or Meteor Storm Buster identities. Shared identifiers must not be globally reassigned.
- Some existing local effects are adaptations, not confirmed original procedural implementations. Unknown variant selection has not been reverse engineered.
- Native RGB ranges were identified for six buffs; the 20 ms pulse cadence is a browser adaptation.
- Full EDP particles/clones, Double Casting halos, several procedural visuals and some phase/variant behavior remain incomplete.
- WAV byte equality does not confirm the skill association or official playback timing.
- No new in-game audiovisual acceptance or original sound-association review was performed.

This draft is review material, not a claim that all classes are fully fixed or that the application's vendor pin should be moved immediately. The maintainer can split mappings and controllers into smaller commits after checking protocol/resource compatibility.

## Validation and overlay accounting

The public fork passed 348 tests across 56 files and all build targets. Targeted ESLint checks passed for all nine ported modules. Tests cover status start/end/restart, known variant bounds, detached unit termination, bounded ground-audio deduplication, lifetime and direction handling. These are automated source checks, not in-game acceptance.

The append-only overlays contain 1,148 changed or added effect entries and 571 changed or added skill entries. They retain 585 upstream-only effect entries and 42 upstream-only skill entries. These counts describe table entries, not a count of fully repaired skills. Current upstream constants, metadata and tree merging remain intact.
