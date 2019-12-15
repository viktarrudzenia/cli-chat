import React from 'react';

class List extends React.PureComponent {
	render () {
		const { values } = this.props;
		return <ul>
			{values.map(
				(item, idx) => <li key={idx}>{item.value}</li>,
			)}
		</ul>;
	}
}

export default List;