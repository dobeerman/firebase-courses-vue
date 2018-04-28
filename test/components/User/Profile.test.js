import { shallow } from '@vue/test-utils'
import Profile from '../../../src/components/User/Profile.vue'

describe('Profile.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(Profile)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
