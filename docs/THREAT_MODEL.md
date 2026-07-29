# Web Threat Model

## Protected assets
Sessions, learner and parent data, tenant context, progress, assessments, payments, content and administrative actions.

## Principal threats
- Cross-tenant data exposure
- XSS, CSRF and clickjacking
- Session fixation or token theft
- Open redirects and malicious deep links
- Insecure storage of personal or child data
- Client-side role or entitlement manipulation
- Supply-chain compromise
- Accessibility failures that block critical journeys

## Required controls
Server-authoritative authorisation, secure cookies, CSP, output encoding, CSRF protection, frame protection, dependency review, privacy-by-default storage, audit logging, safe error handling and tested recovery paths.
