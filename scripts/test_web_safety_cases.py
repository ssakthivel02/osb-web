from pathlib import Path


def accepted(request):
    forbidden = {
        'tenant_override', 'role_override', 'disable_csrf', 'disable_csp',
        'store_sensitive_data_locally', 'open_redirect',
        'sensitive_action_without_reauthentication'
    }
    return not any(request.get(key) for key in forbidden)

cases = [
    {'tenant_override': True},
    {'role_override': True},
    {'disable_csrf': True},
    {'disable_csp': True},
    {'store_sensitive_data_locally': True},
    {'open_redirect': True},
    {'sensitive_action_without_reauthentication': True},
]
assert all(accepted(case) is False for case in cases)
assert accepted({'tenant_override': False, 'disable_csrf': False}) is True

root = Path(__file__).resolve().parents[1]
login_page = (root / 'app/login/page.tsx').read_text()
register_page = (root / 'app/register/page.tsx').read_text()
dashboard_page = (root / 'app/dashboard/page.tsx').read_text()
settings_page = (root / 'app/settings/page.tsx').read_text()
profile_page = (root / 'app/profile/page.tsx').read_text()
track_detail_page = (root / 'app/tracks/[slug]/page.tsx').read_text()
site_header = (root / 'components/site-header.tsx').read_text()
sitemap = (root / 'app/sitemap.ts').read_text()

for public_identity_surface in (login_page, register_page, settings_page, profile_page):
    assert 'type="password"' not in public_identity_surface
    assert '<form' not in public_identity_surface
    assert 'robots: { index: false, follow: false }' in public_identity_surface

assert 'does not authenticate learners or collect credentials' in login_page
assert 'does not create learner accounts or collect personal information' in register_page
assert 'No personal progress data is stored.' in dashboard_page
assert 'Sakthivel' not in dashboard_page
assert 'robots: { index: false, follow: false }' in dashboard_page
assert 'does not identify learners, record completions or store capability evidence' in profile_page
assert 'Start this path' not in track_detail_page
assert '>Sign in<' not in site_header
for inactive_identity_route in ('/dashboard/', '/login/', '/register/', '/profile/', '/settings/'):
    assert inactive_identity_route not in sitemap

print('Web safety cases passed')
