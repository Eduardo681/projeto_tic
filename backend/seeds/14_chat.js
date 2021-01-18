
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('chat').del()
    .then(function () {
      // Inserts seed entries
      return knex('chat').insert([
        {
          id_provider: 4 , 
          id_client: 2,
          message: 'Olá! Queria ver quando fica melhor o agendamento',
          message_received: true,
          date_send: new Date(),
          date_received:  new Date(),
          midia: null,
          receptor: 0
        },
        {
          id_provider: 4 , 
          id_client: 2,
          message: 'Na sexta a tarde, ta ok ?',
          message_received: true,
          date_send: new Date(),
          date_received:  new Date(),
          midia: null,
          receptor: 1
        },
        {
          id_provider: 4 , 
          id_client: 2,
          message: 'ok, combinado',
          message_received: true,
          date_send: new Date(),
          date_received:  new Date(),
          midia: null,
          receptor: 0
        }
      ]);
    });
};
