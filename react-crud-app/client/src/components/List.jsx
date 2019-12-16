import React from 'react';
import Button from './Button';


class List extends React.PureComponent {
	render() {
		const { values, deleteData } = this.props;
		return <ol>
			{values.map(
				(item) => <li key={item._id}>
					My body is: "{item.body}". My id is: "{item._id}"
					{/* <button>Update Me</button> */}
					<Button name="Delete Me" func={deleteData} id={item._id}/>
				</li>,
			)}
		</ol>;
	}
}

export default List;