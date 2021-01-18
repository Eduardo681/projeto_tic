
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('products_os').del()
    .then(function () {
      // Inserts seed entries
      return knex('products_os').insert([
        {
          id_os: 1,
          id_product: 1,
          amount: 2,
          value_unitary: 80,
          value_totaly: 160
        },
        {
          id_os: 1,
          id_product: 2,
          amount: 4,
          value_unitary: 10,
          value_totaly: 40
        },
    
      ]);
    });
};
