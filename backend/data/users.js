import bcrypt from "bcryptjs";

const users = [
    {
        name: "admin",
        email: "admin@gmail.com",
        password: bcrypt.hashSync("herosman218", 10),
        isAdmin: true,
    },
    {
        name: "Bukan Manusia",
        email: "bukanmanusia@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: false,
    },
];

export default users;
