# ADR 0001: Server-authoritative web security

## Decision
Tenant scope, roles, entitlements, session state, publication state and sensitive actions are authorised by trusted server-side controls. Client route state, hidden fields, local storage and UI role claims are never authoritative.

## Consequences
Sensitive actions require validated sessions and may require reauthentication. Public caching excludes private responses. Security headers and privacy defaults are release gates.
