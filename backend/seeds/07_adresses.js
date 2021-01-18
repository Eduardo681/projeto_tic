
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('adresses').del()
    .then(function () {
      // Inserts seed entries
      return knex('adresses').insert([
        {
          id: 1,
          id_client: 2,
          street: 'Rua Paulo Fernandez de Carvalho',
          n_house: '960',
          neighborhood: 'Chacaras São Paulo',
          zip_code: '14406608',
          city: 'Franca',
          uf: 'SP',
          complement: ''
        },
        {
          id: 2,
          id_client: 2,
          street: 'Rua São Sebastião',
          n_house: '904',
          neighborhood: 'Vila Nossa Senhora de Fátima',
          zip_code: '14405359',
          city: 'Franca',
          uf: 'SP',
          complement: ''
        },
      ]);
    });
};
