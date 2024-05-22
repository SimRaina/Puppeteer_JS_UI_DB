const Connection = require('tedious').Connection;
var Request = require('tedious').Request; 
// tedious sql works with latest node versions. tested with version >= 18 
const config = {
  server: 'DESKTOP-M8LBSK5\\SQLEXPRESS',
  authentication: {
    type: 'default', // for sql authenticated db account
    options: {
      userName: 'sa',
      password: '1234'
    }
  },
  options: {
    database: 'master',
    trustedConnection: true, // to avoid self-signed error
    encrypt: true,
    trustServerCertificate: true
  }
};

function connectToDatabase() {
  
    const connection = new Connection(config);

    connection.on('connect', (err) => {
        console.log('Current connection state:', connection.state.name); // to debug
      if (err) {
        console.error('Connection Error: ' + err.message);
      } else {
        console.log('Connected to the database');
       // creating query and executing
        var request = new Request("select * from dbo.MSreplication_options where optname=\'merge\';", function(err) {  
          if (err) {  
              console.log(err);}  
          });  
          var result = "";  
          request.on('row', function(columns) {  
              columns.forEach(function(column) {  
                if (column.value === null) {  
                  console.log('NULL');  
                } else {  
                  result+= column.value + " ";  
                }  
              });  
              console.log(result);  
              result ="";  
          });  
      
          request.on('done', function(rowCount, more) {  
          console.log(rowCount + ' rows returned');  
          });  
          
          // Close the connection after the final event emitted by the request, after the callback passes
          request.on("requestCompleted", function (rowCount, more) {
              connection.close();
          });
          connection.execSql(request);  
      }
    });

    connection.on('end', () => {
      console.log('Connection closed');
    });

    connection.on('error', (err) => {
      console.error('Connection Error1: ', err.message);
      reject(err);
    });

    connection.connect();
  
}

connectToDatabase();
