var connBD = function(){}
//var dbconfig = require('../config/database');
var sql = require("mssql");
// config for your database
var config = {
    user: 'sa',
    password: 'Ticiane2828Dieb',
    server: 'localhost', 
    database: 'CafeteriaGin' 
};

/*var config = {
    user: 'chocolateria',
    password: 'chocolate',
    server: '192.168.1.11', 
    database: 'CafeteriaGin' 
};
*/

connBD.connect = function(method_query){
  // connect to your database
  sql.connect(config, function (err) {
    if (err) console.log(err);
    connBD.request = new sql.Request();
    method_query(connBD);
  });
};

connBD.insert = function(sql,params){

  var queryConfig ={}
  queryConfig.text = sql;
  queryConfig.values = params != undefined ? params : null;

  var q = connBD.client.query(queryConfig);
  // Stream results back one row at a time
  return q;

}

connBD.select = function(sql,func){

  connBD.request.query(sql, function (err, recordset) {
    if (err) console.log(err)
      func(recordset);
  });

};

connBD.row = function(q){

  q.on('row', function (row, result) {
     result.addRow(row);
  });

}
connBD.results = function(q,r){

  q.on('end', function (result) {
    connBD.done();

    r.status(200);
    if (result.rowCount > 0) {
      r.json({
        success: true,
        message: 'Found offers!',
        data: result.rows
      });
    } else {
      r.json({
        status: true,
        message: 'Empty.',
        data: []
      });
    }
  });
  q.on('error', function(error) {
    r.status(400);
    r.json({
      success: false,
      message: 'Bad Request. Inform valid parameters and try again.'
    });
  });

};

module.exports = connBD;
/*
module.exports = function() {
    console.log("module.exports");
    return connBD;
}

exports.connBD = function() {
  console.log("exports.connbd");
  return connBD;
}
*/