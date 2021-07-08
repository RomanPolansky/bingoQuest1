import { Loader, jsonSS } from './alias.js'

function loaderAdd(setup) {
    Loader.shared
            .add(jsonSS)
            .load( setup )
}
export default loaderAdd