
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('services').del()
    .then(function () {
      // Inserts seed entries
      return knex('services').insert([
        {
          id: 1, 
          title_service: 'Pintor',
          description: 'Pintor residencial e de moveis'
        },
        {
          id: 2, 
          title_service: 'Pedreiro',
          description: 'Manutenção em residencias'
        },
        {
          id: 3, 
          title_service: 'Faxineira',
          description: 'Faxinas gerais'
        },
        {
          id: 4, 
          title_service: 'Eletricista',
          description: 'Manutenção e novas instalações de fiação'
        },
      ]);
    });
};
