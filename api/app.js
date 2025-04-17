import express from 'express'
import { testarConexao } from './db.js'
import cors from 'cors'
import rotasUsuarios from './routes/rotasUsuarios.js'
import rotasCategorias from './routes/rotasCategorias.js'
import rotasSubcategorias from './routes/rotasSubCategorias.js'
import rotasLocalTransacoes from './routes/rotasLocalTransacoes.js'

const app = express()
testarConexao()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('API Funcionando')
})

//rotas usuarios
app.post('/usuarios', rotasUsuarios.novoUsuario)
app.post('/login', rotasUsuarios.login)
app.get('/usuarios', rotasUsuarios.listarUsuario)
app.get('/usuarios/:id', rotasUsuarios.ListarUsuarioPorId)
app.patch('/usuarios/:id', rotasUsuarios.atualizar)
app.put('/usuarios/:id', rotasUsuarios.atualizarTodosUsuario)
app.delete('/usuarios/:id', rotasUsuarios.deletarUsuario)

//rotas categorias
app.post('/categorias', rotasCategorias.nova)
app.get('/categorias', rotasCategorias.listarTodas)
app.delete('/categorias/:id', rotasCategorias.deletar)
app.put('/categorias/:id', rotasCategorias.atualizarTodosCampos)
app.patch('/categorias/:id', rotasCategorias.atualizar)
app.get('/categorias/:id', rotasCategorias.listarporId)

//rotas subCategorias
app.post('/subcategorias', rotasSubcategorias.novaSubCategoria)
app.delete('/subcategorias/:id', rotasSubcategorias.deletarSubcategoria)
app.get('/subcategorias', rotasSubcategorias.listarSubcategorias)
app.get('/subcategorias/:id', rotasSubcategorias.ListarporID)
app.put('/subcategorias/:id', rotasSubcategorias.atualizartodosCampos)
app.patch('/subcategorias/:id', rotasSubcategorias.Atualizar)

//rotas local transação
app.post('/localTransacao', rotasLocalTransacoes.novaTransacao)
app.get('/localTransacao', rotasLocalTransacoes.listarTransacao)
app.get('/localtransacao/:id', rotasLocalTransacoes.BuscarId)
app.patch('/localtransacao/:id', rotasLocalTransacoes.AtualizarLocalTransacao)
app.put('/localtransacao/:id', rotasLocalTransacoes.atualizarTodosCampos)
app.delete('/localtransacao/:id', rotasLocalTransacoes.deletar)



const porta = 3000
app.listen(porta, () => {
    console.log(`Api http://localhost:${porta}`);
})