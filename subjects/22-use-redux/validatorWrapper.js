import validator from 'validator'
import isEmpty from 'validator/lib/isEmpty'
import isNumeric from 'validator/lib/isNumeric'
import isAlpha from 'validator/lib/isAlpha'
import isAlphanumeric from 'validator/lib/isAlphanumeric'
import isDecimal from 'validator/lib/isDecimal'
import isEmail from 'validator/lib/isEmail'

const checkDecimal = (value) => {
  const regExp = /^(?:\d{1,3}(?:,\d{3})*|\d+)(?:\.\d+)?$/
  return regExp.test(value)
}

export const convertDecimalToInteger = (value) => {
  return Math.floor(value.replace(/\,/g,''))
}

const validations = Object.assign({}, {
  isNotEmpty: {
    rule: value => {
      return !isEmpty(value.trim())
    },
    hint: value => {
      return ['This field is required.']
    }
  },
  isNumeric: {
    rule: value => {
      return isNumeric(value)
    },
    hint: value => {
      return ['Invalid character. Please enter integers only without a comma.']
    }
  },
  isAlpha: {
    rule: value => {
      return isAlpha(value)
    },
    hint: value => {
      return ['Invalid character. Please enter integers only without a comma.']
    }
  },
  isAlphanumeric: {
    rule: value => {
      return isAlphanumeric(value)
    },
    hint: value => {
      return ['Invalid character. Please enter integers only without a comma.']
    }
  },
  isDecimal: {
    rule: value => {
      return isDecimal(value)
    },
    hint: value => {
      return ['Please enter integers only without a comma.']
    }
  },
  isEmail: {
    rule: value => {
      return isEmail(value)
    },
    hint: value => {
      return ['Please enter a correct email address.']
    }
  },
  validUpliftLoadASD: {  // upliftLoadASD range 1 - 20000
    rule: value => {
      const x = checkDecimal(value) ? convertDecimalToInteger(value) : null
      if (x) {
        return x <= 20000 && x >= 1
      } else {
        return false
      }
    },
    hint: value => {
      return ['Out-of-bounds uplift load. The value must be (1 to 20,000) lb.']
    }
  }
})

const validatorWrapper = {

  validate: (methods, value) => {
    const errors = methods.reduce((summary, method) => {
      if (validations[method] && !validations[method].rule(value)) {
        return summary.concat(validations[method].hint(value))
      } else {
        return summary
      }
    }, [])

    return errors
  }
}

export default validatorWrapper
