import React from 'react'
import './styles.module.css'
import {cloneHeaders, cloneTableOfContents, cloneSections, cloneBreadText} from './cloneContents'

export const Article = (props) => {
  const articleId = Math.floor(Math.random() * 100);
  return (
    <div id={"react-article-"+articleId} className={"react-article " + (props.className !== undefined ? props.className: "")}>
      {cloneHeaders(props, { level: 0, articleId: articleId})}
      {cloneBreadText(props)}
      {cloneTableOfContents(props, {articleId: articleId})}
      {cloneSections(props, { level: 1, articleId: articleId })}
    </div>
  )
}

export const Section = (props) => {
  return (
    <div className={"react-article-section react-article-level-" + props.level + " " +  (props.className !== undefined ? props.className: "")}>
      {cloneHeaders(props, {level: props.level, indexStr: props.indexStr, articleId: props.articleId })}
      {cloneBreadText(props)}
      {cloneSections(props, {level: props.level+1, articleId: props.articleId }, props.indexStr)}
    </div>
  )
}

export const Header = (props) => {

  const text = props.indexStr!==undefined ? props.indexStr + " " + props.children : props.children
  const class_name = "react-article-header react-article-level-" + props.level + " " + (props.className !== undefined ? props.className: "");
  const hLink = props.link !== undefined ? "react-article-" + props.articleId + "-header-" + props.link : ""

  const headerSwitch = (level) => {
    switch(level) {
      case 0:
        return <h1 className={class_name}> {text} </h1>
      case 1:
        return <h2 id={hLink} className={class_name}> {text} </h2>
      case 2:
        return <h3 id={hLink} className={class_name}> {text} </h3>
      case 3:
        return <h4 id={hLink} className={class_name}> {text} </h4>
      case 4:
        return <h5 id={hLink} className={class_name}> {text} </h5>
      case 5:
        return <h6 id={hLink} className={class_name}> {text} </h6>
      default:
        return <h6 id={hLink} className={class_name}> {text} </h6>
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
              {contents[index-1].link === undefined ? contents[index-1].text : <a href={"#react-article-" + props.articleId + "-header-"+contents[index-1].link}>{contents[index-1].text}</a> /*previous element of an array is its parent section*/}
              <ol>
                {createList(content)}
              </ol>
            </li>
          )
        else if (!Array.isArray(contents[index+1])) //If the next element is an array then it is a subsection of the element
          return <li key={index}>{contents[index].link === undefined ? contents[index].text : <a href={"#react-article-" + props.articleId + "-header-"+contents[index].link}>{contents[index].text}</a>}</li>
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
