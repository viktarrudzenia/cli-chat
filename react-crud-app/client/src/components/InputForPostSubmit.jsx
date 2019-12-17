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
			Post title:
				<input placeholder="Type title here..."
				type="text"
				value={postTitle}
				onChange={e => setPostTitle(e.target.value)}
			/>
		</label>
		<label>
			Post body:
				<input placeholder="Type body here..."
				type="text"
				value={postBody}
				onChange={e => setPostBody(e.target.value)}
			/>
		</label>
		<input type="submit" value="Post" />
	</form>
</div>

	// return <input placeholder="Type here..."
	// 	onChange={(e) => {
	// 		setData(e.target.value);
	// 	}}
	// 	onKeyDown={(e) => {
	// 		if (e.keyCode === ENTER) {
	// 			if (regExpForBody.exec(data) !== null && regExpForTitle.exec(data) !== null) {
	// 				const onEnterBody = (data.match(regExpForBody)[0]);
	// 				const onEnterTitle = (data.match(regExpForTitle)[0]);
	// 				onEnter(onEnterBody, onEnterTitle);
	// 			} else {
    //                 onEnter(data);
	// 			}
	// 			setData('');
	// 			e.target.value = '';
	// 		}
	// 	}}
	// />;
}
