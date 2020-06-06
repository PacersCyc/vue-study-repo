import '../assets/styles/footer.scss'

export default {
  data() {
    return {
      author: 'cyc'
    }
  },

  render() {
    return (
      <div id="footer">
        <span>Written by {this.author}</span>
      </div>
    )
  }
}