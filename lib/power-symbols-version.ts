/** Customer download and store version currently offered to the public. */
export const POWER_SYMBOLS_VERSION = "0.2.7"

/**
 * Highest build an existing beta entitlement may activate.
 * Kept separate so Daniel can field-test a newer candidate without publishing
 * that candidate as the customer download or store version.
 *
 * 0.2.8 matches what production has served since the 2026-08-25 deploy.
 * Commit a68d9c3 raised this to 0.2.9 but was never deployed; raise it here
 * when that build is ready to activate.
 */
export const POWER_SYMBOLS_ACTIVATION_MAX_VERSION = "0.2.8"
