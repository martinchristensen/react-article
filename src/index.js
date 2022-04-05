import React from 'react'
import './styles.module.css'
import {cloneHeaders, cloneTableOfContents, cloneSections, cloneBreadText} from './cloneContents'

export const Article = (props) => {
  return (
    <div className={"react-article " + (props.className !== undefined ? props.className: "")}>
      {cloneHeaders(props, { level: 0})}
      {cloneBreadText(props)}
      {cloneTableOfContents(props)}
      {cloneSections(props, { level: 1 })}
    </div>
  )
}

export const Section = (props) => {
  return (
    <div className={"react-article-section react-article-level-" + props.level + " " +  (props.className !== undefined ? props.className: "")}>
      {cloneHeaders(props, {level: props.level, indexStr: props.indexStr})}
      {cloneBreadText(props)}
      {cloneSections(props, {level: props.level+1}, props.indexStr)}
    </div>
  )
}

export const Header = (props) => {

  const text = props.indexStr!==undefined ? props.indexStr + " " + props.children : props.children
  const class_name = "react-article-header react-article-level-" + props.level + " " + (props.className !== undefined ? props.className: "");

  const headerSwitch = (level) => {
    switch(level) {
      case 0:
        return <h1 className={class_name}> {text} </h1>
      case 1:
        return <h2 className={class_name}> {text} </h2>;
      case 2:
        return <h3 className={class_name}> {text} </h3>;
      case 3:
        return <h4 className={class_name}> {text} </h4>;
      case 4:
        return <h5 className={class_name}> {text} </h5>;
      case 5:
        return <h6 className={class_name}> {text} </h6>;
      default:
        return <h6 className={class_name}> {text} </h6>;
    }
  }

  return (
      headerSwitch(props.level)
  )
}

export const TableOfContents = (props) => {

  const createList = (contents) => {
    return (
      contents.map((content, index) => {
        if(Array.isArray(content))
          return (
            <li key={index}>
              {contents[index-1] /*previous element of an array is its parent section*/}
              <ol>
                {createList(content)}
              </ol>
            </li>
          )
        else if (!Array.isArray(contents[index+1])) //If the next element is an array then it is a subsection of the element
          return <li key={index}>{content}</li>
      })
    )
  }

  return (
    <div className={"react-article-table-of-contents " + (props.className !== undefined ? props.className: "")}>
      {props.text !== undefined ? <h2>{props.text}</h2> : ""}
      <ol>
        {createList(props.contents)}
      </ol>
    </div>
  )
}

export const BreadText = (props) => {
  return (
    <div className={"react-article-bread" + (props.className !== undefined ? (" " + props.className) : "")}>
      {props.children}
    </div>
  )
}
