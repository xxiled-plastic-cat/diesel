const jwt = require("jsonwebtoken");
const express = require ("express");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/", async (req, res) => {
    const users = [{ email: "kieran.nelson@icloud.com", password: "$2b$15$kZIXF.AcRR4aJGlx6nEuRuShxsulaGXO0i83F2SJ92TwhNSc1xjrK", roles: ["admin", "editor", "viewer"]}]

    let user = users.find(u => u.email === req.body.email);
    if(!user) throw new Error("Invalid email or password.");

    const valid = await bcrypt.compare(req.body.password, user.password);
    if(!valid) throw new Error(`Error comparing passwords, req.body: ${req.body.password}, vs user.password: ${user.password}`);

    const token = jwt.sign({
        if: user._id,
        roles: user.roles,
    },"jwtPrivateKey", { expiresIn: "15m"});
    res.send({
        ok: true,
        token: token
    });
});

module.exports = router;
