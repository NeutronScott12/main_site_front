import { branch, renderComponent } from 'recompose'

export default (loading, component) => branch(loading, renderComponent(component))
