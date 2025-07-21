const data = require('./src/database.json');
console.log('Total de registros: ', data.length);

data.forEach(agent => {
  const name = agent.name.replace(/'/g, "''");
  const role = agent.role.replace(/'/g, "''");
  const skills = agent.skills.replace(/'/g, "''");
  const dica = agent.dica.replace(/'/g, "''");
  const biography = agent.biography.replace(/'/g, "''");
  const imageKey = agent.imageKey.replace(/'/g, "''");
  const abilities = JSON.stringify(agent.abilities).replace(/'/g, "''");
  const strategies = JSON.stringify(agent.strategies).replace(/'/g, "''");
  const tutorials = JSON.stringify(agent.tutorials).replace(/'/g, "''");

  console.log(`INSERT INTO agents (name, role, skills, dica, biography, imageKey, abilities, strategies, tutorials) VALUES ('${name}', '${role}', '${skills}', '${dica}', '${biography}', '${imageKey}', '${abilities}', '${strategies}', '${tutorials}');`);
});