const findComponentUpward = (context, componentName) => {
  let parent = context.$parent
  let name = parent.$options.name
  while (parent && (!name || name !== componentName)) {
    parent = parent.$parent
    name = parent.$options.name
  }
  return parent
}

const findComponentsUpward = (context, componentName) => {
  let parents = []
  const parent = context.$parent
  const name = parents.$options.name
  if (parent) {
    if (name === componentName) parents.push(parent)
    return parents.concat(findComponentsUpward(parent, componentName))
  } else {
    return []
  }
}

const findComponentDownward = (context, componentName) => {
  const childrens = context.$children
  let children = null
  if (childrens?.length) {
    for (const child of childrens) {
      const name = child.$options.name
      if (name === componentName) {
        children = child
        break
      } else {
        children = findComponentDownward(child, componentName)
        if (children) break
      }
    }
  }
  return children
}

const findComponentsDownward = (context, componentName) => {
  const childrens = context.$children
  const childrenResult = []
  if (childrens?.length) {
    for (const child of childrens) {
      const name = child.$options.name
      if (name === componentName) {
        childrenResult.push(child)
      } else {
        childrenResult.concat(findComponentDownward(child, componentName))
      }
    }
  }
  return childrenResult
}

export default {
  findComponentUpward,
  findComponentsUpward,
  findComponentDownward,
  findComponentsDownward
}
