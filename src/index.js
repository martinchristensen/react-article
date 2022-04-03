import React from 'react'
import styles from './styles.module.css'

const cloneSections = (props, objNewProps, parentIndexStr = null, startIndex = 1) => {
  return (
    React.Children.toArray(props.children).filter(child => child.type === Section).map((section, index) => {
      const newObjNewProps = objNewProps
      newObjNewProps["index"] = index + startIndex
      parentIndexStr !== null ? newObjNewProps["indexStr"] = parentIndexStr + "." + (index + startIndex) : newObjNewProps["indexStr"] =  index + startIndex
      return (
        React.cloneElement(section, newObjNewProps)
      )
    }
  ))}

export const Article = (props) => {
  return (
    cloneSections(props,{level: 1},null)
  )
}

export const Section = (props) => {
  const headerInSection = () => {
    return (
    React.Children.toArray(props.children).filter(child => child.type === Header).map((header, index) => {
      return (
         React.cloneElement(header, {level: props.level, indexStr: props.indexStr} )
      )
    }))
  }

  return (
    <div className={"article-section " + (props.className !== undefined ? props.className: "")}>
      {headerInSection()}
      {cloneSections(props, {level: props.level+1}, props.indexStr)}
    </div>
  )
}

export const Header = (props) => {

  const text = props.indexStr + " " + props.children

  const headerSwitch = (level) => {
    switch(level) {
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
