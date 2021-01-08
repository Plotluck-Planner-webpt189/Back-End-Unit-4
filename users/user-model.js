const express = require("express");
const db = require("../data/dbConfig");

async function add(userData) {
  try {
    const id = await db('users').insert(userData);
    const newUser = await findById(id[0]);
    return newUser;
  } catch (err) {
      throw err;
  }
};

async function findById(id) {
  try {
    const user = await db('users').where({ id }).first();
  } catch (err) {
    throw err;
  }
};

async function find() {
  try {
    return await db('users');
  } catch (err) {
      throw error;
  }
};

async function findPotlucks(id) {
  try {
    const potlucks = await 
      db('potlucks as p')
        .join('users as u', 'u.id', 'p.user_id')
        .where({ user_id: id })
        .select('p.id', 'u.username', 'p.contents');

      return potlucks;
  } catch (err) {
     throw err;
  }
}



module.exports = {
  add,
  find,
  findById, 
  findPotlucks,

};