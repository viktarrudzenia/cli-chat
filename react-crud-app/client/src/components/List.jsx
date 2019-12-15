import React from 'react';

class List extends React.PureComponent {
	render() {
		const { values } = this.props;
		return <ul>
			{values.map(
				(item) => <li key={item._id}>Title:"{item.title}". Body: "{item.body}". My id is: "{item._id}"</li>,
			)}
		</ul>;
	}
}

export default List;