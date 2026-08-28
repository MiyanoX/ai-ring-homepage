export const P1_FUNNEL_EVENTS = [
  "landing_view",
  "reserve_click",
  "checkout_view",
  "payment_success",
];

const SAFE_EVENT_KEYS = new Set(["locale", "surface"]);

export function buildP1FunnelEvent(name, metadata = {}) {
  if (!P1_FUNNEL_EVENTS.includes(name)) {
    throw new Error(`Unsupported P1 funnel event: ${name}`);
  }

  for (const key of Object.keys(metadata)) {
    if (!SAFE_EVENT_KEYS.has(key)) {
      throw new Error("P1 funnel events cannot contain personal information");
    }
  }

  return {
    name,
    ...metadata,
  };
}

export function getP1ReservationMode(risk) {
  return risk.depositPending || risk.deliveryPending ? "local-only" : "production-ready";
}
