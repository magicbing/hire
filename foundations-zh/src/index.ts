export interface ErrorMessage {
  message: string
  stack: Array<{
    line: number
    column: number
    filename: string
  }>
}

export function parseError(err: Error): ErrorMessage {
  // implement
  
  const regMatch:RegExp = /(http:\/\/|https:\/\/).+?js.*?:\d+:\d+/gs
  const matchArr:RegExpMatchArray = err.message.match(regMatch) || []
  const stack = matchArr.map(str => {
    const length:number = str.length
    let line:number = -1
    let column:number = -1
    let slow:number = length - 1
    let fast:number = length - 1
    while (slow >= 0 && fast >=0) {
      while (str[fast] !== ':') {
        fast--
      }
      if (column === -1) {
        column = parseInt(str.slice(fast + 1, slow + 1))
        fast--
        slow = fast
      } else if (line === -1) {
        line = parseInt(str.slice(fast + 1, slow + 1))
        break
      }
    }
    const filename:string = str.slice(0, fast)
    
    return {
      line,
      column,
      filename
    }
  })

  const result = {
    message: 'Error raised',
    stack
  }
  
  return result
}
