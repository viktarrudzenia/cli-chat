import React, { useState } from 'react';

const ENTER = 13;

export default function InputForPost({ onEnter }) {
	const [data, setData] = useState('');
	const regExpForBody = /^[^,]+/;
	const regExpForTitle = /[^,]+$/;

	return <div>
		Post (body, title = body):
	<input placeholder="Type here..."
			onChange={(e) => {
				setData(e.target.value);
			}}
			onKeyDown={(e) => {
				if (e.keyCode === ENTER) {
					if (regExpForBody.exec(data) !== null && regExpForTitle.exec(data) !== null) {
						const onEnterBody = (data.match(regExpForBody)[0]);
						const onEnterTitle = (data.match(regExpForTitle)[0]);
						onEnter(onEnterBody, onEnterTitle);
					} else {
						onEnter(data);
					}
					setData('');
					e.target.value = '';
				}
			}}
		/>
	</div>;
}
