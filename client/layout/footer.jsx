import className from '../assets/styles/footer.scss'

export default {
  data () {
    return {
      author: 'cyc'
    }
  },

  render () {
    return (
      <div id={className.footer}>
        <span>Written by {this.author}</span>
      </div>
    )
  }
}
