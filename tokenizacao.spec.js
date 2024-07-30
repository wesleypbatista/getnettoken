// cypress/e2e/tokenizacao.spec.js

describe('Testes de Tokenização', () => {
    const clientId = '67823c6d-58de-494f-96d9-86a4c22682cb';
    const clientSecret = 'c2d6a06f-5f31-448b-9079-7e170e8536e4';
  
    let accessToken;
  
    // Obtendo o token de autenticação antes de rodar os testes
    before(() => {
      cy.request({
        method: 'POST',
        url: 'https://api-homologacao.getnet.com.br/oauth/token',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: true,
        body: {
          grant_type: 'client_credentials',
          client_id: clientId,
          client_secret: clientSecret
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        accessToken = response.body.access_token;
      });
    });
  
    it('Deve validar a tokenização com sucesso', () => {
      cy.request({
        method: 'POST',
        url: 'https://api-homologacao.getnet.com.br/tokenizacao',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: {
          // Substitua os valores abaixo pelos parâmetros necessários para o endpoint de tokenização
          parametro1: 'valor1',
          parametro2: 'valor2',
          // Adicione todos os parâmetros obrigatórios aqui
        }
      }).then((response) => {
        // Valida o status code
        expect(response.status).to.eq(200);
  
        // Valida os campos obrigatórios na resposta
        expect(response.body).to.have.property('campo1');
        expect(response.body).to.have.property('campo2');
        // Adicione aqui todos os campos obrigatórios esperados
  
        // Valida o contrato da resposta
        expect(response.body).to.have.all.keys('campo1', 'campo2', 'campo3');
        // Adicione aqui todas as chaves esperadas no contrato
      });
    });
  });