import React, { useEffect, useState } from "react";
import { Header, Section, TableOfContents, Bread } from "./index";

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
    React.Children.toArray(props.children).filter(child => child.type === Bread).map((bread, index) => {
      return (
        React.cloneElement(bread, {className: props.className})
      )
    })
  )
}

export const cloneTableOfContents = (props, objCloneProps) => {
  return (
    React.Children.toArray(props.children).filter(child => child.type === TableOfContents).map((table, index) => {

      const newCloneProps = objCloneProps
      newCloneProps["contents"] = fetchContents(props)
      return (
        React.cloneElement(table, newCloneProps)
      )
    })
  )
}

const fetchContents = (props) => {
  const contents = []

  const fetchHeaders = (section, level) => {
    React.Children.toArray(section.props.children).filter(child => child.type === Header || child.type === Section).map(item => {
      if (item.type === Header)
        contents.push({text: item.props.children, id: item.props.id, level: level })
      fetchHeaders(item, level + 1)
    })
  }

  React.Children.toArray(props.children).filter(child => child.type === Section).map(section => {
    fetchHeaders(section, 0)
  })
  return contents
}
