import { expect } from 'chai';
import { rest } from '../../lib/helpers/rest';

const { BASE_URL } = process.env;

suite('Google API', () => {
  test('Google Search Page Request Success', async () => {
    const response = await rest.get(BASE_URL);
    expect(response.status).to.be.eq(
      200,
      `The search page returned an error with http status = '${
        response.status
      }'`,
    );
  });

  test('Google Search Page Request Fail', async () => {
    const response = { status: 400 };
    expect(response.status).to.be.eq(
      200,
      `The search page returned an error with http status = '${
        response.status
      }'`,
    );
  });
});
