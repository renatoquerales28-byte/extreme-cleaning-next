# Unused Wizard Steps

This folder contains wizard step components that are **not currently in use** in the active wizard configuration.

## Why are these here?

These components were part of earlier iterations or planned features that are not yet activated. They have been moved here to:

1. **Reduce confusion** - Developers won't accidentally use or modify unused components
2. **Keep codebase clean** - Active wizard only shows components actually in use
3. **Preserve for future** - These may be needed for Phase 2 or future features

## Components in this folder

- `AddressStep.tsx` - Standalone address input step
- `DateStep.tsx` - Date/time selection step
- `ExtrasStep.tsx` - Standalone extras selection step
- `FrequencyStep.tsx` - Standalone frequency selection step
- `LogisticsStep.tsx` - Logistics and scheduling step
- `PriceAndQuoteStep.tsx` - Combined pricing and quote step
- `PriceStep.tsx` - Standalone pricing display step
- `QuoteStep.tsx` - Standalone quote step
- `ResidentialStep.tsx` - Residential property details step
- `ReviewStep.tsx` - Final review step

## Currently Active Steps

The active wizard uses these steps (see `src/lib/wizard/config.tsx`):

1. `ZipStep.tsx` - Territory clearance
2. `ServiceStep.tsx` - Service type selection
3. `CleaningTypeStep.tsx` - Cleaning protocol
4. `PropertyAndExtrasStep.tsx` - Combined property details and extras
5. `CommercialStep.tsx` - Commercial facility specs
6. `PMSelectionStep.tsx` - Portfolio summary (property management)
7. `ContactStep.tsx` - Contact information
8. `SuccessStep.tsx` - Confirmation
9. `ReturningLookupStep.tsx` - Returning customer lookup
10. `PropertySelectionStep.tsx` - Select saved property
11. `QuickConfigStep.tsx` - Quick configuration

## How to reactivate a component

If you need to use one of these components:

1. Move the file back to `src/components/wizard/steps/`
2. Import it in `src/lib/wizard/config.tsx`
3. Add it to the `WIZARD_FLOW` configuration
4. Update the step flow logic as needed

## Technical Notes

- These files are excluded from TypeScript compilation (see `tsconfig.json`)
- These files are excluded from Next.js build (see `next.config.mjs`)
- Import paths may need updating if moved back (they reference `../WizardActionContext`)

---

**Last Updated:** February 16, 2026  
**Moved by:** Project cleanup - Phase 1
