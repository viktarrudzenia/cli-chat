import React, { useEffect } from 'react';
import { connect } from 'react-redux'

import List from './List';
import Input from './Input';
import Header from './Header';
import InputForDelete from './InputForDelete';

import { addPeople, fetchPeople, addPeopleMongoDB, fetchDataById} from '../actions';

function App ({ addPeople, fetchPeople, peoples , addPeopleMongoDB, fetchDataById}) {
	useEffect(() => {
		fetchPeople();
	}, [fetchPeople]);

	useEffect(() => {
		// console.log('useEffect', peoples);
	}, [peoples]);

	return <div>
		<Header/>
		<Input onEnter={(data) => addPeopleMongoDB(data)}/>
		<Input onEnter={(id) => fetchDataById(id)}/>
		{/* <InputForDelete onEnter={(data) => addPeople(data)}/> */}
		<List values={peoples}/>
	</div>;
}

const mapStateToProps = (state) => ({
	peoples: state,
});

const mapDispatchToProps = {
	fetchDataById,
	addPeople,
	fetchPeople,
	addPeopleMongoDB,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(App);















