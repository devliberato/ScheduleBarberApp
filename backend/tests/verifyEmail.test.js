const verifyEmail = require("../helpers/verifyEmail");

test("email valido", () => {
const email = "matheus@testando.com"

    expect(verifyEmail(email)).toBe(true)
})