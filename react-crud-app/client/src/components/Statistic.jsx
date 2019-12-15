import React from 'react';

export default function Statistic({ peoples }) {
	return <div>
		<div>
			{console.log('before STATISTIC', peoples)}
			Length more then
			10: {peoples.filter(({ title }) => title.length > 10).length}
			{console.log('after STATISTIC', peoples)}
		</div>
	</div>;
}