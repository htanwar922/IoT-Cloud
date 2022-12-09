import { Children, cloneElement, isValidElement } from 'react';

const Props = (props) => {
	return (
		Children.map(props.children, (child) => {
			if(!isValidElement(child))
				return null
			return cloneElement(child, {
				...props,
				...child.props,
			})
		})
	)
}

export default Props