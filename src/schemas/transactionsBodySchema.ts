const transactionsBodySchema = {
    body: {
      type: 'object',          
      properties: {
        accountId: {                  
          type: 'integer',
          minimum: 1
        },
        amount: {                  
          type: 'integer',
          minimum: 1
        },
      },
      required: ['accountId', 'amount'], 
    }
}

export default transactionsBodySchema;
