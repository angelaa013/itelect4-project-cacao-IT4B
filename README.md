# Pet Adoption Platform

## Project Concept

A TypeScript-based pet adoption platform that manages pets, adopters, and adoption requests. This project demonstrates TypeScript fundamentals using a simple domain-focused example.

Key TypeScript concepts shown in this repo:

- **Interfaces**: `Pet`, `Adopter`, and `AdoptionRequest`
- **Enums**: `PetType` and `AdoptionStatus`
- **Generic Interface**: `ApiResponse<T>` for flexible response data
- **Generic Function**: `getFirst<T>` for reusable array access
- **Utility Types**: `Partial<Pet>` and `Pick<Adopter, "name" | "email">`

## Features

- Create a pet profile with breed, age, vaccination status, and adoption fee
- Calculate total adoption cost from base fee plus donation
- Format pet details into a readable string
- Use generic and utility types for strong typing
- Build a generic adoption response object

## Project Structure

```
src/
  └── index.ts          # Main application logic
types/
  └── index.ts          # TypeScript enums and interfaces
package.json
tsconfig.json
README.md
```

## How to Run

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the application:
   ```bash
   npx ts-node src/index.ts
   ```

3. Verify TypeScript compilation with zero errors:
   ```bash
   npx tsc --noEmit
   ```

## Requirements Met

- ✅ At least 3 interfaces: `Pet`, `Adopter`, `AdoptionRequest`
- ✅ Generic interface `ApiResponse<T>`
- ✅ Generic function `getFirst<T>`
- ✅ Utility type usage: `Partial<Pet>`, `Pick<Adopter, "name" | "email">`
- ✅ Enums `PetType` and `AdoptionStatus`
- ✅ Zero TypeScript compilation errors

## Example Output

Running `npx ts-node src/index.ts` produces:
- A pet profile object for Luna
- Base adoption fee, donation amount, and total adoption cost
- Pet profile formatting output
- A selected adoption status value from `getFirst`
- An updated pet object using `Partial<Pet>`
- Picked adopter contact details
- A generic adoption response object containing `totalFee`

## Author
Princess Angela Cacao
IT4B
De La Salle Lipa