import * as supertest from 'supertest'
import app from './Application'

describe('Application', () => {
  it('works', () =>
    supertest(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200)
  )
})
