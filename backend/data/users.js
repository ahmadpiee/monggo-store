import bcrypt from "bcryptjs";

const users = [
    {
        name: "Bukan Manusia",
        email: "bukanmanusia@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: false,
    },
];

export default users;
