const router = require("express").Router();
let Project = require("../models/project.model");

router.route("/").get((req, res) => {
  Project.find()
    .then(projects => res.json(projects))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  // const username = req.body.username;
  const projectname = req.body.projectname;
  // const date = Date.parse(req.body.date);

  const newProject = new Project({
    // username,
    projectname
  });

  newProject
    .save()
    .then(() => res.json("Project added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Project.findById(req.params.id)
    .then(projects => res.json(projects))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Project.findByIdAndDelete(req.params.id)
    .then(() => res.json("Project deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Project.findById(req.params.id)
    .then(projects => {
      // projects.username = req.body.username;
      projects.projectname = req.body.projectname;
      // projects.date = Date.parse(req.body.date);

      projects
        .save()
        .then(() => res.json("Exercise updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
