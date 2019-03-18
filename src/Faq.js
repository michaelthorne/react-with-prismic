import React from 'react'
import NotFound from './NotFound'
import Prismic from 'prismic-javascript'
import { RichText } from 'prismic-reactjs'

// Declare your component
export default class Faq extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      doc: null,
      notFound: false,
      faqs: [],
    }
    if (props.prismicCtx) {
      this.fetchPage(props)
    }
  }

  componentDidUpdate (prevProps) {
    this.props.prismicCtx.toolbar()
    // We fetch the page only after it's ready to query the api
    if (!prevProps.prismicCtx) {
      this.fetchPage(this.props)
    }
  }

  fetchPage (props) {
    // We are using the function to get single type document
    return props.prismicCtx.api.getSingle('page').then(doc => {
      if (doc) {
        // We put the retrieved content in the state as a doc variable
        this.setState({ doc })
        props.prismicCtx.api.query(
          // Get the blog posts in descending order
          Prismic.Predicates.at('document.type', 'faq'),
          { /*orderings: '[my.post.date desc]'*/ }
        ).then(res => {
          this.setState({ faqs: res.results })
        })
      } else {
        // We changed the state to display error not found if no matched doc
        this.setState({ notFound: !doc })
      }
    })
  }

  render () {
    if (this.state.doc) {
      return (
        <div>
          {this.state.faqs.map((faq) => {
            return (
              <div data-wio-id={faq.id} key={faq.id}>
                {RichText.render(faq.data.question)}
                {RichText.render(faq.data.answer)}
                <hr/>
              </div>
            )
          })}
        </div>
      )
    } else if (this.state.notFound) {
      return <NotFound/>
    }
    return <h1>Loading</h1>
  }
}