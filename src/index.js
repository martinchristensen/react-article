import React from 'react'
import styles from './styles.module.css'

const cloneSections = (props, objCloneProps, parentIndexStr = null, startIndex = 1) => {
  return (
    React.Children.toArray(props.children).filter(child => child.type === Section).map((section, index) => {
      const newCloneProps = objCloneProps
      newCloneProps["index"] = index + startIndex
      parentIndexStr !== null ? newCloneProps["indexStr"] = parentIndexStr + "." + (index + startIndex) : newCloneProps["indexStr"] =  index + startIndex
      return (
        React.cloneElement(section, newCloneProps)
      )
    }
  ))
}

const cloneHeaders = (props, objCloneProps) => {
  return (
    React.Children.toArray(props.children).filter(child => child.type === Header).map((header, index) => {
      return (
        React.cloneElement(header, objCloneProps )
      )
    })
  )
}

export const Article = (props) => {
  return (
    cloneSections(props,{level: 1},null)
  )
}

export const Section = (props) => {
  return (
    <div className={"article-section " + (props.className !== undefined ? props.className: "")}>
      {cloneHeaders(props, {level: props.level, indexStr: props.indexStr})}
      {cloneSections(props, {level: props.level+1}, props.indexStr)}
    </div>
  )
}

export const Header = (props) => {

  const text = props.indexStr + " " + props.children

  const headerSwitch = (level) => {
    switch(level) {
      case 0:
        return <h1> {text} </h1>
      case 1:
        return <h2> {text} </h2>;
      case 2:
        return <h3> {text} </h3>;
      case 3:
        return <h4> {text} </h4>;
      case 4:
        return <h5> {text} </h5>;
      case 5:
        return <h6> {text} </h6>;
      default:
        return <h6> {text} </h6>;
    }
  }

  return (
      headerSwitch(props.level)
  )
}

export const Content = () => {

}
