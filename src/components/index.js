import Header from './header'
import Content from './content'

const install = (Vue) => {
  Vue.component('my-header', Header)
  Vue.component('my-content', Content)
}

export default install
