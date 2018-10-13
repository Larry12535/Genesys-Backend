module.exports = function (app, storage, statisticsApi) {

  app.get('/statistics/getValue', (req, res) => {

    statisticsApi.getStatValue(req.query.statName, req.query.objectId, req.query.objectType).then( (data) => {
      res.send({statistics: data});
    })
    .catch( (e) => {
      res.send(e.response.text);
    })
  });

}