# StudyToolsHub Phase 2H: Automated Deploy-Preview HTTP Verification Script
# Usage: .\scripts\testDeployPreviewHTTP.ps1 -PreviewUrl "https://deploy-preview-XX--free-tools-study.netlify.app"

param (
    [Parameter(Mandatory=$true)]
    [string]$PreviewUrl
)

$PreviewUrl = $PreviewUrl.TrimEnd('/')
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "  StudyToolsHub Deploy-Preview HTTP Verification Suite" -ForegroundColor Cyan
Write-Host "  Target URL: $PreviewUrl" -ForegroundColor Cyan
Write-Host "============================================================`n"

$tests = @(
    # Core Static
    @{ Url = "$PreviewUrl/"; ExpectedStatus = 200; Name = "Homepage" },
    @{ Url = "$PreviewUrl/about"; ExpectedStatus = 200; Name = "About Page" },
    @{ Url = "$PreviewUrl/contact"; ExpectedStatus = 200; Name = "Contact Page" },
    @{ Url = "$PreviewUrl/study-timetable-template"; ExpectedStatus = 200; Name = "Study Planner" },
    @{ Url = "$PreviewUrl/privacy-policy"; ExpectedStatus = 200; Name = "Privacy Policy" },
    @{ Url = "$PreviewUrl/terms-of-service"; ExpectedStatus = 200; Name = "Terms of Service" },

    # Verified Topics
    @{ Url = "$PreviewUrl/biology-cell-biology"; ExpectedStatus = 200; Name = "Verified Topic (Cell Biology)" },
    @{ Url = "$PreviewUrl/computer-science-algorithms"; ExpectedStatus = 200; Name = "Verified Topic (Algorithms)" },
    @{ Url = "$PreviewUrl/physics-mechanics"; ExpectedStatus = 200; Name = "Verified Topic (Mechanics)" },

    # Needs Review Topics (200 with noindex)
    @{ Url = "$PreviewUrl/economics-macroeconomics"; ExpectedStatus = 200; Name = "Needs Review Topic (Macroeconomics)" },

    # Insufficient Topics (200 with noindex)
    @{ Url = "$PreviewUrl/biology-botany"; ExpectedStatus = 200; Name = "Insufficient Topic (Botany)" },

    # Quiz Routes (200 with noindex & canonical to topic)
    @{ Url = "$PreviewUrl/quiz/biology-cell-biology"; ExpectedStatus = 200; Name = "Quiz Tool (Cell Biology)" },

    # Legacy 301 Permanent Redirect
    @{ Url = "$PreviewUrl/biology-cell-biology-flashcards"; ExpectedStatus = 301; Name = "Legacy 301 Redirect" },

    # Obsolete 410 Gone
    @{ Url = "$PreviewUrl/biology-cell-biology-kids"; ExpectedStatus = 410; Name = "Obsolete 410 Gone" },

    # Nonexistent URL 404 Fallback
    @{ Url = "$PreviewUrl/nonexistent-random-endpoint-xyz"; ExpectedStatus = 404; Name = "Anti-Soft-404 Fallback" },

    # Sitemap & Robots
    @{ Url = "$PreviewUrl/sitemap.xml"; ExpectedStatus = 200; Name = "XML Sitemap" },
    @{ Url = "$PreviewUrl/robots.txt"; ExpectedStatus = 200; Name = "Robots.txt" }
)

$passed = 0
$failed = 0

foreach ($t in $tests) {
    try {
        $req = [System.Net.HttpWebRequest]::Create($t.Url)
        $req.AllowAutoRedirect = $false
        $req.UserAgent = "StudyToolsHub-QA-Auditor/1.0"
        $resp = $req.GetResponse()
        $status = [int]$resp.StatusCode
        $resp.Close()
    } catch [System.Net.WebException] {
        if ($_.Response) {
            $status = [int]$_.Response.StatusCode
            $_.Response.Close()
        } else {
            $status = -1
        }
    } catch {
        $status = -1
    }

    if ($status -eq $t.ExpectedStatus) {
        $passed++
        Write-Host "  [PASS] $($t.Name): Received HTTP $status (Expected $($t.ExpectedStatus))" -ForegroundColor Green
    } else {
        $failed++
        Write-Host "  [FAIL] $($t.Name): Received HTTP $status (Expected $($t.ExpectedStatus))" -ForegroundColor Red
        Write-Host "         URL: $($t.Url)" -ForegroundColor Yellow
    }
}

Write-Host "`n============================================================" -ForegroundColor Cyan
Write-Host "  SUMMARY: $passed Passed, $failed Failed" -ForegroundColor Cyan
Write-Host "============================================================`n"

if ($failed -gt 0) { exit 1 } else { exit 0 }

