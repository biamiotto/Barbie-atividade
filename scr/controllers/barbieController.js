import dados from "../models/dados.js";
const { barbies } = dados;

// Rota GET - Lista todas as Barbies
const getAllBarbies = (req, res) => {
    res.status(200).json({
        total: barbies.length,
        barbies: barbies
    });
}

// Rota GETBYID - Lista Barbie pelo ID
const getBarbieById = (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "ID deve ser um número válido!"
        });
    }

    const barbie = barbies.find(b => b.id === parseInt(id));

    if (!barbie) {
        return res.status(404).json({
            success: false,
            message: "Barbie não encontrada nos registros!"
        });
    }

    res.status(200).json({
        success: true,
        barbie: barbie
    });
};

// Rota POST - Cria nova Barbie
const createBarbie = (req, res) => {
    const { nome, profissao, anoLancamento } = req.body;

    // Validações obrigatórias básicas
    if (!nome || !profissao || !anoLancamento) {
        return res.status(400).json({
            success: false,
            message: "Nome, profissão e ano de lançamento são obrigatórios!"
        });
    }

    // Gerar novo ID simples
    const novoId = barbies.length + 1;

    // Criar novo bruxo
    const novaBarbie = {
        id: novoId,
        nome,
        profissao: profissao,
        anoLancamento: 2025
    };

    barbies.push(novaBarbie);

    res.status(201).json({
        success: true,
        message: "Barbie cadastrada com sucesso!",
        barbie: novaBarbie
    });
};

const deleteBarbie = (req, res) => {
    let id = parseInt(req.params.id);

    const barbieParaRemover = barbies.find(b => b.id === id);

    if (!barbieParaRemover) {
        return res.status(404).json({
            seccess: false,
            message: `A Barbie com o id ${id} não existe!`
        });
    }

    const barbiesFiltradas = barbies.filter(barbie => barbie.id !== id);

    barbies.splice(0, barbies.length, ...barbiesFiltradas);

    res.status(200).json({
        success: true,
        message: "A Barbie foi removida com sucesso!",
        barbieRemovida: barbieParaRemover
    });
};

export { getAllBarbies, getBarbieById, createBarbie, deleteBarbie };