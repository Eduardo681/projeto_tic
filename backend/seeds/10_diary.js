
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('diary').del()
    .then(function () {
      // Inserts seed entries
      return knex('diary').insert([
        {
          id: 1, 
          id_working_your: 1,
          id_adresse: 1,
          date: '02/12/2020',
          hour: '10:00',
          contact: 'Eduardo',
          description: 'Pintura de quarto',
          user_notified: false
        },
        {
          id: 2, 
          id_working_your: 7,
          id_adresse: 1,
          date: '03/12/2020',
          hour: '16:00',
          contact: 'Eduardo',
          description: 'Limpeza de quarto',
          user_notified: false
        }
      ]);
    });
};
