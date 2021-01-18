
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('providers').del()
    .then(function () {
      // Inserts seed entries
      return knex('providers').insert([
        {
          id: 4, 
          validate: true,
          bank_agency: '0343',
          bank_account: '43967467-4',
          n_bank: '',
          name_bank: 'Santander',
          boost: false,
          name_mom: 'Isabelle Clarice Nair'
        },
        {
          id: 5, 
          validate: true,
          bank_agency: '1851',
          bank_account: '0132662-7',
          n_bank: '',
          name_bank: 'Bradesco',
          boost: false,
          name_mom: 'Silvana Rosângela Agatha'
        },
        {
          id: 6, 
          validate: true,
          bank_agency: '1830',
          bank_account: '287606-X',
          n_bank: '',
          name_bank: 'Banco do Brasil',
          boost: false,
          name_mom: 'Silvana Rosângela Agatha'
        },
        {
          id: 7, 
          validate: true,
          bank_agency: '3443',
          bank_account: '293179-6',
          n_bank: '',
          name_bank: 'Banco do Brasil',
          boost: false,
          name_mom: 'Paula Rosângela Agatha'
        },
      ]);
    });
};
