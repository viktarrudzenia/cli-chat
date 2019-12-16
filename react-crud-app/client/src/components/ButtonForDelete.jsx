import React from 'react';

class ButtonForDelete extends React.PureComponent {
    render() {
        const { name, func, id } = this.props;
        const deleteById = () => {
            func(id);
        }
        return  <button onClick={deleteById}>
                    {name}
                </button>
    }
}

export default ButtonForDelete;