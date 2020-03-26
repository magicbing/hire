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
  const regFilename:RegExp = /(http:\/\/|https:\/\/).+?js/gs
  const regNumber:RegExp = /(?<=:)\d+/gs

  const matchArr:RegExpMatchArray = err.message.match(regMatch) || []
  const stack = matchArr && matchArr.map(str => {
    const lineArr:RegExpMatchArray = str.match(regNumber) || []
    const line:number = parseInt(lineArr.slice(-2,-1)[0])

    const columnArr:RegExpMatchArray = str.match(regNumber) || []
    const column:number = parseInt(columnArr && columnArr.slice(-1)[0])

    const filenameArr:RegExpMatchArray | null = str.match(regFilename)
    const filename:string = filenameArr && filenameArr[0] || ''
    
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
