export const ListItem = ({ name, dob, address }) => {

    return (
        <>

            <section>
                <div className="list-item-container">
                    <div className="list-item-group">
                        <h5>Name:{name}</h5>
                    </div>


                <div className="list-item-group">
                    <h5>Date of birth:{dob}</h5>
                    <p>{dob}</p>
                </div>

                <div className="list-item-group">
                    <h5>Address:{address}</h5>
                </div>
                <div className="list-item-btns-container">
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
                </div>
            </section>
        </>
    )
}

export default ListItem;