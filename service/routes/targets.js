module.exports = function (app, workspaceApi) {

  // Make a research inside internal targets
  app.get('/targets/search', (req, res) => {
    const query = req.query.search || '';
    workspaceApi.targets.search(query).then((targets) => {
      res.send({targets: targets});
    })
    .catch(err => {
      res.send({targets: []});
    });
  });

}
