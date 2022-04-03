import React from 'react'

import { Article, Section, Header } from 'react-article'
import 'react-article/dist/index.css'

const App = () => {
  return (
    <>
      <Article>
        <Section>
          <Header>Section</Header>
          <Section>
            <Header>Section</Header>
          </Section>
          <Section>
            <Header>Section</Header>
            <Section>
              <Header>Section</Header>
              <Section>
                <Header>Section</Header>
              </Section>
            </Section>
          </Section>
        </Section>
        <Section>
          <Header>Section</Header>
        </Section>
      </Article>
    </>
  )
}

export default App
