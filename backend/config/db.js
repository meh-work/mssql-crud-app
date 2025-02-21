import sql from "mssql";

const config = {
  user: "careerapplicant",
  password: "9oz1oLCVDzY6EQW",
  server: "20.193.224.126",
  database: "CareerNewApplicant",
  options: {
    encrypt: true, // True for Azure
    trustServerCertificate: true,
  },
};

// Creating a connection pool (global instance)
const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log("✅ MSSQL Connected!");
    return pool;
  })
  .catch((err) => {
    console.error("❌ Database Connection Failed! ", err);
    process.exit(1);
  });

export { sql, poolPromise };
