//create a function to create a users table in the postgres db

import { Client } from "pg";

const client = new Client({
    connectionString: "postgresql://postgres:mysecretpassword@localhost/postgres"
})

console.log("string added");

// async function createUsersTable (){
//     console.log("entered the function");
//     try{
//         await client.connect();
//         console.log("connected the db");
//         const result = await client.query("CREATE TABLE userss(username VARCHAR(50) UNIQUE NOT NULL, email VARCHAR(255) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL)");
//         console.log(result);
//     }catch(err){
//         console.log("Table could not be created: ", err); 
//     }finally{
//         client.end(); 
//     }
// }

// createUsersTable();

// async function insertIntoTable(username: string, email: string, password: string){
//     try{
//         await client.connect(); 
//         const insertQuery = "INSERT INTO userss (username , email, password) VALUES ($1, $2, $3)" ; 
//         const values = [username, email, password]; 
//         const res = await client.query(insertQuery, values); 
//         console.log("Insertion success" , res); 
//     } catch(err){
//         console.error("Error during insertion of data", err); 
//     } finally { 
//         await client.end(); 
//     }
// }

// insertIntoTable("bhanu", "bhanups@gmail.com", "secret").catch(console.error);

async function getUser(email: string){
    try{
        await client.connect(); 
        const query = "SELECT * FROM users WHERE email = $1" ; 
        const values = [email]; 
        const res = await client.query(query, values); 
        
        if(res.rows.length>0){
            console.log("User found", res.rows[0]);
            return res.rows[0]; 
        }
        else{
            console.log("No user found with the given username"); 
            return null;
        }
    } catch(err){
        console.error("Error during getting the user's data", err); 
    } finally { 
        await client.end(); 
    }
}

getUser("bhanups@gmail.com");