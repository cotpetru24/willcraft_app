import styles from "../common/styles"

const SectionListItem = ({ buttonsDisabled, data, onRemove, onEdit }) => {
    return (
        <div className="section-list-item-container">
            <div className="section-list-item-group">
                <h5>Name: {data.title} {data.fullLegalName}</h5>
            </div>
            <div className="section-list-item-group">
                <h5>Address: {data.fullAddress}</h5>
            </div>
            <div className="section-list-item-group">
                <h5>Date of birth: {data.dob}</h5>
            </div>
            <div className="section-list-item-btns-container">
                <button
                    className="section-list-item-btn"
                    style={buttonsDisabled ? styles.disabledButton : {}}
                    disabled={buttonsDisabled}
                    onClick={onEdit}
                >Edit
                </button>
                <button
                    className="section-list-item-btn"
                    style={buttonsDisabled ? styles.disabledButton : {}}
                    disabled={buttonsDisabled}
                    onClick={onRemove}
                >Remove</button>
            </div>
        </div>
    )
}

export default SectionListItem;
