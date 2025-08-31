const verifyPhone = require("../helpers/verifyPhone");

test("retornar o formato correto de celular", () => {
    const phoneNumber = "71987130997"

    expect(verifyPhone(phoneNumber)).toBe(true);
})