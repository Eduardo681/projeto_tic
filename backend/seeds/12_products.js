
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        {
          id: 1, 
          description: 'Tinta Azul 12L',
          status: 1
        },
        {
          id: 2, 
          description: 'Lixa',
          status: 1
        },
      ]);
    });
};
