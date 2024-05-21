const { Connection } = require('tedious');
var Request = require('tedious').Request; 
// tedious windows authentication is not working at all
const config = {
  server: 'DESKTOP-M8LBSK5\\SQLEXPRESS01',
  authentication: {
    type: 'ntlm',
    options: {
      userName: 'simra',
      password: '',
      domain: 'DESKTOP-M8LBSK5'
    }
  },
  options: {
    database: 'master',
    trustedConnection: true,
    encrypt: true,
    trustServerCertificate: true
  }
};

function connectToDatabase() {
  return new Promise((resolve, reject) => {
    const connection = new Connection(config);

    connection.on('connect', (err) => {
        console.log('Current connection state:', connection.state.name);
      if (err) {
        reject('Connection Error: ' + err.message);
      } else {
        resolve('Connected to the database');
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
  });
}

async function checkConnection() {
  try {
    const status = await connectToDatabase();
    console.log(status);
  } catch (error) {
    console.error(error);
  }
}

checkConnection();
