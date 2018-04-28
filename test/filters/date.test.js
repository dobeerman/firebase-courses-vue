import filter from '../../src/filters/date'

describe('date filter', () => {
  it('should be equal to `...`', () => {
    expect(filter('1 May 2018')).toEqual('May 01, 2018, 12:00 AM')
  })
})
