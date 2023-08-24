// @ts-check
import { DiscountApplicationStrategy } from "../generated/api";

/**
 * @typedef {import("../generated/api").InputQuery} InputQuery
 * @typedef {import("../generated/api").FunctionResult} FunctionResult
 */

/**
 * @type {FunctionResult}
 */
console.log('Function called'); 
const EMPTY_DISCOUNT = {
  discountApplicationStrategy: DiscountApplicationStrategy.First,
  discounts: [],
};

export default /**
 * @param {InputQuery} input
 * @returns {FunctionResult}
 */
(input) => {
  // Get total cart cost
  const totalCartCost = parseFloat(input.cart.cost.totalAmount.amount);

  // Check if total cart cost is above 20000
  if (totalCartCost <= 20000) {
    console.error("Cart total is not above 20000.");
    return EMPTY_DISCOUNT;
  }

  console.log("Hello World");
  console.log(input.cart.lines);
  const targetLines = input.cart.lines.filter(line => line.merchandise.product.bxgytarget == true);

  if (!targetLines.length) {
    console.error("No cart lines qualify for volume discount.");
    return EMPTY_DISCOUNT;
  }

  const variant = /** @type {ProductVariant} */ (targetLines[0].merchandise);
  const target = /** @type {Target} */ ({
    productVariant: {
      id: variant.id
    }
  });

  return {
    discounts: [
      {
        targets: [target],
        value: {
          percentage: {
            value: "100.0"
          }
        }
      }
    ],
    discountApplicationStrategy: DiscountApplicationStrategy.First
  };
};
