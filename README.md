# Pet Adoption Platform

## Project Concept

A TypeScript-based pet adoption platform that manages pets, adopters, and adoption requests. The application demonstrates key TypeScript concepts including:

- **Interfaces**: `Pet`, `Adopter`, and `AdoptionRequest` for structured domain entities
- **Enums**: `PetType` and `AdoptionStatus` for fixed value sets
- **Generic Interface**: `ApiResponse<T>` for reusable API response shape
- **Generic Function**: `getFirst<T>` to return the first item from any array type
- **Utility Types**: `Partial<Pet>` and `Pick<Adopter, "name" | "email">`

## Features

- Define pet profiles with breed, age, vaccination status, and adoption fee
- Calculate total adoption cost including donation
- Format pet profile details into a readable string
- Use generic utilities and TypeScript type helpers
- Return adoption request data in a generic API response structure

## Project Structure

```
src/
  └── index.ts          # Main application logic
types/
  └── index.ts          # TypeScript interfaces and enums
package.json
tsconfig.json
README.md
```

## How to Run

1. **Install dependencies** (if not already installed):
   ```bash
   npm install
   ```

2. **Run the application**:
   ```bash
   npx ts-node src/index.ts
   ```

3. **Check for TypeScript errors** (must show ZERO errors):
   ```bash
   npx tsc --noEmit
   ```

## Requirements Met

✅ Interfaces for the app entities: `Pet`, `Adopter`, `AdoptionRequest`  
✅ Generic interface `ApiResponse<T>`  
✅ Generic function `getFirst<T>`  
✅ Utility types: `Partial<Pet>`, `Pick<Adopter, "name" | "email">`  
✅ Enums: `PetType`, `AdoptionStatus`  
✅ Zero TypeScript compilation errors  

## Example Output

When you run `npx ts-node src/index.ts`, you'll see:
- A pet profile object for Luna
- The total adoption cost including donation
- A formatted pet profile string
- A generic adoption status result from `getFirst`  
- An updated pet object using `Partial<Pet>`  
- Adopter contact details using `Pick<Adopter, "name" | "email">`  
- A generic adoption response object with approval status
