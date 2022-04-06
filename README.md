# react-article

> This package makes it easy to set up articles for web app with react components. I created this package to make the process, of creating technical articles, fast and easy for my own website. I then decided to publish this package for everyone with similar needs to use.
> Feel free to suggest or PR for new features and/or optimization of existing ones.

[![NPM](https://img.shields.io/npm/v/react-article.svg)](https://www.npmjs.com/package/react-article) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-article
```

## Usage

### imports
```jsx
import { Article, Section, Header, TableOfContents, Bread } from 'react-article'
import 'react-article/dist/index.css'
```

### Components
All components render in the following order:
```jsx
<Article> {/*All other components are a child of this*/}

  <Header>Article Title</Header> {/* The Header component encapsulate its child in appropiate h-tag. This renders <h1>Article Title</h1> */}

  <Bread>
    The Bread component returns its child.
  </Bread>

  <TableOfContents text={"Table of Contents"} /> {/* The TableOfContents creates a table of contents from all Sections inside the Article*/}

  <Section> {/* This is a Section of the article */}
    <Header>Section Header</Header> {/* This Header's child is rendered inside <h2></h2> since it's parent is the Article */}

    <Bread>
      <p>A Section can also have bread</p>
    </Bread>

    <Section> {/* Sections can be nested to 5 layers (first section included) */}

      {/* The link prop for a Header will render the respective list element in the table of contents with a href to this. */}
      {/* The link prop must be a unique string in the Article component with nu spaces*/}
      <Header link={"I-am-unique"}>This is a subsection</Header>

    </Section>

  </Section>

</Article>
```

## Planned features

## License

MIT © [martinchristensen](https://github.com/martinchristensen)
