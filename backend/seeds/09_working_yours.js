
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('working_yours').del()
    .then(function () {
      // Inserts seed entries
      return knex('working_yours').insert([
        { 
          id: 1, 
          id_provider: '4',
          day_of_week: 'Segunda',
          start_time: '7:00',
          final_hour: '17:00'
        },
        { 
          id: 2, 
          id_provider: '4',
          day_of_week: 'Terça',
          start_time: '7:00',
          final_hour: '17:00'
        },
        { 
          id: 3, 
          id_provider: '4',
          day_of_week: 'Quarta',
          start_time: '7:00',
          final_hour: '17:00'
        },
        { 
          id: 5, 
          id_provider: '4',
          day_of_week: 'Quinta',
          start_time: '7:00',
          final_hour: '17:00'
        },
        { 
          id: 6, 
          id_provider: '4',
          day_of_week: 'Sexta',
          start_time: '7:00',
          final_hour: '17:00'
        },
        { 
          id: 7, 
          id_provider: '5',
          day_of_week: 'Terça',
          start_time: '13:00',
          final_hour: '17:00'
        },
      ]);
    });
};
