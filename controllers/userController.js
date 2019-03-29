const User = require ('../models/userModel');

const create = async (req, res) => {
    try {
        const { cpf, nome, telefone, cep, numero, complemento } = req.body;
        const func = new User ({
            cpf,
            nome,
            telefone,
            cep,
            numero,
            complemento
        })
        await func.save();
        return res.status(201).json({ message: 'Funcionário criado!', func });
       
    } catch(error) {
        return res.status(500).json({ message: 'Deu erro!', error });
    }
}; 

const findAll = async (req, res) => {
    try {
        const funcs = await User.find({});
        return res.status(200).json({ message: 'funcionários encontrados!', funcs })
    } catch (error) {
        return res.status(500).json({ message: 'Deu erro!', error });
    }
};

const findOne = async (req, res) => {
    try {
        const { cpf } = req.params;
        const func = await User.findOne ({ cpf }); //quando vc tem um obj, que o nome da variável que tem o valor, é o mesmo nome da propriedade só precisa utilizar 1
        if (!func) {
            return res.status(404).json({ message: 'Funcionário não encontrado!' });
        }
        return res.status(200).json({ message: 'Funcionário encontrado!', func });
    } catch (error) {
        return res.status(500).json({ message: 'Deu erro!', error })
    }
};

const update = async (req, res) => {
    try{
        const {cpf: newcpf, nome, telefone, cep, numero, complemento} = req.body;
        const { cpf } = req.params;
        const updateFunc = await User.findOneAndUpdate(
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
        if(!updateFunc) {
            return res.status(404).json({ message: 'Funcionário não encontrado!' });
        }
        return res.status(200).json({ message: 'Funcionário atualizado!', updateFunc });
    } catch (error) {
        return res.status(500).json({ message: 'Deu erro!', error })
    }
};

const remove = async (req, res) => {
    try{
        const { cpf } = req.params;
        const func = await User.findOneAndRemove({ cpf });//quando vc tem um obj, que o nome da variável que tem o valor, é o mesmo nome da propriedade só precisa utilizar 1
        if (!func){
            return res.status(404).json({ message: 'Funcionário não encontrado!' });
        }
        return res.status(200).json({ message: 'Funcionário removido!', func });
    }catch (error) {
        return res.status(500).json({ message: 'Deu erro!', error });
    }
};

const removeByCep = async (req, res) => {
    try{
        const { cep } = req.params;
        const func = await User.findOneAndRemove({ cep });//quando vc tem um obj, que o nome da variável que tem o valor, é o mesmo nome da propriedade só precisa utilizar 1
        if (!func){
            return res.status(404).json({ message: 'Funcionário não encontrado!' });
        }
        return res.status(200).json({ message: 'Funcionário removido!', func });
    }catch (error) {
        return res.status(500).json({ message: 'Deu erro!', error });
    }
};


module.exports = {
    create,
    findAll,
    findOne,
    update,
    remove,
    removeByCep
}
