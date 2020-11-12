import { db } from '../models/index.js';
import { logger } from '../config/logger.js';

const Grade = db.grade;

const create = async (req, res) => {
  let grade = req.body;
  try {
    grade.lastModified = new Date();
    await Grade.create(grade);
    res.send({ message: 'Grade inserido com sucesso' });
    logger.info(`POST /grade - ${JSON.stringify()}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  const name = req.query.name;
  //condicao para o filtro no findAll
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {};

  try {
    const list = await Grade.find(condition);
    if (!list) {
      throw new Error('Nenhuma grade encontrada');      
    }
    res.send(list);
    logger.info(`GET /grade`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const grade = await Grade.findById(id);
    if (!grade)
      throw new Error('Grade nao encontrado');
    res.send(grade);
    logger.info(`GET /grade - ${id}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }

  const id = req.params.id;

  try {
    let grade = await Grade.findById(id);
    if (!grade) {
      res.status(500).send({ message: 'Grade nao encontrada'})
    }
    grade = req.body;
    await Grade.findByIdAndUpdate(id,grade);
    res.send({message: "Atualizacao realizada com sucesso"});
    logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;
  try {
    await Grade.findByIdAndDelete(id);
    res.send({message: 'Exclusao efetivada com sucesso'});
    logger.info(`DELETE /grade - ${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  try {
    await Grade.remove({});
    res.send({message: "Todas as grades foram excluidas com sucesso"});
    logger.info(`DELETE /grade`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Grades' });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};


const teste = async (req, res) => {
  try {
    res.send({message: 'Teste realizado com sucesso'});
    logger.info(`GET /grade/teste`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao executar teste' });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll, teste };
