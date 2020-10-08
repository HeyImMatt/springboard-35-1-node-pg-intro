const express = require("express");
const router = new express.Router();
const db = require("../db");
const ExpressError = require("../expressError");

router.get("/", async (req, res, next) => {
  try {
    const companiesQuery = await db.query(`SELECT code, name FROM companies`);
    return res.json({ companies: companiesQuery.rows });
  } catch(e) {
    return next(e);
  }
})

module.exports = router;