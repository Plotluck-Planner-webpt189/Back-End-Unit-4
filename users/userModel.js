const express = require("express");
const db = require("../data/dbConfig");

function add(user) {
// sending id back to other database
  return db("users").insert(user, 'id');
};

function findBy(filter) {
  return db("users").where(filter);
};

function find() {
  return db('users').select('id', 'username');
};

function findAllExpectId(id) {
  return db('users').whereNot({id}).select('id', 'username', 'firstName', 'lastName');
}



module.exports = {
  add,
  findBy,
  find, 
  findAllExpectId
};