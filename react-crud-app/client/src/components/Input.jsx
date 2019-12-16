import React, { useState } from 'react';

const ENTER = 13;

export default function Input ({ onEnter }) {
	const [data, setData] = useState('');

	return <input placeholder="Type here..."
		onChange={(e) => {
			setData(e.target.value);
		}}
		onKeyDown={(e) => {
			if (e.keyCode === ENTER) {
				onEnter(data);
				setData('');
				e.target.value = '';
			}
		}}
	/>;
}
