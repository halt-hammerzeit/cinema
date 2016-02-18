import React, { Component } from 'react'
import { title }            from 'react-isomorphic-render'
import { connect }          from 'react-redux'

import styler from 'react-styling'

import { defineMessages } from 'react-intl'
import international      from '../../international/internationalize'

import Url                    from '../../tools/url'
import { should_redirect_to } from '../../tools/redirection'

const messages = defineMessages
({
	header:
	{
		id             : 'error_page.header',
		description    : 'Generic error page header',
		defaultMessage : 'An error occured'
	}
})

@international()
export default class Generic_error extends Component
{
	render()
	{
		const markup =
		(
			<section className="content" style={style.content}>
				{title("Error")}

				<h1 style={style.header}>
					{this.props.translate(messages.header)}
				</h1>

				<a style={style.link} href={should_redirect_to(this.props.location)}>{new Url(should_redirect_to(this.props.location)).to_relative_url()}</a>
			</section>
		)

		return markup
	}
}

const style = styler
`
	content
		text-align : center

	link
		display    : inline-block
		margin-top : 2em

		max-width     : 100%
		text-overflow : ellipsis
		overflow      : hidden
`