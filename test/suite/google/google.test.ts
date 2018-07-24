import { expect } from 'chai';
import { rest } from '../../lib/helpers/rest';

describe('Google API', () => {
  it('Google Search Page Request Success', async () => {
    const response = await rest.get('https://www.google.com');
    expect(response.status).to.be.eq(200, `A página de busca retornou o status ${response.status}`);
  });

  it('Google Search Page Request Fail', async () => {
    const response = { status: 400 };
    expect(response.status).to.be.eq(200, `A página de busca retornou erro de status ${response.status}`);
  });
});
