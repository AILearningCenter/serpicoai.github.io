# Plan: Choose and configure an external checkout vendor for the digital product

- **Value:** high
- **Priority:** P2
- **Slug:** digital-storefront-vendor-setup
- **Preferred models:** mid
- **Assignee:** human
- **Depends on:** none

## Progress
- [ ] Step 1: Compare candidate checkout vendors against this product's actual requirements
- [ ] Step 2: Human creates the vendor account and configures the product
- [ ] Step 3: Human retrieves and hands off the embed/checkout credentials
- [ ] Step 4: Human confirms an end-to-end test purchase succeeds
- [ ] Done when holds

## Goal
Stand up a real external checkout/commerce account (replacing Wix Stores) capable of selling the AI Usage Policy Template as an automatically-delivered digital download, so the site-rebuild plan has real credentials/embed code to wire in.

## Context read
Live HTTP + HTML inspection of `https://www.ailearningcenter.ai/product-page/ai-usage-policy-template-2026`
during this session (raw fetch, not the summarizing WebFetch tool, to get
literal facts rather than a paraphrase):
- Product: "AI Usage Policy Template 2026" — a legal/compliance policy
  document. `<title>AI Usage Policy Template 2026 | Serpico AI Learning</title>`.
- Pricing (JSON-LD): `"@type":"Product"`, `"priceCurrency":"USD"`,
  `"price":"495"` — displayed as a $495 sale price against a $599 regular
  price on-page.
- `"productType":"digital"` and a `digitalProductFileItems` field are present
  in the page data — this is a **Wix Stores digital product** with an
  attached file for automatic post-purchase delivery, not a physical-goods
  listing. No variant/quantity selectors found.
- Wix's own commerce stack is in play throughout the page (`wixstores`,
  `ecom-platform-checkout`, `ecom-platform-cart-icon`, a dedicated
  `thank-you`/`ThankYou` post-purchase page), plus a `PayPal` reference —
  meaning today's checkout accepts at least PayPal (likely also cards via
  Wix Payments).
- No physical shipping/tax-region logic found — consistent with a pure
  digital download.

## Dependencies (how to fill)
Checked all `.plans/` lanes. **Depends on: none** — this can be done in
parallel with the site rebuild; it produces an account + credentials, not
site code, so it isn't blocked by `static-site-foundation`. The sibling plan
**`digital-product-checkout-migration`** depends on *this* plan (it needs the
output of Step 3 to wire anything into the rebuilt page).

## Constraints
- **Assignee is human because this plan requires real account creation, ToS
  agreement, and payment/bank details an AI agent cannot and should not
  provide.** An agent may prepare the comparison in Step 1 and draft the
  configuration checklist, but must not attempt to create the account,
  accept terms, or handle real financial credentials.
- Preserve continuity where reasonable: the current checkout already accepts
  PayPal — prefer a vendor that supports PayPal alongside cards, so returning
  customers aren't surprised.
- This is a paid ($495) legal/compliance product — the chosen vendor must
  handle sales tax/VAT collection automatically, or the gap must be
  explicitly flagged rather than silently ignored (a real compliance risk,
  not a nice-to-have).
- Do not commit any API key, secret, or account credential to the repository
  in plaintext — hand off via whatever secrets mechanism the executing agent
  documents (env var, secrets manager, or a private note to the human), and
  record only the *fact* of handoff in this plan, never the secret itself.

## Conventions
N/A (vendor/account setup, not code) — the follow-on plan
(`digital-product-checkout-migration`) will follow `static-site-foundation`'s
stack conventions when it consumes this plan's output.

## Steps
| # | Task | Touches | Verify by | Route to |
|---|------|---------|-----------|----------|
| 1 | Compare candidate vendors for a single-digital-product storefront against this product's real requirements (PayPal + card support, automatic digital-file delivery on purchase, tax/VAT handling, embeddable button/widget vs. hosted-page-only checkout, fee %): e.g. Gumroad, Lemon Squeezy, Paddle, Stripe Checkout/Payment Links (+ a delivery add-on if Stripe alone doesn't fulfill digital files) | new comparison doc | Comparison doc covers all listed criteria for at least 3 vendors, with a recommendation | mid |
| 2 | **(Human)** Create the chosen vendor account, upload the product (name, price, the actual policy-template file), and configure automatic digital delivery | vendor's own dashboard (external) | Product exists in the vendor dashboard with the file attached and price set | human |
| 3 | **(Human)** Retrieve the embed snippet / buy-button code / hosted checkout link (and API key if the integration needs one) and hand it off via a documented, non-plaintext-committed channel for `digital-product-checkout-migration` to consume | secrets handoff channel (external to repo) | The dependent plan's executor confirms it received usable credentials/snippet | human |
| 4 | **(Human)** Run a real or sandbox test purchase end-to-end and confirm the digital file is actually delivered | vendor's live/sandbox checkout | A test purchase completes and the buyer receives the file | human |

## Risks
- Choosing a vendor without PayPal support could lose a payment method
  existing customers already expect → weigh this explicitly in Step 1's
  comparison, don't default to card-only.
- A vendor that doesn't auto-handle sales tax could create real compliance
  exposure for a $495 commercial product → must be called out explicitly in
  the comparison, not discovered after launch.
- Handoff of credentials outside the repo is easy to do sloppily (e.g.
  pasted into an insecure channel) → the executing agent/human should use
  whatever secrets-handling convention this project already trusts, and this
  plan should not itself become the record of a live secret.

## Escalation triggers
- Ambiguous requirement discovered → back to planner
- Task fails verification twice → bigger model
- Architectural decision needed (e.g. no vendor cleanly satisfies tax + PayPal + embeddability) → bigger model / human
- Step looks overqualified for its assigned tier → downgrade to smaller/local model instead

## Done when
- A real vendor account exists with the AI Usage Policy Template product configured (price, file, automatic delivery).
- A real or sandbox test purchase has been completed and confirmed to deliver the file correctly.
- Embed snippet/checkout link (and any needed API key) has been handed off through a documented, secret-safe channel to `digital-product-checkout-migration`.
