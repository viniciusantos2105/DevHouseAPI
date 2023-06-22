/* eslint-disable class-methods-use-this */
/* methods: index, show, update, store, destroy
index: listagem de sessoes
store: criar uma sessao
show: quando queremos listar uma unica sessao
update: quando queremos alterar alguma sessao
destroy: quando queremos deletar uma sessao
*/

import * as Yup from 'yup';
import User from '../models/User';

class SessionController {
  async store(req, res) {
    const { email } = req.body;

    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    // Verficiando se esse usuario já existe
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email });
    }

    return res.json(user);
  }
}

export default new SessionController();
