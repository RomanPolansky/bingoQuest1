import { Loader } from './alias.js'

function loaderAdd(setup) {
    Loader.shared
            .add('assets/ss.json')
            .load( setup )
}
export default loaderAdd