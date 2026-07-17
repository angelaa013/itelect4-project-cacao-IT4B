# Peer Tutoring Booking Platform

## Project Concept

A TypeScript-based peer tutoring booking system that manages tutors, tutees, and tutoring sessions. The platform demonstrates core TypeScript concepts including:

- **Interfaces**: User, Session, and Booking types for structured data
- **Enums**: UserRole (Tutor/Tutee) and BookingStatus (Requested/Confirmed/Completed)
- **Generic Interface**: ApiResponse<T> for flexible API responses
- **Generic Functions**: getFirst<T> to work with any array type
- **Utility Types**: Partial<User> and Pick<User> for type manipulation

## Features

- Create tutor profiles with expertise and hourly rates
- Calculate tutoring session costs based on duration
- Format session information
- Track booking statuses
- Manage tutor and tutee information

## Project Structure

```
src/
  ├── index.ts          # Main application logic
  └── types/
      └── index.ts      # TypeScript interfaces and enums
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

✅ All Part 1 interfaces for the app (User, Session, Booking)  
✅ Generic interface ApiResponse<T>  
✅ Generic function getFirst<T>  
✅ Two utility types: Partial<User>, Pick<User>  
✅ Two enums: UserRole, BookingStatus  
✅ Zero TypeScript compilation errors  

## Example Output

When you run `npx ts-node src/index.ts`, you'll see:
- Tutor profile information with expertise and hourly rate
- Calculated tutoring session cost (₱500 for 60 minutes)
- Formatted session details (Mathematics - 60 minutes: Algebra fundamentals)
- Booking status (requested/confirmed)
- Updated tutor profile (Partial<User>)
- Tutee contact information (Pick<User>)
- Booking confirmation response with all details