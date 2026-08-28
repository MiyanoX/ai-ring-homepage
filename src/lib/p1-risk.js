export function buildP1ReservationState(risk) {
  return {
    sizeRange: risk.sizeRange,
    steps: [...risk.steps],
    deposit: {
      label: risk.depositLabel,
      pending: Boolean(risk.depositPending),
    },
    delivery: {
      label: risk.deliveryLabel,
      pending: Boolean(risk.deliveryPending),
    },
    canReserve: !risk.depositPending && !risk.deliveryPending,
  };
}
