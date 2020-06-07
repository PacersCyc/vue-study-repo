module.exports = function(isDev) {
  return {
    compilerOptions: {
      preserveWhiteSpace: true
    },
    extractCSS: !isDev,
  }
}