import { Loader, jsonSS } from './alias.js'

function loaderAdd(setup) {
    Loader.shared
            .add(jsonSS)
            .load( setup )
            // я дописал
}
export default loaderAdd