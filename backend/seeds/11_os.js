
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('os').del()
    .then(function () {
      // Inserts seed entries
      return knex('os').insert([
        {
          id: 1, 
          id_diary: 1,
          status_os: 'awaiting_payment',
          maintenance_description: 'Pintura do quarto',
          open_date: new Date(),
          value_manpower: 150,
          value_total: 350
        },
        {
          id: 2, 
          id_diary: 2,
          status_os: 'pendent',
          maintenance_description: 'Limpeaza do quarto sujo de tinta',
          open_date: new Date(),
          value_manpower: 150,
          value_total: 150
        },
      ]);
    });
};
