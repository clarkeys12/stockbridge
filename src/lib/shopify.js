const DOMAIN = 'stockbridge-6607.myshopify.com';
const TOKEN = '93ad84a85c6a175acf43dd03bf0048ec';
const API_VERSION = '2024-01';
const ENDPOINT = `https://${DOMAIN}/api/${API_VERSION}/graphql.json`;

async function shopifyFetch(query, variables = {}) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) {
    console.error('Shopify API errors:', json.errors);
    throw new Error(json.errors[0]?.message || 'Shopify API error');
  }
  return json.data;
}

/* ---- Product Queries ---- */

export async function fetchAllProducts() {
  const query = `{
    products(first: 50) {
      edges {
        node {
          id
          handle
          title
          description
          descriptionHtml
          images(first: 10) {
            edges {
              node {
                src: url
                altText
              }
            }
          }
          variants(first: 50) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                selectedOptions {
                  name
                  value
                }
                image {
                  src: url
                  altText
                }
              }
            }
          }
          options {
            name
            values
          }
        }
      }
    }
  }`;
  const data = await shopifyFetch(query);
  return data.products.edges.map((e) => e.node);
}

export async function fetchProductByHandle(handle) {
  const query = `query getProduct($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      description
      descriptionHtml
      images(first: 10) {
        edges {
          node {
            src: url
            altText
          }
        }
      }
      variants(first: 50) {
        edges {
          node {
            id
            title
            availableForSale
            price {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
            image {
              src: url
              altText
            }
          }
        }
      }
      options {
        name
        values
      }
    }
  }`;
  const data = await shopifyFetch(query, { handle });
  return data.product;
}

/* ---- Cart API ---- */

const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    lines(first: 50) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              price { amount }
              image { url }
              product { title }
            }
          }
        }
      }
    }
    cost {
      totalAmount { amount currencyCode }
    }
  }
`;

export async function createCart() {
  const query = `mutation { cartCreate { cart { ...CartFields } userErrors { message field } } } ${CART_FRAGMENT}`;
  const data = await shopifyFetch(query);
  if (data.cartCreate.userErrors?.length) {
    throw new Error(data.cartCreate.userErrors[0].message);
  }
  return data.cartCreate.cart;
}

export async function addCartLines(cartId, lines) {
  const query = `mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { ...CartFields }
      userErrors { message field }
    }
  } ${CART_FRAGMENT}`;
  const data = await shopifyFetch(query, {
    cartId,
    lines: lines.map((item) => ({
      merchandiseId: item.merchandiseId,
      quantity: item.quantity || 1,
    })),
  });
  if (data.cartLinesAdd.userErrors?.length) {
    throw new Error(data.cartLinesAdd.userErrors[0].message);
  }
  return data.cartLinesAdd.cart;
}
