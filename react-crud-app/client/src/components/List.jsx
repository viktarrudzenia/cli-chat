import React from 'react';
import ButtonForDelete from './ButtonForDelete';
import Input from './Input';


class List extends React.PureComponent {
	render() {
		const { values, deleteData, updateData } = this.props;
		return <ol className="all_data--list">
			{values.map(
				(item) => <li className="all_data--item" key={item._id}>
					<div>My title is: "{item.title}".</div>
					<div>My body is: "{item.body}".</div>
					<div>My id is: "{item._id}"</div>
					<div>Update: <Input onEnter={(body) => updateData(item._id, body)}/></div>
					<div>Delete Button: <ButtonForDelete name="Delete Me" func={deleteData} id={item._id}/></div>
				</li>,
			)}
		</ol>;
	}
}

export default List;