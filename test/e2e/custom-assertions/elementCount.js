// A custom Nightwatch assertion.
// The assertion name is the filename.
// Example usage:
//
//   browser.assert.elementCount(selector, count)
//
// For more information on custom assertions see:
// http://nightwatchjs.org/guide#writing-custom-assertions

// This assertion tells is the count of elements matching the selector is compatible with the "comparison" and the passed value
// Assertion designed by Giovanni Basolu
exports.assertion = function (selector, count, comparison='===') {
  this.message = `Testing if element <${selector}> has count ${comparison} ${count}`
  this.expected = count
  this.pass = function (val) {
    let retVal = true
    switch (comparison) {
      case '===':
        retVal = (val === this.expected)
        break
      case '>':
        retVal = (val > this.expected)
        break
      case '>=':
        retVal = (val >= this.expected)
        break
      case '<':
        retVal = (val < this.expected)
        break
      case '<=':
        retVal = (val <= this.expected)
        break
      default:
        retVal = (val === this.expected)
        break
    }
    return retVal
  }
  this.value = function (res) {
    return res.value
  }
  this.command = function (cb) {
    var self = this
    return this.api.execute(function (selector) {
      return document.querySelectorAll(selector).length
    }, [selector], function (res) {
      cb.call(self, res)
    })
  }
}
