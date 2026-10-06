import test from "node:test";
import assert from "node:assert/strict";
import {
  enquiryDeliveryAvailable,
  enquiryMockMode,
  privacyPolicyHref,
  publicIndexingEnabled,
  publicSiteOrigin,
} from "../src/lib/site-config.ts";

const keys = [
  "ENQUIRY_MODE",
  "ENQUIRY_WEBHOOK_URL",
  "PRIVACY_POLICY_URL",
  "SITE_URL",
  "SITE_INDEXING_ENABLED",
];
function configured(values, run) {
  const saved = Object.fromEntries(keys.map((key) => [key, process.env[key]]));
  for (const key of keys) {
    if (values[key] === undefined) delete process.env[key];
    else process.env[key] = values[key];
  }
  try {
    run();
  } finally {
    for (const key of keys) {
      if (saved[key] === undefined) delete process.env[key];
      else process.env[key] = saved[key];
    }
  }
}

test("mock enquiry mode is the default and never enables real delivery", () => {
  for (const mode of [undefined, "mock", "invalid"]) {
    configured(
      {
        ENQUIRY_MODE: mode,
        ENQUIRY_WEBHOOK_URL: "https://receiver.example/enquiries",
        PRIVACY_POLICY_URL: "https://business.example/privacy",
      },
      () => {
        assert.equal(enquiryMockMode(), true);
        assert.equal(enquiryDeliveryAvailable(), false);
      },
    );
  }
});

test("live enquiry intake requires both an HTTPS receiver and a readable-policy destination", () => {
  configured(
    {
      ENQUIRY_MODE: "live",
      ENQUIRY_WEBHOOK_URL: "https://receiver.example/enquiries",
    },
    () => assert.equal(enquiryDeliveryAvailable(), false),
  );
  configured(
    {
      ENQUIRY_MODE: "live",
      ENQUIRY_WEBHOOK_URL: "https://receiver.example/enquiries",
      PRIVACY_POLICY_URL: "https://business.example/privacy",
    },
    () => {
      assert.equal(enquiryMockMode(), false);
      assert.equal(enquiryDeliveryAvailable(), true);
    },
  );
  configured(
    {
      ENQUIRY_MODE: "live",
      ENQUIRY_WEBHOOK_URL: "http://receiver.example/enquiries",
      PRIVACY_POLICY_URL: "https://business.example/privacy",
    },
    () => assert.equal(enquiryDeliveryAvailable(), false),
  );
  configured(
    { PRIVACY_POLICY_URL: "https://user:secret@business.example/privacy" },
    () => assert.equal(privacyPolicyHref(), undefined),
  );
});

test("indexing requires explicit release enablement and an HTTPS canonical origin", () => {
  configured({ SITE_INDEXING_ENABLED: "true" }, () =>
    assert.equal(publicIndexingEnabled(), false),
  );
  configured(
    { SITE_URL: "https://business.example/", SITE_INDEXING_ENABLED: "false" },
    () => assert.equal(publicIndexingEnabled(), false),
  );
  configured(
    { SITE_URL: "https://business.example/", SITE_INDEXING_ENABLED: "true" },
    () => {
      assert.equal(publicIndexingEnabled(), true);
      assert.equal(publicSiteOrigin(), "https://business.example");
    },
  );
});
