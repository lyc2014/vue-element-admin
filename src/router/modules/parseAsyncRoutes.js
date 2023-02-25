/* eslint-disable */
const asynComponents = {
    '/permission/page': () => import('@/views/permission/page'),
    '/permission/directive': () => import('@/views/permission/directive'),
    '/permission/role': () => import('@/views/permission/role'),
    '/example/create': () => import('@/views/example/create'),
    '/example/list': () => import('@/views/example/list')
}
export default function parseAsyncRoutes (routeList) {
    const routes = []
    findPathComponent(routeList)
    function findPathComponent (list) {
        for (var i = 0; i < list.length; i++) {
            let { type, path, children } = list[i]
            if (type === 'page') {
                let obj = {
                    path,
                    // eslint-disable-next-line
                    component: asynComponents[path]
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