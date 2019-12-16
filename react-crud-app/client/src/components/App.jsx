import React, { useEffect } from 'react';
import { connect } from 'react-redux'

import List from './List';
import Input from './Input';
import Header from './Header';
import InputForUpdate from './InputForUpdate'

import './App.css'

import { expectDeleteByIdFromBD, expectGetAllDataFromBD, expectPostDataToBD, expectUpdateDataByIdFromBD, fetchDataById} from '../actions';

function App ({ expectDeleteByIdFromBD, expectGetAllDataFromBD, peoples , expectPostDataToBD, expectUpdateDataByIdFromBD, fetchDataById}) {
	useEffect(() => {
		expectGetAllDataFromBD();
	}, [expectGetAllDataFromBD]);

	return <div className="all_data">
		<Header/>
		<div className="all_inputs">
			<div>
				Post (body): <Input onEnter={(data) => expectPostDataToBD(data)}/>
			</div>
			<div>
				GetById (id): <Input onEnter={(id) => fetchDataById(id)}/>
			</div>
			<div>
				DeleteById (id): <Input onEnter={(id) => expectDeleteByIdFromBD(id)}/>
			</div>
			<div>
				UpdateById (id, body): <InputForUpdate onEnter={(id, body) => expectUpdateDataByIdFromBD(id, body)}/>
			</div>
		</div>
		<List values={peoples} deleteData={expectDeleteByIdFromBD} updateData={expectUpdateDataByIdFromBD}/>
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















