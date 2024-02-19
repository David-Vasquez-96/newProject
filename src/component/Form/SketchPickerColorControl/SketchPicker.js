import React from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'

class SketchExample extends React.Component {
	state = {
		displayColorPicker: false,
		color: this.props?.value || '#EC168A',
		// color: {
		// 	r: '241',
		// 	g: '112',
		// 	b: '19',
		// 	a: '1',
		// },		
	};

	handleClick = () => {
		this.setState({ displayColorPicker: !this.state.displayColorPicker })
	};

	handleClose = () => {
		this.setState({ displayColorPicker: false })
	};

	handleChange = (color) => {
		this.props.getData(color)
		this.setState({ color: color.rgb })
	};

render() {
	const styles = reactCSS({
		'default': {
			color: {
				width: '100%',
				height: '14px',
				borderRadius: '2px',
				// background: this.state.color,
				background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
			},
			swatch: {
				padding: '5px',
				background: '#fff',
				// borderRadius: '1px',
				// boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
				display: 'inline-block',
				cursor: 'pointer',
				width: '100%',
			},
			popover: {
				position: 'absolute',
				zIndex: '2',
			},
			cover: {
				position: 'fixed',
				top: '0px',
				right: '0px',
				bottom: '0px',
				left: '0px',
			},
			label: {
				width: '100%',
				color: 'D4D8C1',
				paddingLeft: '5px',
			}
		},
	});
return (
	<div className={(this.props.style) ? this.props.style : ''}>
		<div style={ styles.label }>{this.props.label}</div>
		<div style={ styles.swatch } onClick={ this.handleClick }>
			<div style={ styles.color } />
		</div>
		{ 
			this.state.displayColorPicker ? (
				<div style={ styles.popover }>
					<div style={ styles.cover } onClick={ this.handleClose }/>
					<SketchPicker 
						color={ this.state.color } 
						onChange={ this.handleChange } 
						// onChange={(event) => {
						// 	this.props.handleChange(event);
						// }}						
					/>
					{/* <SketchPicker color={ this.state.color } onChange={ this.handleChange } /> */}
				</div> 
			): null }
	</div>
)
}
}

export default SketchExample