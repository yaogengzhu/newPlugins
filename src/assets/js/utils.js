export function inputLimit(reg) {
  return function(that, key) {
      // debugger
      const fn = Object.prototype.toString.call(that[key]) === "[object Number]" ? Number : String
      let value = that[key].toString()
      do {
          if (!reg.test(value)) {
              if (value.length > 0) {
                  value = value.substr(0, value.length - 1)
                  that[key] = fn(value)
              } else {
                  return
              }
          }
      } while (!reg.test(value))
  }
}

export const inputLimitNormal = inputLimit(/^\S*$/)
export const inputLimitPhone = inputLimit(/^1[0-9]{0,10}$/)
export const inputLimitNumber = inputLimit(/^[0-9]{0,11}$/)
export const inputLimitCreditCode = inputLimit(/^[0-9A-Z]{1,18}$/)
export const inputLimitBankCard = inputLimit(/^\d{1,19}$/)
export const inputLimitIDCard = inputLimit(/^[0-9]{1,17}[0-9X]?$/)