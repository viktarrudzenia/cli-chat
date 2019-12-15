import React from 'react';

class List extends React.PureComponent {
	render () {
		const { values } = this.props;
		return <ul>
			{console.log('before LIST', values)}
			{values.map(
				(item, idx) => <li key={idx}>{item.title}</li>,
			)}
			{console.log('after LIST', values)}
		</ul>;
	}
}

export default List;