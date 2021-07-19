import bcrypt from "bcryptjs";

const users = [
    {
        name: "Admin User",
        email: "monggo.idn@gmail.com",
        password: bcrypt.hashSync("herosman218", 10),
        isAdmin: true,
    },
    {
        name: "Manusia",
        email: "manusia@gmail.com",
        password: bcrypt.hashSync("123456", 10),
    },
    {
        name: "Bukan Manusia",
        email: "bukanmanusia@gmail.com",
        password: bcrypt.hashSync("123456", 10),
    },
];

export default users;
