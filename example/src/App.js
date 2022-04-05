import React from 'react'

import { Article, Section, Header, TableOfContents, BreadText } from 'react-article'
import 'react-article/dist/index.css'

const App = () => {
  return (
    <>
      <Article>
        <Header>Example Article</Header>
        <BreadText>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </BreadText>
        <TableOfContents text={"Table of Contents"} />
        <Section>
          <Header>This Section</Header>
          <Section>
            <Header>This is a Subsection</Header>
          </Section>
          <Section>
            <Header>So is this</Header>
            <Section>
              <Header>And this</Header>
              <Section>
                <Header>This one too</Header>
              </Section>
            </Section>
          </Section>
        </Section>
        <Section>
          <Header>That Section</Header>
          <Section>
            <Header>That Subsection</Header>
          </Section>
        </Section>
      </Article>
    </>
  )
}

export default App
