import pkg from 'pg'
import dotenv from 'dotenv'

const { Pool } = pkg;
dotenv.config()

// const BD = new Pool({
//     connectionString: process.env.DATABASE_URL
// })

// const BD = new Pool ({
//     connectionString: "postgres://postgres.ucccghyvlwmpebinvjfc:XRcbWXyeiu5RWCea@aws-0-us-east-1.pooler.supabase.com:5432/postgres",
//     ssl:{
//         rejectUnauthorized: false
//     }
// })
 const BD = new Pool ({
     user: 'postgres',
     host: 'localhost',
     database: 'bd_gfp',
     password: 'admin',
     port: 5432    
 })

const testarConexao = async () => {
    try{
        const client = await BD.connect();
        console.log("Conexão com o banco de dados estabelecida")
        client.release(); // libera o cliente
    }catch(error){
        console.error("Error ao conectar ao banco de dados", error.message)
    }
}

export {BD, testarConexao};