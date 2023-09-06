const dbClient = require('../utils/db');
const sha1Hash = require('../utils/sha1');

async function postNew(req, res) {
  const { email, password } = req.body;

  if (!email) return res.status(400).send({error: 'Missing email'});
  if (!password) return res.status(400).send({error: 'Missing password'});

  const emailExists = await dbClient.findOne('users', { email });

  if (emailExists) return res.status(400).send({error: 'Already exist'});

  const hashedPasswd = sha1Hash(password);

  const user = await dbClient.addNew('users', { email, password: hashedPasswd });

  return res.status(201).send(
    {
      id: users.ops[0].id,
      email: users.ops[0].email,
    });
}

export default { postNew };
