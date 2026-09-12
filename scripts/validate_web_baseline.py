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

# CI/CD policy invariants. These text-level checks deliberately protect the
# security properties of the workflow without adding another YAML dependency.
validate_workflow = (root / '.github/workflows/validate-web-baseline.yml').read_text()
deploy_workflow = (root / '.github/workflows/deploy-pages.yml').read_text()

assert 'contents: read' in validate_workflow
assert 'contents: write' not in validate_workflow
assert 'pages: write' not in validate_workflow
assert 'id-token: write' not in validate_workflow
assert 'environment:' not in validate_workflow
assert 'Verify exact candidate checkout' in validate_workflow
assert 'npm audit --omit=dev --audit-level=high' in validate_workflow
assert 'npm audit --audit-level=high' in validate_workflow
assert 'cancel-in-progress: true' in validate_workflow
assert 'npm sbom --sbom-format cyclonedx > osb-sbom.cdx.json' in validate_workflow
assert "s.bomFormat!=='CycloneDX'" in validate_workflow
assert 'actions/upload-artifact@ea165f8d65b6e75b540449e92b4886f43607fa02' in validate_workflow
assert 'if-no-files-found: error' in validate_workflow
assert 'retention-days: 7' in validate_workflow
assert 'npm install --no-save' not in validate_workflow
assert 'npx playwright install --with-deps chromium firefox webkit' in validate_workflow
assert 'Verify validated static export artifact boundary' in validate_workflow
assert 'test -d out' in validate_workflow
assert 'test -f out/index.html' in validate_workflow
assert 'test ! -e out/CNAME' in validate_workflow
assert 'cp CNAME out/CNAME' not in validate_workflow
assert 'name: osb-validated-static-export-${{ github.event.pull_request.head.sha || github.sha }}' in validate_workflow
assert 'path: out/' in validate_workflow
assert 'retention-days: 3' in validate_workflow
assert validate_workflow.count('name: osb-validated-static-export-') == 1
assert validate_workflow.index('Run multi-engine responsive smoke') < validate_workflow.index('Upload validated static export')

package_json = json.loads((root / 'package.json').read_text())
assert package_json['devDependencies']['playwright'] == '1.55.1'

assert 'workflow_run:' in deploy_workflow
assert 'workflows: ["Validate Web Baseline"]' in deploy_workflow
assert 'branches: [main]' in deploy_workflow
assert 'workflow_dispatch:' not in deploy_workflow
assert "github.event.workflow_run.conclusion == 'success'" in deploy_workflow
assert 'ref: ${{ github.event.workflow_run.head_sha }}' in deploy_workflow
assert 'EXPECTED_SHA: ${{ github.event.workflow_run.head_sha }}' in deploy_workflow
assert 'Verify exact deployment candidate' in deploy_workflow
assert 'Verify production release authorization' in deploy_workflow
assert 'EXPECTED_DEPLOY_SHA: ${{ github.event.workflow_run.head_sha }}' in deploy_workflow
assert 'node scripts/validate-production-authorization.mjs' in deploy_workflow
assert 'npm ci --no-audit --no-fund' in deploy_workflow
assert 'npm audit --omit=dev --audit-level=high' in deploy_workflow
assert 'npm audit --audit-level=high' in deploy_workflow
assert 'pages: write' in deploy_workflow
assert 'id-token: write' in deploy_workflow
assert 'actions/deploy-pages@d6db90164ac5ed86f2b6aed7e0febac5b3c0c03e' in deploy_workflow

print('Web baseline validation passed')
