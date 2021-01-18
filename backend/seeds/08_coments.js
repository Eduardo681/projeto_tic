
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('coments').del()
    .then(function () {
      // Inserts seed entries
      return knex('coments').insert([
        {
          id: 1, 
          id_provider: '4',
          id_client: 2,
          coment: 'Bom prestador!',
          date: new Date()
        },
        {
          id: 2, 
          id_provider: '4',
          id_client: 3,
          coment: 'Prestador qualificado!',
          date: new Date()
        },
        {
          id: 3, 
          id_provider: '4',
          id_client: 2,
          coment: 'De confiança!',
          date: new Date()
        },
        {
          id: 4, 
          id_provider: '4',
          id_client: 3,
          coment: 'TOP!',
          date: new Date()
        }
      ]);
    });
};
