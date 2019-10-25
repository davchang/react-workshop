
export function deepFind(id) {
  if (this.refs && this.refs[id]) {  // chapter level
    return this.refs[id]
  } else {
    for (const entry in this.refs) {  //section level
      const nextLevel = this.refs[entry]
      if (nextLevel.refs && nextLevel.refs[id]) {
        return nextLevel.refs[id]
      }
    }
  }
}

export function flatten(data) {
  // convert json structure to a flat array structure
  // [ {id: 'Input'...}
  //   {id: 'Chapter1'...}
  //   {id: 'Chapter1Section1'...}
  //   {id: 'Chapter1Section1subSection1'...}
  // ]
  let j = 0
  let result = []
  let compResult = []
  let partId = ''
  let chapterId = ''
  let sectionId = ''
  let foo = function myFoo(myArr) {
    myArr.map((entry, index) => {
      if (entry === 'part') {
        partId = entry.id
        chapterId = ''
        sectionId = ''
      } else if (entry === 'chapter') {
        chapterId = entry.id
        sectionId = ''
      } else if (entry === 'section') {
        sectionId = entry.id
      }

      result[j] = {
        id: entry.id,
        name: entry.name,
        title: entry.title,
        contentId: entry.contentId,
        level: entry.level
      }

      if (entry === 'chapter') {
        result[j].partId = partId
      } else if (entry === 'section') {
        result[j].partId = partId
        result[j].chapterId = chapterId
      } else if (entry === 'sub-section') {
        result[j].partId = partId
        result[j].chapterId = chapterId
        result[j].sectionId = sectionId
      }

      if (entry.component) {
        result[j].component = entry.component
      }

      if (entry.items) {
        j = j + 1
        myFoo(entry.items)
      } else {
        result[j].completion = false
        j = j + 1
      }
    })
  }(data)

  // console.log(result)

  j = 0
  result.map((entry, index) => {
    if (typeof entry.completion !== 'undefined') {
      compResult[j] = entry
      j = j + 1
    }
  })

  // console.log(compResult)

  return compResult
}

export function calcMinWidth(data, initialValue) {
  let initialResult = initialValue ? initialValue : 0
  return data.reduce((result, item) => {
    if (item.columns) {
      return calcMinWidth(item.columns, result)
    } else {
      return item.minWidth ? result + item.minWidth : result + item.width
    }
  }, initialResult)
}

export function updateColumns(data, containerWidth) {
  let accuLen = 0
  const foo = (data, containerWidth) => {
    return data.map((item, index) => {
      if (item.columns) {
        item.columns = foo(item.columns, containerWidth)
        return item
      } else {
        accuLen = accuLen + item.minWidth
        if (accuLen > (containerWidth - 35)) {
          item.show = false
        }
        return item
      }
    })
  }

  return foo(data, containerWidth)
}

export function createColumnKeys(columns, initialValue) {
  let initialResult = initialValue ? initialValue : 0
  return columns.reduce((result, item) => {
    if (item.columns) {
      return createColumnKeys(item.columns, result)
    }
    const name = item.id ? item.id : item.accessor
    if (!item.show) {
      result[name] = false
    }

    return result
  }, initialResult);
}
