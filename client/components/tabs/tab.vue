<script>
export default {
  name: 'Tab',
  // inject: ['value'],
  props: {
    index: {
      type: [Number, String],
      required: true
    },
    label: {
      type: String,
      default: 'tab'
    }
  },
  computed: {
    active () {
      return this.$parent.value === this.index
      // return this.value === this.index // 通过provide inject接收的value在顶层value变化时不会追踪，即获取的不是响应式属性
    }
  },
  mounted () {
    this.$parent.panes.push(this)
  },
  updated () {
    // 外部变更时，强制刷新tabs组件的内容slot
    const i = this.$parent.panes.indexOf(this)
    this.$parent.panes.splice(i, 1, this)
  },
  methods: {
    handleClick () {
      this.$parent.onChange(this.index)
    }
  },
  render () {
    const tab = this.$slots.label || <span>{this.label}</span>
    const classNames = {
      tab: true,
      active: this.active
    }
    return (
      <li class={classNames} on-click={this.handleClick}>
        {tab}
      </li>
    )
  }
}
</script>

<style lang="scss" scoped>
  .tab {
    list-style: none;
    line-height: 40px;
    margin-right: 30px;
    position: relative;
    bottom: -2px;
    cursor: pointer;
    &.active {
      border-bottom: 2px solid blue;
    }
    &:last-child {
       margin-right: 0;
    }
  }
</style>
