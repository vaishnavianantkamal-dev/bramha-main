# ============================================
# Fix Vite Cache Issue
# ============================================
# This script clears Vite cache and reinstalls dependencies

Write-Host "🔧 Fixing Vite Cache Issue..." -ForegroundColor Cyan
Write-Host ""

# Step 1: Clear Vite cache
Write-Host "1️⃣  Clearing Vite cache..." -ForegroundColor Yellow
if (Test-Path ".vite") {
    Remove-Item -Recurse -Force ".vite"
    Write-Host "   ✅ Cleared .vite folder" -ForegroundColor Green
}

# Step 2: Clear dist folder
Write-Host "2️⃣  Clearing dist folder..." -ForegroundColor Yellow
if (Test-Path "dist") {
    Remove-Item -Recurse -Force "dist"
    Write-Host "   ✅ Cleared dist folder" -ForegroundColor Green
}

# Step 3: Clear node_modules/.vite
Write-Host "3️⃣  Clearing node_modules/.vite..." -ForegroundColor Yellow
if (Test-Path "node_modules/.vite") {
    Remove-Item -Recurse -Force "node_modules/.vite"
    Write-Host "   ✅ Cleared node_modules/.vite" -ForegroundColor Green
}

# Step 4: Reinstall dependencies
Write-Host "4️⃣  Reinstalling dependencies..." -ForegroundColor Yellow
npm install
Write-Host "   ✅ Dependencies installed" -ForegroundColor Green

# Step 5: Clear npm cache
Write-Host "5️⃣  Clearing npm cache..." -ForegroundColor Yellow
npm cache clean --force
Write-Host "   ✅ npm cache cleared" -ForegroundColor Green

Write-Host ""
Write-Host "✅ All done! You can now run: npm run dev" -ForegroundColor Green
Write-Host ""
