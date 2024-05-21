var sql= require('mssql/msnodesqlv8');
// catch: this code will work with node version <=16.20.2
var config = {
        connectionString: 'Driver=SQL Server; Server=DESKTOP-M8LBSK5\\SQLEXPRESS01; Database=master; Trusted_Connection=true;'
};

sql.connect(config, err => {
  new sql.Request().query('select * from dbo.MSreplication_options where optname=\'merge\';', (err, result) => {
    console.log("Connected"); // connection OK
    if(err){
      console.log("SQL error but connection OK");
    }else{
      console.log(result);
    };
  });
});

sql.on('error', err => {
  console.log("Connection Failed");
});