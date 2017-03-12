var config = require('../config/config');
const elasticsearch = require('elasticsearch');
const esClient = new elasticsearch.Client({
  host: config.elasticsearchHost,
  log: 'error'
});

esClient.ping({
  // ping usually has a 3000ms timeout
  requestTimeout: 1000
}, function (error) {
  if (error) {
    console.trace('elasticsearch cluster is down!');
  } else {
    console.log('Elasticsearch is up and running');
  }
});

esClient.cluster.health({},function(err,resp,status) {
  console.log("-- Client Health --",resp);
});

module.exports = esClient;
