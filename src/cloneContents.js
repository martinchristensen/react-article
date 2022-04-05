import React from "react";
import { Header, Section, TableOfContents, BreadText } from "./index";

export const cloneSections = (props, objCloneProps, parentIndexStr = null, startIndex = 1) => {
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

export const cloneHeaders = (props, objCloneProps) => {
  return (
    React.Children.toArray(props.children).filter(child => child.type === Header).map((header, index) => {
      return (
        React.cloneElement(header, objCloneProps )
      )
    })
  )
}

export const cloneBreadText = (props) => {
  return (
    React.Children.toArray(props.children).filter(child => child.type === BreadText).map((bread, index) => {
      return (
        React.cloneElement(bread, {className: props.className})
      )
    })
  )
}

export const cloneTableOfContents = (props) => {
  return (
    React.Children.toArray(props.children).filter(child => child.type === TableOfContents).map((table, index) => {
      return (
        React.cloneElement(table, {contents: fetchContents(props)})
      )
    })
  )
}

const fetchContents = (props) => {
  const contents = []
  let lvl1contents = [];
  let lvl2contents = [];
  let lvl3contents = [];
  let lvl4contents = [];
  let lvl5contents = [];

  const fetchHeaders = (section, level) => {
    React.Children.toArray(section.props.children).filter(child => child.type === Header || child.type === Section).map(item => {
      if (item.type === Header) {
        switch(level) {
          case 0:
            contents.push(item.props.children)
            break;
          case 1:
            lvl1contents.push(item.props.children)
            break;
          case 2:
            lvl2contents.push(item.props.children)
            break;
          case 3:
            lvl3contents.push(item.props.children)
            break;
          case 4:
            lvl4contents.push(item.props.children)
            break;
          case 5:
            lvl5contents.push(item.props.children)
            break;
          default:
            contents.push(item.props.children)
        }
      }
      else if (item.type === Section)
        fetchHeaders(item, level + 1)
    })
  }

  React.Children.toArray(props.children).filter(child => child.type === Section).map(section => {
    lvl1contents = []
    lvl2contents = []
    lvl3contents = []
    lvl4contents = []
    lvl5contents = []
    fetchHeaders(section, 0)
    if (lvl5contents.length > 0) lvl4contents.push(lvl5contents)
    if (lvl4contents.length > 0) lvl3contents.push(lvl4contents)
    if (lvl3contents.length > 0) lvl2contents.push(lvl3contents)
    if (lvl2contents.length > 0) lvl1contents.push(lvl2contents)
    if (lvl1contents.length > 0) contents.push(lvl1contents)
  })

  return (
    contents
  )
}