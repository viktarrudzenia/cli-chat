import React, { useState } from 'react';

export default function InputForPostSumbit( props ) {
	const [postBody, setPostBody] = useState("");
	const [postTitle, setPostTitle] = useState("");

	const handlePost = (evt) => {
		evt.preventDefault();
		props.post(postBody, postTitle);
		setPostBody("");
		setPostTitle("");
	}

	return <div>

	<form onSubmit={handlePost}>
		<label>
			Title:
				<input placeholder="Type title here..."
				type="text"
				value={postTitle}
				onChange={e => setPostTitle(e.target.value)}
			/>
		</label>
		<label>
			Body:
				<input placeholder="Type body here..."
				type="text"
				value={postBody}
				onChange={e => setPostBody(e.target.value)}
			/>
		</label>
		<input type="submit" value="Post data" />
	</form>
</div>
}