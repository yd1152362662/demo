<!--
 * @Author: yangdan
 * @Date: 2019-09-19 18:20:19
 * @LastEditors: yangdan
 * @LastEditTime: 2019-10-25 17:00:07
 * @Description: 添加描述
 -->
<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title } = context.props;
    const vnodes = [];

    if (icon) {
      vnodes.push(<svg-icon icon-class={icon} style='font-size:18px'/>);
    }

    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>);
    }
    return vnodes;
  }
};
</script>
