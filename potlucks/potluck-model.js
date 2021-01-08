const db = require('../data/dbConfig');

const express = require("express");
const db = require("../data/dbConfig");

async function add(potluck) {
  try {
    const ids = await db('potlucks').insert(potluck);
    const newPotluck = await findById(ids[0]);
    return newPotluck;
  } catch (err) {
      throw err;
  }
};

async function findById(id) {
  try {
    const potluck = await db('potlucks').where({ id }).first();
  } catch (err) {
    throw err;
  }
};

async function find() {
  try {
    return await db('potlucks');
  } catch (err) {
      throw error;
  }
};


module.exports = {
  add,
  find,
  findById, 

};