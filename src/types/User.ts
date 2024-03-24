// Define the type for user data
interface User {
    user: {
        username?: string;
        email: string;
        password: string;
    };
    token: string;
    // Add any other user properties here
}