function httpsUrl(value: string | undefined): URL | undefined {
  if (!value?.trim()) return;
  try {
    const url = new URL(value.trim());
    if (url.protocol === "https:" && !url.username && !url.password) return url;
  } catch {
    // An invalid deployment value must not enable a public feature.
  }
}

export function privacyPolicyHref(): string | undefined {
  return httpsUrl(process.env.PRIVACY_POLICY_URL)?.href;
}

export function enquiryMockMode(): boolean {
  return process.env.ENQUIRY_MODE !== "live";
}

export function enquiryDeliveryAvailable(): boolean {
  return Boolean(
    !enquiryMockMode() &&
    httpsUrl(process.env.ENQUIRY_WEBHOOK_URL) &&
    privacyPolicyHref(),
  );
}

export function publicSiteOrigin(): string | undefined {
  return httpsUrl(process.env.SITE_URL)?.origin;
}

export function publicIndexingEnabled(): boolean {
  return Boolean(
    process.env.SITE_INDEXING_ENABLED === "true" && publicSiteOrigin(),
  );
}
