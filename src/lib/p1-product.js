export function getP1FinishOption(options, finishId) {
  return options.find((option) => option.id === finishId) ?? null;
}

export function buildP1PurchaseSummary({ p1, selectedFinish, engraving = "" }) {
  const finish = getP1FinishOption(p1.finishes.options, selectedFinish) ?? p1.finishes.options[0];

  return {
    productName: p1.purchase.productName,
    finish: finish.name,
    price: p1.purchase.price,
    sizeRange: p1.risk.sizeRange,
    sizeStatus: p1.risk.sizeStatus,
    engraving: engraving.trim(),
    engravingIncluded: true,
  };
}
