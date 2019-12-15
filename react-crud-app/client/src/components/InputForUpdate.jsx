import React, { useState } from 'react';

const ENTER = 13;

export default function InputForDelete({ onEnter }) {
	const [data, setData] = useState('');
	const regExpForId = /^[\d\w]+/;
	const regExpForBody = /(?<=[\d\w]+, )[\s\S]+/;

	return <input
		onChange={(e) => {
			setData(e.target.value);
		}}
		onKeyDown={(e) => {
			if (e.keyCode === ENTER) {
				if (regExpForId.exec(data) !== null && regExpForBody.exec(data) !== null) {
					const onEnterId = (data.match(regExpForId)[0]);
					const onEnterBody = (data.match(regExpForBody)[0]);
					onEnter(onEnterId, onEnterBody);
				} else {
					console.log('wrong format, you must put in "id, body"')
				}
				setData('');
				e.target.value = '';
			}
		}}
	/>;
}
