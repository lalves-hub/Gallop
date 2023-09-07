const express = require("express");

const userController = require("./controllers/userController");

//app.route is effective to handle multiple request type with same endpoint
const routes = (app) => {
  app.route("/addUser").post(userController.addNewUser);
  app.route("/fetchAllData/:email/:password").get(userController.fetchAllData);
  app.route("/addJob").post(userController.addJob);
  app.route("/getJob/:id").get(userController.fetchJobs);
  app.route("/deleteJob/:id").delete(userController.deleteJob);
};

module.exports = routes;
