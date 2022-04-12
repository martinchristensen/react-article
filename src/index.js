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

  const findParent = (contents, index) => {
    for (let i = index; i => 0; i--) {
      if (contents[i].level < contents[index].level) {
        return contents[i]
      }
    }
  }

  const newCreateList = (contents, thisLevel = 0, parentIndex = 0) => {
    return (
      contents.map((content, index) => {
        if (content.level === thisLevel && contents[index+1] !== undefined && content.level < contents[index+1].level) { // Section has subsection(s)
          if (content.level !== 0) { // The section is a subsection
            if (contents[parentIndex] === findParent(contents, index)) { //If the function is called from its parent
              return (
                <li key={index}>
                  {content.link === undefined ? content.text : <a href={"#react-article-" + props.articleId + "-header-"+content.link}>{content.text}</a>}
                  <ol>
                    { thisLevel < 5 ? newCreateList(contents, thisLevel+1, index) : "" }
                  </ol>
                </li>
              )
            }
          }
          else { // The section is at level 0
            return (
              <li key={index}>
                {content.link === undefined ? content.text : <a href={"#react-article-" + props.articleId + "-header-"+content.link}>{content.text}</a>}
                <ol>
                  { thisLevel < 5 ? newCreateList(contents, thisLevel+1, index) : "" }
                </ol>
              </li>
            )
          }
        }
        else if (content.level === thisLevel ) { // section has no subsection(s)
          if (content.level !== 0) { // The section is a subsection
            if (contents[parentIndex] === findParent(contents, index)) { //If the function is called from its parent
              return (
                <li key={index}>
                  {content.link === undefined ? content.text : <a href={"#react-article-" + props.articleId + "-header-"+content.link}>{content.text}</a>}
                </li>
              )
            }
          } else { //The section is at level 0
            return (
              <li key={index}>
                {content.link === undefined ? content.text : <a href={"#react-article-" + props.articleId + "-header-"+content.link}>{content.text}</a>}
              </li>
            )
          }
        }
      })
    )
  }

  return (
    <div className={"react-article-table-of-contents " + (props.className !== undefined ? props.className: "")}>
      {props.text !== undefined ? <h2>{props.text}</h2> : ""}
      <ol>
        {newCreateList(props.contents)}
      </ol>
    </div>
  )
}

export const Bread = (props) => {
  return (
    <div className={"react-article-bread" + (props.className !== undefined ? (" " + props.className) : "")}>
      {props.children}
    </div>
  )
}
