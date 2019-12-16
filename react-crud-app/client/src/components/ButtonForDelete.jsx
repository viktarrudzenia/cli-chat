import React from 'react';

class ButtonForDelete extends React.PureComponent {
    render() {
        const { name, func, id } = this.props;
        const deleteById = () => {
            func(id);
        }
        return  <button className="all_data--item_button" onClick={deleteById}>
                    {name}
                </button>
    }
}

export default ButtonForDelete;