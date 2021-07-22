import bcrypt from "bcryptjs";

const users = [
    {
        name: "Admin 1",
        email: "admin1@gmail.com",
        password: bcrypt.hashSync("herosman218", 10),
        isAdmin: true,
    },
    {
        name: "Admin 2",
        email: "admin2@gmail.com",
        password: bcrypt.hashSync("herosman218", 10),
        isAdmin: true,
    },
    {
        name: "Bukan Manusia",
        email: "bukanmanusia@gmail.com",
        password: bcrypt.hashSync("123456", 10),
    },
];

export default users;
