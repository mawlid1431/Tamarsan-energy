# Admin Panel Guide

## Accessing the Admin Panel

Navigate to: `http://localhost:5173/admin` (or your domain + `/admin`)

## Features

### 1. Services Management
- Add, edit, and delete services
- Fields: Icon name, Title, Description
- Icon names use Lucide React icons (e.g., Lightbulb, Sun, Wrench)

### 2. Projects Management
- Add, edit, and delete projects
- Fields include:
  - Title, Location, Description
  - Image URL
  - Impact, Date, Capacity, Beneficiaries, Investment
  - Details, Challenges, Solution
  - Results (one per line)

### 3. Testimonials Management
- Add, edit, and delete testimonials
- Fields: Rating (1-5 stars), Text, Author, Location

## Data Storage

Currently uses **localStorage** for data persistence. Data is stored in your browser.

### Storage Keys:
- `tamarsan_services`
- `tamarsan_projects`
- `tamarsan_testimonials`

## Theme Support

The admin panel automatically follows your site's dark/light mode theme.

## Future Enhancements

To upgrade to a backend database:
1. Replace `src/data/store.ts` functions with API calls
2. Set up a backend (Node.js, Python, etc.)
3. Add authentication for security

## Notes

- Data is stored locally in the browser
- Clear browser data will reset the admin content
- For production, implement proper authentication
- Consider adding image upload functionality
