#!/usr/bin/env bash
set -euo pipefail

# ========================
# 🪄 CONFIGURATION
# ========================
BUCKET="larsjohansen-frontend"
BUILD_DIR="$HOME/code/larsjohansen-com/frontend/build/client"
REGION="us-west-2"
CF_DIST_ID="EL9F6AILCFWR0"

# ========================
# 🧭 BUILD
# ========================
echo "👉 Building project..."
npm run build

# ========================
# 📤 UPLOAD ASSETS
# ========================
echo "👉 Syncing static assets to S3..."
aws s3 sync "$BUILD_DIR" "s3://$BUCKET" \
  --delete \
  --exclude index.html \
  --exclude .DS_Store \
  --cache-control "public,max-age=31536000,immutable" \
  --region "$REGION"

echo "👉 Uploading index.html with no-cache..."
aws s3 cp "$BUILD_DIR/index.html" "s3://$BUCKET/index.html" \
  --cache-control "no-cache" \
  --region "$REGION"

# ========================
# 🌐 CLOUDFRONT INVALIDATION
# ========================
INV_ID="$(aws cloudfront create-invalidation \
  --distribution-id "$CF_DIST_ID" \
  --paths '/*' \
  --query 'Invalidation.Id' \
  --output text \
  --no-cli-pager)"
echo "👉 Invalidation started: $INV_ID"

aws cloudfront wait invalidation-completed \
  --distribution-id "$CF_DIST_ID" \
  --id "$INV_ID" \
  --no-cli-pager

echo "✅ Deployment completed successfully!"