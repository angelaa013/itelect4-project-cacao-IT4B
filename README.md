# Pet Adoption Platform

## Project Concept

A TypeScript-based pet adoption platform that manages pets, adopters, and adoption requests. This app demonstrates core TypeScript concepts using a simple pet adoption domain.

Key TypeScript concepts shown in this repo:

- **Interfaces**: `Pet`, `Adopter`, `AdoptionRequest`, `PetProfile`
- **Enums**: `PetType`, `AdoptionStatus`, `Gender`
- **Generic Interface**: `ApiResponse<T>` for flexible response shapes
- **Generic Function**: `getFirst<T>` for reusable array access
- **Utility Types**: `Partial<Pet>` and `Pick<Adopter, "name" | "email">`

## Features

- Build a pet profile with name, type, gender, age, breed, vaccination status, and adoption fee
- Compute adoption total using base fee plus donation
- Format pet details into a readable profile string
- Use generic and utility types to keep typing strong and reusable
- Show a generic API response shape with `ApiResponse<AdoptionRequest>`

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

2. Run the app from the project root:
   ```bash
   npx ts-node src/index.ts
   ```

3. Verify TypeScript compiles with zero errors:
   ```bash
   npx tsc --noEmit
   ```

## Assignment Checklist

- ✅ At least three interfaces (`Pet`, `Adopter`, `AdoptionRequest`)
- ✅ Generic interface `ApiResponse<T>`
- ✅ At least one generic function (`getFirst<T>`)
- ✅ At least two utility type uses (`Partial`, `Pick`)
- ✅ At least one enum (`PetType`, `AdoptionStatus`, `Gender`)
- ✅ README with project concept and run instructions
- ✅ `npx tsc --noEmit` passes with zero errors

## Example Output

Running `npx ts-node src/index.ts` prints:
- the pet object for Luna
- base adoption fee, donation amount, and total adoption cost
- a formatted pet profile string
- the first adoption status from `getFirst`
- a partial pet update object
- adopter contact details using `Pick`
- a generic adoption response object

## Notes

- The adoption fee is configured by pet type for dogs and cats.
- `Partial<Pet>` is used to model a partial update object.
- `Pick<Adopter, "name" | "email">` is used to model contact info.

## Author
Princess Angela Cacao
IT4B
De La Salle Lipa