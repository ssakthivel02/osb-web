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
print('Web safety cases passed')
