import json
from pathlib import Path

root = Path(__file__).resolve().parents[1]
web = json.loads((root / 'config/web-policy.json').read_text())
session = json.loads((root / 'config/session-policy.json').read_text())

assert {'en-GB', 'ta-IN'} <= set(web['requiredLocales'])
assert web['accessibilityTarget'] == 'WCAG-2.2-AA'
assert web['secureHeadersRequired'] is True
assert web['contentSecurityPolicyRequired'] is True
assert web['csrfProtectionRequired'] is True
assert web['serverAuthoritativeTenantScope'] is True
assert web['performanceBudgets']['lcpMs'] <= 2500
assert web['performanceBudgets']['inpMs'] <= 200
assert web['performanceBudgets']['cls'] <= 0.1
assert session['secureCookies'] is True
assert session['httpOnlyCookies'] is True
assert session['logoutInvalidatesSession'] is True
assert session['clientRoleClaimsTrusted'] is False
print('Web baseline validation passed')
