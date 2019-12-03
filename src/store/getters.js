/*
 * @Author: yangdan
 * @Date: 2019-09-19 18:20:19
 * @LastEditors: yangdan
 * @LastEditTime: 2019-11-12 14:54:04
 * @Description: 添加描述
 */
const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  isDot: state => state.app.isDot,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  routesTest: state => state.test.routes,
  errorLogs: state => state.errorLog.logs,
  get_routes: state => state.getRouter.routes,
  PaginationData: state => state.test.pagination
};
export default getters;
