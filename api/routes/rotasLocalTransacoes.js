import { BD } from '../db.js'
import jwt from "jsonwebtoken";

const SECRET_KEY = "secret-key"; 

class rotasLocalTransacoes {
    static async novaTransacao(req,res){
            const { nome, tipo_local, saldo } = req.body

            try{
                const localTransacao = await BD.query(`
                     INSERT INTO local_transacao(nome, tipo_local, saldo)
                     VALUES($1, $2, $3)`, [nome, tipo_local, saldo])
                res.status(201).json('Nova transação cadastrada')
            }catch(error){
                console.error('Erro ao cadastrar nova transação', error)
                res.status(500).json({message: 'Erro ao cadastrar', error: error.message})
            }
        }

    static async listarTransacao(req, res){
        try {
            const localTransacao = await BD.query(`SELECT * FROM local_transacao where ativo = true`);
            return res.json(localTransacao.rows);
        }catch (error) {
            console.error("Erro ao listar local transação:", error);
        }
    }

    static async BuscarId(req, res) {
        const { id } = req.params;
        try {
            const localTransacao = await BD.query(`SELECT * FROM local_transacao WHERE id_local_transacao = $1`, [id]);
            // Verifica se a LocalTransacao foi encontrada
            if (localTransacao.rows.length === 0) {
                return res.status(404).json({ message: "LocalTransacao não encontrada" });
            }
            return res.status(200).json(localTransacao.rows[0]); // Retorna a LocalTransacao encontrada
            } catch (error) {
                return res.status(500).json({ error: "Erro ao listar LocalTransacao", message: error.message });
            }
            }
        static async AtualizarLocalTransacao(req, res) {
            const { id } = req.params;
        const {nome, tipo_local, saldo} = req.body;
        try {
            // Inicializar arrays(vetores) para armazenar os campos e valores a serem atualizados
            const campos = []
            const valores = []
            // Verifica quais campos foram fornecidos
            if(nome !== undefined){
                campos.push(`nome = $${valores.length + 1}`)
                valores.push(nome)
            }
            if(tipo_local!== undefined){
                campos.push(`tipo_local = $${valores.length + 1}`)
                valores.push(id_categoria)
            }
            if(saldo!== undefined){
                campos.push(`saldo = $${valores.length + 1}`)
                valores.push(gasto_fixo)
            }
            if (campos.length === 0){
                return res.status(400).json({erro: "Informe os campos a serem atualizados"})
            }
           
            // Montar a query
            const query = `UPDATE local_transacao SET ${campos.join(',')}
            WHERE id_local_transacao = ${id} returning *`
           
            // Executar a query
            const local_transacao = await BD.query(query, valores)
   
            // Verifica se a local_transacao foi atualizada
            if(local_transacao.rows.length === 0){
                return res.status(404).json({erro: "local_transacao não encontrada"})
            }
            return res.status(200).json(local_transacao.rows[0])
        } catch(error){
            return res.status(500).json({error: "Erro ao atualizar dados da local_transacao", error: error.message});
        }
    }
    static async atualizarTodosCampos(req, res) {
        const { id } = req.params;
        const { nome, tipo_local, saldo } = req.body;
        try {
            const localTransacao = await BD.query(`UPDATE local_transacao SET nome = $1, tipo_local = $2, saldo = $3 WHERE id_local_transacao = $4 RETURNING *`,
            [nome, tipo_local, saldo, id]);
            return res.status(200).json(localTransacao.rows[0]);
        }
        catch (error) {
            return res.status(500).json({ error: "Erro ao atualizar LocalTransacao", message: error.message });
        }
    }
    static async deletar(req, res) {
        const { id } = req.params;
        try {
            const localTransacao = await BD.query(`update local_transacao set ativo = false WHERE id_local_transacao = $1 RETURNING *`, [id]);
            // Verifica se a LocalTransacao foi encontrada
            if (localTransacao.rows.length === 0) {
                return res.status(404).json({ message: "LocalTransacao não encontrada" });
            }
            return res.status(200).json(localTransacao.rows[0]); // Retorna a LocalTransacao deletada
            } catch (error) {
                return res.status(500).json({ error: "Erro ao deletar LocalTransacao", message: error.message });
            }
            }
}

export default rotasLocalTransacoes