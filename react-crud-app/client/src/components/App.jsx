import React, { useEffect } from 'react';
import { connect } from 'react-redux'

import List from './List';
import Input from './Input';
import Header from './Header';

import { addPeople, fetchPeople } from '../actions';

function App ({ addPeople, fetchPeople, peoples }) {
	useEffect(() => {
		fetchPeople();
	}, [fetchPeople]);

	useEffect(() => {
		console.log(peoples);
	}, [peoples]);

	return <div>
		<Header/>
		<Input onEnter={(data) => addPeople(data)}/>
		<List values={peoples}/>
	</div>;
}

const mapStateToProps = (state) => ({
	peoples: state,
});

const mapDispatchToProps = {
	addPeople,
	fetchPeople,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(App);















