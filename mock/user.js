
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

module.exports = [
  // user login
  {
    url: '/vue-element-admin/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: {
          token: token,
          routes: [
            {
              type: 'title',
              name: 'permission',
              path: '',
              children: [
                {
                  type: 'page',
                  name: 'Page Permission',
                  path: '/permission/page',
                  children: [
                    {
                      type: 'button',
                      name: 'delete'
                    },
                    {
                      type: 'button',
                      name: 'edit'
                    }
                  ]
                },
                {
                  type: 'page',
                  name: 'Page directive',
                  path: '/permission/directive',
                  children: [
                    {
                      type: 'button',
                      name: 'delete'
                    },
                    {
                      type: 'button',
                      name: 'edit'
                    }
                  ]
                },
                {
                  type: 'page',
                  name: 'Page role',
                  path: '/permission/role',
                  children: [
                    {
                      type: 'button',
                      name: 'delete'
                    },
                    {
                      type: 'button',
                      name: 'edit'
                    }
                  ]
                }
              ]
            },
            {
              type: 'title',
              name: 'Example',
              path: '',
              children: [
                {
                  type: 'page',
                  name: 'Example create',
                  path: 'example/create',
                  children: [
                    {
                      type: 'button',
                      name: 'delete'
                    },
                    {
                      type: 'button',
                      name: 'edit'
                    }
                  ]
                },
                {
                  type: 'page',
                  name: 'Example list',
                  path: 'example/list',
                  children: [
                    {
                      type: 'button',
                      name: 'delete'
                    },
                    {
                      type: 'button',
                      name: 'edit'
                    }
                  ]
                }
              ]
            }
          ]
        }
      }
    }
  },

  // get user info
  {
    url: '/vue-element-admin/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/vue-element-admin/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
