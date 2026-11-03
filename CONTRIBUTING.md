# Contributing to BillSwipe

Thank you for considering contributing to BillSwipe! We welcome contributions from everyone.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce**
- **Expected behavior**
- **Actual behavior**
- **Screenshots** (if applicable)
- **Environment details** (OS, browser, Node version)

### Suggesting Enhancements

Enhancement suggestions are welcome! Please provide:

- **Clear description** of the enhancement
- **Use cases** explaining why this would be useful
- **Possible implementation** (if you have ideas)

### Pull Requests

1. **Fork the repository**
2. **Create a branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes**
4. **Test thoroughly**
5. **Commit** (`git commit -m 'Add some amazing feature'`)
6. **Push** (`git push origin feature/amazing-feature`)
7. **Open a Pull Request**

## Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Setup Steps

```bash
# Clone your fork
git clone https://github.com/your-username/billswipe.git
cd billswipe

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

### Project Structure

```
billswipe/
├── app/              # Next.js app directory
│   ├── api/         # API routes
│   ├── page.tsx     # Home page
│   └── ...
├── components/       # React components
├── lib/             # Utility functions
├── types/           # TypeScript types
└── public/          # Static files
```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` type unless absolutely necessary

### Code Style

```typescript
// Good
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

// Bad
export function formatCurrency(amount: any) {
  return "$" + amount
}
```

### Component Structure

```typescript
// Good component structure
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export default function Button({ 
  label, 
  onClick, 
  variant = 'primary' 
}: ButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`btn btn-${variant}`}
    >
      {label}
    </button>
  );
}
```

### File Naming

- Components: `PascalCase.tsx` (e.g., `BillCard.tsx`)
- Utilities: `camelCase.ts` (e.g., `formatCurrency.ts`)
- Types: `camelCase.ts` or `index.ts` in types folder
- Pages: `page.tsx` (Next.js convention)

### Imports

```typescript
// Group imports logically
// 1. React/Next.js
import { useState } from 'react';
import Link from 'next/link';

// 2. Third-party
import { motion } from 'framer-motion';

// 3. Local
import { Bill } from '@/types';
import { formatCurrency } from '@/lib/utils';
```

## Commit Messages

Use clear and meaningful commit messages:

```bash
# Good
git commit -m "Add swipe animation to BillCard component"
git commit -m "Fix payment processing error handling"
git commit -m "Update API documentation for /api/bills endpoint"

# Bad
git commit -m "fixed stuff"
git commit -m "updates"
git commit -m "wip"
```

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(swipe): add undo functionality to swipe interface

- Add undo button component
- Implement swipe history tracking
- Update UI to show undo option

Closes #123
```

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Writing Tests

```typescript
// Example test
import { formatCurrency } from '@/lib/utils';

describe('formatCurrency', () => {
  it('formats currency correctly', () => {
    expect(formatCurrency(1000)).toBe('$1,000');
    expect(formatCurrency(1500.50)).toBe('$1,501');
  });
});
```

## Documentation

- Update README.md if adding new features
- Document API changes in API_DOCUMENTATION.md
- Add JSDoc comments for complex functions
- Update TypeScript types and interfaces

### JSDoc Example

```typescript
/**
 * Formats a number as US currency
 * @param amount - The amount to format
 * @returns Formatted currency string (e.g., "$1,234")
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
```

## Pull Request Process

1. **Update documentation** as needed
2. **Add/update tests** for new features
3. **Ensure all tests pass** (`npm test`)
4. **Run linter** (`npm run lint`)
5. **Build successfully** (`npm run build`)
6. **Update CHANGELOG.md** if applicable
7. **Request review** from maintainers

### PR Title Format

```
[Type] Brief description

Examples:
[Feature] Add recurring donation support
[Fix] Resolve payment processing timeout
[Docs] Update API documentation
[Refactor] Improve swipe animation performance
```

### PR Description Template

```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
- [ ] All tests passing
```

## Code Review Guidelines

### For Authors
- Keep PRs focused and small
- Write clear descriptions
- Respond to feedback promptly
- Be open to suggestions

### For Reviewers
- Be constructive and respectful
- Ask questions instead of making demands
- Approve when ready, request changes when needed
- Test the changes locally when possible

## Feature Requests

We track feature requests using GitHub Issues. When submitting:

1. **Check existing issues** first
2. **Use the feature request template**
3. **Provide context** and use cases
4. **Explain the value** to users
5. **Be open to discussion**

## Security

If you discover a security vulnerability:

1. **Do NOT open a public issue**
2. **Email security concerns** to security@billswipe.com
3. **Provide detailed information**
4. **Allow time for resolution** before disclosure

## Questions?

- **GitHub Discussions**: Ask questions and discuss ideas
- **GitHub Issues**: Report bugs and request features
- **Email**: contact@billswipe.com

## Recognition

Contributors will be recognized in:
- README.md Contributors section
- Release notes
- Project documentation

## License

By contributing to BillSwipe, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to BillSwipe! Together, we're making charitable giving more accessible and impactful. 🎉
