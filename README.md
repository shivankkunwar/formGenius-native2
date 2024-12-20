

# Form Genius Mobile App  (React Native)

A React Native mobile application for creating and managing forms with multiple question types, image support, and response collection.

![formgenius1](https://github.com/user-attachments/assets/dda36ab5-c826-4034-88bd-383cf62719e7)
![formgenius2](https://github.com/user-attachments/assets/648dfcb3-c9b8-47e3-9c3a-c123cbca80c6)
## Features

- 🎨 Modern UI with React Native Paper
- 📝 Multiple question types support
- 🖼️ Image upload capability
- 🔐 Secure authentication
- 📊 Response management
- 🔄 Offline support
- 🎯 TypeScript integration

## Tech Stack

- React Native
- TypeScript
- React Navigation
- React Native Paper
- Axios
- AsyncStorage
- React Native Image Picker

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- React Native development environment setup
- Android Studio (for Android development)


## Installation

1. Clone the repository:
```bash
git clone https://github.com/shivankkunwar/formGenius-native2.git
cd form-builder-mobile
```

2. Install dependencies:


```shellscript
npm install
```



3. Update API configuration:
Navigate to `src/services/api.ts` and update the API URL:


```typescript
const API_URL = 'https://formgenius-backend.onrender.com/api';
```

4. Start the application:


```shellscript


# For Android
npm run android
```

## Project Structure

```plaintext
src/
├── components/
│   ├── FormBuilder/
│   │   ├── QuestionTypes/
│   │   │   ├── TextQuestion.tsx
│   │   │   ├── CheckboxQuestion.tsx
│   │   │   └── GridQuestion.tsx
│   │   └── FormHeader.tsx
│   └── common/
│       ├── LoadingSpinner.tsx
│       └── ErrorMessage.tsx
├── screens/
│   ├── AuthScreen.tsx
│   ├── HomeScreen.tsx
│   ├── FormEditorScreen.tsx
│   └── PreviewScreen.tsx
├── services/
│   ├── api.ts
│   └── auth.ts
├── types/
│   └── index.ts
└── utils/
    └── storage.ts
```

## Features in Detail

### Authentication

- User registration
- Login with email and password
- Secure token storage
- Auto login


### Form Management

- Create new forms
- Edit existing forms
- Delete forms
- Preview forms
- Share forms


### Question Types

1. Text Input

1. Short answer
2. Long answer
3. Required/Optional toggle



2. Checkbox

1. Multiple options
2. Custom option text
3. Add/Remove options
4. Required/Optional toggle



3. Grid

1. Custom rows and columns
2. Radio button selection
3. Required/Optional toggle





### Image Support

- Form header images
- Image upload integration
- Image preview
- Image compression


### Response Management

- Submit responses
- View responses
- Response statistics
- Export functionality (coming soon)


## Styling

The application uses React Native Paper for consistent styling and theming. Custom themes can be configured in `src/constants/theme.ts`.

## State Management

- Local state with React hooks
- AsyncStorage for persistence
- Context for global state (authentication)
