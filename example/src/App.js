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
          <Header link={"yolo"}>This Section</Header>
          <BreadText>
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
          </BreadText>
          <Section>
            <Header>This is a Subsection</Header>
          </Section>
          <Section>
            <Header>So is this</Header>
            <Section>
              <Header link={"bandit"}>And this</Header>
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
