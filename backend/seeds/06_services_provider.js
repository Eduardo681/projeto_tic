
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('services_provider').del()
    .then(function () {
      // Inserts seed entries
      return knex('services_provider').insert([
        {
          id_service: 1, 
          id_provider: 4,
          rate: 4
        },
        {
          id_service: 3, 
          id_provider: 5,
          rate: 5
        },
        {
          id_service: 2, 
          id_provider: 6,
          rate: 3
        },
        {
          id_service: 4, 
          id_provider: 7,
          rate: 4
        }
      ]);
    });
};
