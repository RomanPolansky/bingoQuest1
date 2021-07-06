import { Loader } from './alias.js'

function loaderAdd(setup) {
    Loader.shared
            .add('assets/ss.json')

            .add('assets/hand.png')
            .add('assets/handClick.png')

            .load( setup )
}
export default loaderAdd