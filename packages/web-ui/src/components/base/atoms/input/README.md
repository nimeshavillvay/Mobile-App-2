# Shadcn Input Component

This Input component extends the functionality of a standard input field with optional masking capabilities using @react-input/mask.

## Basic Usage

```tsx
import { Input } from './path-to-input-component';

// Regular input
<Input type="text" placeholder="Enter text" />

// Masked input
<Input
  type="tel"
  placeholder="(123) 456-7890"
  mask="(___) ___-____"
  replacement={{ _: /\d/ }}
/>
```

## Props

The Input component accepts all standard HTML input props plus:

- `mask`: (optional) A string defining the input mask pattern, (requires replacement to be defined to work properly).
- `replacement`: (optional) An object defining replacement rules for mask characters.

## Masking Examples

### Phone Number:

```tsx
<Input
  type="tel"
  mask="(___) ___-____"
  replacement={{ _: /\d/ }}
  placeholder="(123) 456-7890"
/>
```

### Date:

```tsx
<Input
  type="text"
  mask="__/__/____"
  replacement={{ _: /\d/ }}
  placeholder="DD/MM/YYYY"
/>
```

### Custom Pattern:

```tsx
<Input
  type="text"
  mask="AA-____"
  replacement={{ A: /[A-Z]/, _: /\d/ }}
  placeholder="AB-1234"
/>
```

For more advanced masking options, refer to the [@react-input/mask documentation](https://github.com/nikitababko/react-input-mask).
