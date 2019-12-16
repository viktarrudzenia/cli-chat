import React from 'react';
import ButtonForDelete from './ButtonForDelete';
import Input from './Input';


class List extends React.PureComponent {
	render() {
		const { values, deleteData, updateData } = this.props;
		return <ol>
			{values.map(
				(item) => <li key={item._id}>
					My body is: "{item.body}". My id is: "{item._id}"
					Update: <Input onEnter={(body) => updateData(item._id, body)}/>
					Delete Button: <ButtonForDelete name="Delete Me" func={deleteData} id={item._id}/>
				</li>,
			)}
		</ol>;
	}
}

export default List;