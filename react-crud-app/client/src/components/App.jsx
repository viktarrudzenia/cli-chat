import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'

import List from './List';
import Header from './Header';
import Input from './Input';
import InputForPost from './InputForPost';
import InputForPostSubmit from './InputForPostSubmit';
import InputForUpdate from './InputForUpdate';

import './App.css'

import { expectDeleteByIdFromBD, expectGetAllDataFromBD, expectPostDataToBD, expectUpdateDataByIdFromBD, fetchDataById } from '../actions';

function App({ expectDeleteByIdFromBD, expectGetAllDataFromBD, peoples, expectPostDataToBD, expectUpdateDataByIdFromBD, fetchDataById }) {
	useEffect(() => {
		expectGetAllDataFromBD();
	}, [expectGetAllDataFromBD]);

	return <div className="all_data">
		<Header />
		<div className="all_inputs">
			<InputForPost onEnter={(body, title) => expectPostDataToBD(body, title)} />
			<InputForPostSubmit post={expectPostDataToBD} />
			<div>
				GetById (id): <Input onEnter={(id) => fetchDataById(id)} />
			</div>
			<div>
				DeleteById (id): <Input onEnter={(id) => expectDeleteByIdFromBD(id)} />
			</div>
			<InputForUpdate onEnter={(id, body) => expectUpdateDataByIdFromBD(id, body)} />
		</div>
		<List values={peoples} deleteData={expectDeleteByIdFromBD} updateData={expectUpdateDataByIdFromBD} />
	</div>;
}

const mapStateToProps = (state) => ({
	peoples: state,
});

const mapDispatchToProps = {
	expectUpdateDataByIdFromBD,
	expectDeleteByIdFromBD,
	fetchDataById,
	expectGetAllDataFromBD,
	expectPostDataToBD,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(App);