const User = require ('../models/userModel');

const create = async (req, res) => {
    try {
        const { cpf, nome, email, telefone, cep, numero, complemento } = req.body;
        const user = new User ({
            cpf,
            nome,
            telefone,
            cep,
            numero,
            complemento
        })
        await user.save();
        return res.status(201).json({ message: 'Usuário criado!', user });
       
    } catch(error) {
        return res.status(500).json({ message: 'Erro', error });
    }
}; 

const findAll = async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json({ message: 'Usuários encontrados!', users })
    } catch (error) {
        return res.status(500).json({ message: 'Erro', error });
    }
};

const findOne = async (req, res) => {
    try {
        const { cpf } = req.params;
        const user = await User.findOne ({ cpf: cpf })
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        return res.status(200).json({ message: 'Usuário encontrado', user });
    } catch (error) {
        return res.status(500).json({ message: 'Deu erro!', error })
    }
};

const update = async (req, res) => {
    try{
        const {cpf: newcpf, nome, telefone, cep, numero, complemento} = req.body;
        const { cpf } = req.params;
        const updateUser = await User.findOneAndUpdate(
            {
                cpf: cpf
            },
            {
                cpf: newcpf,
                nome,
                telefone,
                cep,
                numero,
                complemento
            }
        )
        if(!updateUser) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        return res.status(200).json({ message: 'Usuario atualizado', updateUser });
    } catch (error) {
        return res.status(500).json({ message: 'Deu erro!', error })
    }
};

const remove = async (req, res) => {
    try{
        const { cpf } = req.params;
        const user = await User.findOneAndRemove({ cpf:cpf });
        if (!user){
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        return res.status(200).json({ message: 'Usuário removido', user });
    }catch (error) {
        return res.status(500).json({ message: 'Deu erro!', error });
    }
};

module.exports = {
    create,
    findAll,
    findOne,
    update,
    remove
}
