
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('adm').del()
    .then(function () {
      // Inserts seed entries
      return knex('adm').insert([
        {
          id: 1, 
          value_boost: 0,
          value_charge: 0,
          revenues: 0,
          bank_agency: '6855',
          bank_account: '59212-4',
          n_bank: '',
          name_bank: 'Itaú'
        },
      ]);
    });
};
