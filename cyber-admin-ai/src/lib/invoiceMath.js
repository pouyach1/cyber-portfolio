export function calculateInvoiceTotal(items, taxPercent = 0, discountPercent = 0) {
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.rate, 0);
  const afterDiscount = subtotal - subtotal * (discountPercent / 100);
  const total = afterDiscount + afterDiscount * (taxPercent / 100);
  return { subtotal, afterDiscount, total };
}
