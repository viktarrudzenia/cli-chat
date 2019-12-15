import React, { useState } from 'react';

const ENTER = 13;

export default function InputForDelete ({ onEnter }) {
	const [data, setData] = useState('');

	return <input
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
