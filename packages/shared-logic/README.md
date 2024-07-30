# Shared Logic

This package contains shared logic and models used across multiple applications (Next.js/Expo) in the monorepo. It includes API functions, hooks, models, and schemas to standardize and streamline the development process.

## Structure and Its Importance

### `src/apis`

The `apis` directory contains functions for interacting with external APIs. It is divided into subdirectories based on the type of API interaction:

- **base**: Contains core API functions that handle requests and responses.
  - **account**: Ex: Functions related to account management.
- **hooks**: Contains React hooks for fetching data using the API functions.
  - **account**: Ex: Hooks related to account management.
- **next**: (Specific to Next.js server components) Contains server-side functions for handling public data API requests with caching. These functions are not to be used in client components.
  - **category**: Ex: Functions related to category data.

**Importance**:

- **Separation of Concerns**: Keeps API interaction logic separate from other parts of the application.
- **Reusability**: Allows API functions to be reused across different components and applications.
- **Maintainability**: Makes it easier to manage and update API interactions in one place.

### `src/lib`

The `lib` directory contains shared libraries, models, and schemas used across the application:

- **models**: Defines TypeScript interfaces and types for various entities.
  - **shared**: Contains models that are used by multiple entities, such as `metadata`.
  - **product.ts**: Ex: Defines the structure for a product.
- **zod-schema**: Contains Zod schemas for validating API responses and other data structures.
  - **productSchema.ts**: Ex: Defines the Zod schema for a product.

**Importance**:

- **Type Safety**: Ensures that data structures are consistent and type-safe throughout the application.
- **Standardization**: Provides a single source of truth for data models and validation schemas.
- **Validation**: Zod schemas help in validating API responses, ensuring that the data conforms to expected structures.

## Usage

Add the TypeScript absolute path to the project that is importing this package

```json
{
  "compilerOptions": {
    "paths": {
      // ...
      "~/*": ["../../packages/shared-logic/src/*"]
    }
  }
}
```

### Next.js

Add this package to the transpile packages list in the Next.js config file.

```js
const nextConfig = {
  transpilePackages: ["@repo/shared-logic"],
};

export default nextConfig;
```

## Shared dependencies

Packages that are shared between the projects such as `@tanstack/react-query` should be installed in this package with the `--save-peer` flag so that they're not included in the build.

```shell
pnpm install @tanstack/react-query -D --save-peer
```

## Creating Reusable UI Components

The models and schemas defined in this package can be used to create reusable UI components in the `web-ui` package. Here's a basic example:

### Example Component

**File**: `web-ui/src/components/ProductCard.tsx`

```typescript
import React from "react";
import type { Product } from "@repo/shared-logic/lib/models/product";

type ProductCardProps = {
  product: Product;
}

const ProductCard: ({ product }: ProductCardProps) => {
  return (
    <div className="product-card">
      <img src={product.image?.url} alt={product.image?.altText} />
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <span>{product.price}</span>
    </div>
  );
};

export default ProductCard;
```
