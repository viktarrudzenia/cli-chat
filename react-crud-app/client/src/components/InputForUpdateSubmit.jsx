import React, { useState } from 'react';

export default function InputForUpdateSubmit( props ) {
	const [updateId, setUpdateId] = useState("");
	const [updateTitle, setUpdateTitle] = useState("");
	const [updateBody, setUpdateBody] = useState("");

	const handleUpdate = (evt) => {
		evt.preventDefault();
		props.update(updateId, updateTitle, updateBody);
        setUpdateId("");
        setUpdateTitle("");
		setUpdateBody("");
	}

	return <div>
	<form onSubmit={handleUpdate}>
		<label>
			Id:
				<input placeholder="Type id here..."
				type="text"
				value={updateId}
				onChange={e => setUpdateId(e.target.value)}
			/>
		</label>
        <label>
			New title:
				<input placeholder="Type new title here..."
				type="text"
				value={updateTitle}
				onChange={e => setUpdateTitle(e.target.value)}
			/>
		</label>
		<label>
			New body:
				<input placeholder="Type new body here..."
				type="text"
				value={updateBody}
				onChange={e => setUpdateBody(e.target.value)}
			/>
		</label>
		<input type="submit" value="Update data" />
	</form>
</div>
}