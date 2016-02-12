import React, { Component, PropTypes } from 'react'

import { title }   from 'react-isomorphic-render'
import { preload } from 'react-isomorphic-render/redux'
import { connect } from 'react-redux'

import { bindActionCreators as bind_action_creators } from 'redux'

import { get as get_settings } from '../actions/settings'

@preload((dispatch, get_state) => dispatch(get_settings()))
@connect
(
	store => 
	({
		settings : store.settings.data,
		error    : store.settings.error
	}),
	dispatch => bind_action_creators({ get_settings }, dispatch)
)
export default class About extends Component
{
	static propTypes =
	{
		get_settings : PropTypes.func.isRequired,
		settings     : PropTypes.object,
		error        : PropTypes.object
	};

	// static contextTypes =
	// {
	// 	store : PropTypes.object.isRequired
	// }

	// componentDidMount()
	// {
	// 	// to do: remove second loading here for client-side navigation
	// 	// to do: remove loading here for server-side rendered page
	// 	if (window.client_side_routing)
	// 	{
	// 		this.constructor.preload(this.context.store)
	// 	}
	// }

	render()
	{
		const { error, settings } = this.props

		let content

		if (error)
		{
			content = 
			(
				<section className="content">
					Error: {error.stack || error.message}
				</section>
			)
		}
		// else if (settings.loading)
		// {
		// 	content = 
		// 	(
		// 		<div>
		// 			Loading...
		// 		</div>
		// 	)
		// }
		else if (settings)
		{
			content = 
			(
				<section className="content">
					<p>These values were loaded dynamically from the server (via ajax) using REST api:</p>

					<div>Putin: {settings.putin}</div>
					<div>Version: {settings.version}</div>
				</section>
			)
		}
		else
		{
			content = 
			(
				<section className="content">
					Loading
				</section>
			)
		}

		const markup = 
		(
			<div>
				{title("About")}
				{content}
			</div>
		)

		// <div>Copyright © 2015</div>

		return markup
	}
}

// const are_settings_loaded = (global_state) => global_state.settings && global_state.settings.loaded