🎋 Intro:

This project is a Firestore-based toy management application where users can add, edit, delete, and filter toys. Additionally, users can mark toys as their favorites and toggle between dark and light themes for a personalized experience.

📦 Tech Stack:

* Frontend: React, Tailwind CSS

* Backend: Firebase Firestore, Firebase Authentication

* State Management: React Context API

* Routing: React Router

👩🏽‍🍳 Features:

* Authentication: Users can sign up, log in, and log out securely using Firebase Authentication.

* CRUD Operations:

* Add new toys to the database.

 * Edit existing toys.

* Delete toys (only if the user is the owner).

Filtering:

* Search for toys by name with real-time filtering.

Favorites:

* Mark toys as favorites and toggle the favorites view.

Dark Mode:

* Switch between light and dark themes.

Responsive Design:

* Optimized for both desktop and mobile devices.

* User Greeting: Personalized greeting based on the user’s email.

💭 Process:

This project began with setting up Firebase for authentication and Firestore for data storage. Initially, the focus was on implementing CRUD operations for toys. Adding user-specific features like favorites and a filter was a rewarding challenge. Managing state with Context API for features like dark mode and favorites was seamless, while ensuring Firestore queries were optimized required extra effort. The experience solidified the understanding of Firebase and React ecosystem integrations.

📚 Learnings:

* Learned how to use Firebase Firestore to store and query data efficiently.

* Gained hands-on experience with React Context API for global state management.

* Understood the importance of efficient querying in Firestore for better performance.

* Enhanced skills in building user-friendly, responsive UI with Tailwind CSS.

* Developed a better grasp of conditional rendering in React.

✨ Improvement:

* Validation: Add more robust validation for user inputs.

* Error Handling: Improve error feedback for a better user experience.

* Testing: Add unit and integration tests for components and Firebase operations.

* Pagination: Implement pagination to improve the performance of toy listing with large datasets.

* Animations: Add smooth animations for transitions and modal interactions.
