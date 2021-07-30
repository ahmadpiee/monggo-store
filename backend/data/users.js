import bcrypt from "bcryptjs";

// make dummy data here, then import with npm run data:import

const users = [
    {
        name: "Your Name",
        email: "exampleuser@example.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: false,
    },
];

export default users;
