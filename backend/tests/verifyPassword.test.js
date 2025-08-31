const verifyPassword = require("../helpers/verifyPassword");

test("senha tem que ser caracteres, numero, maisucula e minuscula", () => {
    const password = "matheuS2!";
    expect(verifyPassword(password)).toBe(true);
});