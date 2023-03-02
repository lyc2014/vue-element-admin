/* eslint-disable */
import { asyncRoutes } from '../index.js'
// }
export default function parseAsyncRoutes (routeList) {
    const routes = []
    findPathComponent(routeList)
    function findPathComponent (list) {
        for (var i = 0; i < list.length; i++) {
            let { type, path, children } = list[i]
            if (type === 'page') {
                let route = asyncRoutes.find(item => item.path === path)
                let obj = {
                    ...route
                }
                if (children && children.length > 0) {
                    obj.meta = children.filter(item => item.type === 'button').map(item => item.name)
                }
                routes.push(obj)
            }
            if (children && children.length > 0) {
                findPathComponent(children)
            }
        }
    }
    return routes
}