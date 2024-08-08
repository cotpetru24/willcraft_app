import OrderNavigation from "../CreatigOrderNavigation";
import constants from "../../../common/constants";
import AddressAutocomplete from "../../Common/AddressAutocomplete";
import DateInput from "../../Common/DateInput";
import SectionListItem from "../../SectionListItem";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import styles from "../../../common/styles";
import { updateCurrentOrderSlice, updateOrderThunk } from "../../../features/currentOrder/currentOrderSlice";
import { updateAssetsSlice, createAssetThunk, updateAssetThunk } from "../../../features/orderAssets/orderAssetsSlice";
import { updateAdditionalBeneficiariesSlice } from "../../../features/people/additionalBeneficiaries/additionalBeneficiariesSlice";
import additionalBeneficiaryThunks from "../../../features/people/additionalBeneficiaries/additionalBeneficiariesThunks";

const AssetsDistribution = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentOrder = useSelector(state => state.currentOrder);
    const assets = useSelector(state => state.assets);
    const additionalBeneficiaries = useSelector(state => state.additionalBeneficiaries);

    const spouseOrPartner = useSelector(state => state.spouseOrPartner);
    const kids = useSelector(state => state.kids);
    // const family = [].concat(spouseOrPartner, kids);

    const [receivingAmount, setReceivingAmount] = useState('');

    const [family, setFamily] = useState([]);

    useEffect(() => {
        const updatedFamily = currentOrder.peopleAndRoles
            .filter(p =>
                p.role.includes('partner')
                || p.role.includes('kid')
                || p.role.includes('spouse')
                || p.role.includes('additional beneficiary'));
        setFamily(updatedFamily);
    }, [currentOrder.peopleAndRoles, currentOrder]);




    const [showAdditionalBeneficiaryForm, setShowAdditionalBeneficiaryForm] = useState(false);
    const [editAdditionalBeneficiaryIndex, setEditAdditionalBeneficiaryIndex] = useState(null);

    const savedAdditionalBeneficiariesData = useRef(null);
    const savedCurrentOrderData = useRef(null);

    let additionalBeneficiary;

    const [additionalBeneficiaryFormData, setAdditionalBeneficiaryFormData] = useState({
        _id: '',
        title: '',
        fullLegalName: '',
        fullAddress: '',
        dob: '',
        email: '',
        tel: '',
        assetId: '' // Add assetId to track which asset this beneficiary belongs to
    });

    useEffect(() => {
        if (additionalBeneficiary) {
            setAdditionalBeneficiaryFormData({
                _id: additionalBeneficiaryFormData._id || '',
                title: additionalBeneficiaryFormData.title || '',
                fullLegalName: additionalBeneficiaryFormData.fullLegalName || '',
                fullAddress: additionalBeneficiaryFormData.fullAddress || '',
                dob: additionalBeneficiaryFormData.dob || '',
                email: additionalBeneficiaryFormData.email || '',
                tel: additionalBeneficiaryFormData.tel || '',
                assetId: additionalBeneficiaryFormData.assetId || '' // Include assetId in the form data
            });
        }

        if (!savedAdditionalBeneficiariesData.current) {
            savedAdditionalBeneficiariesData.current = JSON.parse(JSON.stringify(assets));
        }
        if (!savedCurrentOrderData.current) {
            savedCurrentOrderData.current = JSON.parse(JSON.stringify(currentOrder))
        }
    }, [additionalBeneficiaryFormData, assets]);

    const handleShowAdditionalBeneficiaryForm = () => {
        setAdditionalBeneficiaryFormData((prevData) => ({
            ...prevData,
        }));
        setShowAdditionalBeneficiaryForm(prevState => !prevState);
    };

    // const handleOnChange = (e) => {
    //     const { name, value } = e.target;
    //     setAdditionalBeneficiaryFormData((prevData) => ({
    //         ...prevData,
    //         [name]: value
    //     }));
    // };





    // const handleOnChange = (event, personId, assetIndex) => {
    //     const { value } = event.target;

    //     // Update the distribution array for the specific asset
    //     const updatedAssets = assets.map((asset, index) => {
    //         if (index === assetIndex) {
    //             const updatedDistribution = asset.distribution.map(distribution => {
    //                 if (distribution.personId=== personId) {
    //                     return {
    //                         ...distribution,
    //                         receivingAmount: value,
    //                     };
    //                 }
    //                 return distribution;
    //             });
    //             return {
    //                 ...asset,
    //                 distribution: updatedDistribution,
    //             };
    //         }
    //         return asset;
    //     });

    //     // Dispatch the updated assets
    //     dispatch(updateAssetsSlice(updatedAssets));
    // };



    // const handleOnChange = (event, assetIndex, personId) => {
    //     if (!event || !event.target) {
    //         console.error("Event is undefined or target is missing");
    //         return;
    //     }

    //     const { value } = event.target;

    //     // Use the assetIndex and personId to update the correct asset's distribution
    //     const updatedAssets = assets.map((asset, index) => {
    //         if (index === assetIndex) {
    //             const updatedDistribution = asset.distribution.map(dist => {
    //                 if (dist.personId._id === personId) {
    //                     return { ...dist, receivingAmount: value };
    //                 }
    //                 return dist;
    //             });
    //             return { ...asset, distribution: updatedDistribution };
    //         }
    //         return asset;
    //     });

    //     dispatch(updateAssetsSlice(updatedAssets));
    // };


    // const handleOnChange = (event, assetIndex, personId) => {
    //     if (!event || !event.target) {
    //         console.error("Event is undefined or target is missing");
    //         return;
    //     }

    //     const { value } = event.target;

    //     // Update the local state first to reflect changes immediately in the UI
    //     setReceivingAmount(value);

    //     // Use the assetIndex and personId to update the correct asset's distribution
    //     const updatedAssets = assets.map((asset, index) => {
    //         if (index === assetIndex) {
    //             const updatedDistribution = asset.distribution.map(dist => {
    //                 if (dist.personId._id === personId) {
    //                     return { ...dist, receivingAmount: value };
    //                 }
    //                 return dist;
    //             });
    //             return { ...asset, distribution: updatedDistribution };
    //         }
    //         return asset;
    //     });

    //     // Dispatch the updated assets to the Redux slice
    //     dispatch(updateAssetsSlice(updatedAssets));
    // };

    // const handleOnChange = (value, assetIndex, personId) => {
    //     const updatedAssets = assets.map((asset, index) => {
    //         if (index === assetIndex) {
    //             const updatedDistribution = asset.distribution.map(dist => {
    //                 if (dist.personId._id === personId) {
    //                     return { ...dist, receivingAmount: value };
    //                 }
    //                 return dist;
    //             });
    //             return { ...asset, distribution: updatedDistribution };
    //         }
    //         return asset;
    //     });

    //     dispatch(updateAssetsSlice(updatedAssets));
    // };

// AssetsDistribution.js

// const handleOnChange = (value, assetIndex, personId) => {
//     const updatedAssets = assets.map((asset, index) => {
//         if (index === assetIndex) {
//             const updatedDistribution = asset.distribution.map(dist => {
//                 if (dist.personId._id === personId) {
//                     return { ...dist, receivingAmount: value };
//                 }
//                 return dist;
//             });
//             return { ...asset, distribution: updatedDistribution };
//         }
//         return asset;
//     });

//     dispatch(updateAssetsSlice(updatedAssets));

//     // Update current order
//     const updatedAssetsAndDistribution = updatedAssets.map(asset => ({
//         assetId: asset._id || asset.assetId,
//         distribution: asset.distribution.map(dist => ({
//             personId: dist.personId._id ? dist.personId._id : dist.personId,
//             receivingAmount: dist.receivingAmount || 'percentage here'
//         }))
//     }));

//     const updatedOrder = {
//         ...currentOrder,
//         assetsAndDistribution: updatedAssetsAndDistribution
//     };

//     dispatch(updateCurrentOrderSlice(updatedOrder));
// };
const handleOnChange = (value, assetIndex, personId) => {
    console.log(`handleOnChange called with value: ${value}, assetIndex: ${assetIndex}, personId: ${personId}`);

    const updatedAssets = assets.map((asset, index) => {
        if (index === assetIndex) {
            const updatedDistribution = asset.distribution.map(dist => {
                if (dist.personId=== personId) {
                    console.log(`Updating receivingAmount for personId: ${personId} to value: ${value}`);
                    return { ...dist, receivingAmount: value };
                }
                return dist;
            });
            return { ...asset, distribution: updatedDistribution };
        }
        return asset;
    });

    console.log('Updated assets:', updatedAssets);
    dispatch(updateAssetsSlice(updatedAssets));

    // Update current order
    const updatedAssetsAndDistribution = updatedAssets.map(asset => ({
        assetId: asset._id || asset.assetId,
        distribution: asset.distribution.map(dist => ({
            personId: dist.personId._id ? dist.personId._id : dist.personId,
            receivingAmount: dist.receivingAmount || 'percentage here'
        }))
    }));

    const updatedOrder = {
        ...currentOrder,
        assetsAndDistribution: updatedAssetsAndDistribution
    };

    console.log('Updated order:', updatedOrder);
    dispatch(updateCurrentOrderSlice(updatedOrder));
};













    const handleAdditionalBeneficiaryFormAdd = async (e) => {
        e.preventDefault();

        if (editAdditionalBeneficiaryIndex !== null) {
            const updatedAdditionalBeneficiaries = additionalBeneficiaries.map((beneficiary, index) =>
                index === editAdditionalBeneficiaryIndex ? additionalBeneficiaryFormData : beneficiary
            );

            dispatch(updateAdditionalBeneficiariesSlice(updatedAdditionalBeneficiaries));
            setEditAdditionalBeneficiaryIndex(null);
        } else {

            const createAdditionalBeficiaryResponse = await dispatch(
                additionalBeneficiaryThunks.createAdditionalBeficiaryThunk(additionalBeneficiaryFormData)).unwrap();

            const updatedBeneficiaries = [...additionalBeneficiaries, { personId: createAdditionalBeficiaryResponse }];
            await dispatch(updateAdditionalBeneficiariesSlice(updatedBeneficiaries));

            const updatedOrder = {
                ...currentOrder,
                peopleAndRoles: [
                    ...currentOrder.peopleAndRoles.filter(pr => !pr.role.includes('additional beneficiary')),
                    ...updatedBeneficiaries.map(beneficiary => ({
                        personId: beneficiary.personId,
                        role: ['additional beneficiary']
                    }))
                ]

            };

            // Update the order in the backend
            await dispatch(updateOrderThunk(updatedOrder));
            // Update the currentOrder slice
            await dispatch(updateCurrentOrderSlice(updatedOrder));
        }

        resetAdditionalBeneficiaryForm();
        setShowAdditionalBeneficiaryForm(false);
    };

    const resetAdditionalBeneficiaryForm = () => {
        setAdditionalBeneficiaryFormData({
            _id: '',
            title: '',
            fullLegalName: '',
            fullAddress: '',
            dob: '',
            email: '',
            tel: '',
            assetId: ''
        });
        setEditAdditionalBeneficiaryIndex(null);
    };


    const handleRemoveAdditionalBeneficiary = (index) => {
        const updatedAdditionalBeneficiaries = additionalBeneficiaries.filter((_, i) => i !== index);
        dispatch(updateAdditionalBeneficiariesSlice(updatedAdditionalBeneficiaries));
    };

    const handleEditAdditionalBeneficiary = (index) => {
        const beneficiaryToEdit = additionalBeneficiaries[index];
        setAdditionalBeneficiaryFormData({
            _id: beneficiaryToEdit._id || '',
            title: beneficiaryToEdit.title || '',
            fullLegalName: beneficiaryToEdit.fullLegalName || '',
            fullAddress: beneficiaryToEdit.fullAddress || '',
            dob: beneficiaryToEdit.dob || '',
            email: beneficiaryToEdit.email || '',
            tel: beneficiaryToEdit.tel || '',
            assetId: beneficiaryToEdit.assetId || ''
        });
        setEditAdditionalBeneficiaryIndex(index);
        setShowAdditionalBeneficiaryForm(true);
    };

    const handleSaveAndContinue = async (e) => {
        e.preventDefault();

        // const updatedAssets = [];

        // for (const asset of assets) {
        //     let response;
        //     if (asset._id) {
        //         response = await dispatch(updateAssetThunk(asset)).unwrap();
        //     } else {
        //         response = await dispatch(createAssetThunk(asset)).unwrap();
        //     }
        //     updatedAssets.push({
        //         ...asset,
        //         _id: response._id
        //     });
        // }

        // await dispatch(updateAssetsSlice(updatedAssets));

        // const updatedOrder = {
        //     ...currentOrder,
        //     assetsAndDistribution: updatedAssets.map(asset => ({
        //         assetId: asset._id,
        //         assetDistribution: asset.distribution || []
        //     }))
        // };

        // await dispatch(updateCurrentOrderSlice(updatedOrder));
        // await dispatch(updateOrderThunk(currentOrder));

        navigate('/creatingOrder');
    };

    const handleBack = () => {
        if (savedAdditionalBeneficiariesData.current) {
            dispatch(updateAdditionalBeneficiariesSlice(savedAdditionalBeneficiariesData.current));
        }
        if (savedCurrentOrderData.current) {
            dispatch(updateCurrentOrderSlice(savedCurrentOrderData.current));
            console.log(`dispatched update current order slice`);
        }
        navigate('/creatingOrder');
    };

    const handlePlaceSelected = (address) => {
        setAdditionalBeneficiaryFormData((prevData) => ({
            ...prevData,
            fullAddress: address
        }));
    };




    const handleBeneficiaryChecked = (personIndex, assetIndex, isChecked) => {
        const familyBeneficiary = family[personIndex];
        const assetToUpdate = assets[assetIndex];

        console.log(`asset distribution => Handling beneficiary check: ${isChecked}, Person: ${familyBeneficiary.personId.fullLegalName}, Asset: ${assetToUpdate.assetType}`);





        // Update the peopleAndRoles array in currentOrder
        let updatedPeopleAndRoles = currentOrder.peopleAndRoles.map(personRole => {
            if (personRole.personId._id === familyBeneficiary.personId._id) {
                if (isChecked) {
                    return {
                        ...personRole,
                        role: personRole.role.includes('beneficiary') ? personRole.role : [...personRole.role, 'beneficiary']
                    };
                } else {
                    // Check if the person is a beneficiary for any other asset
                    const isBeneficiaryForOtherAssets = currentOrder.assetsAndDistribution.some(asset =>
                        asset.distribution.some(dist => {
                            const distPersonId = typeof dist.personId === 'object' ? dist.personId._id : dist.personId;
                            return distPersonId === familyBeneficiary.personId._id && asset.assetId._id !== assetToUpdate._id;
                        })
                    );

                    console.log(`Is ${familyBeneficiary.personId.fullLegalName} a beneficiary for other assets?`, isBeneficiaryForOtherAssets);

                    if (!isBeneficiaryForOtherAssets) {
                        return {
                            ...personRole,
                            role: personRole.role.filter(role => role !== 'beneficiary')
                        };
                    }
                }
            }
            return personRole;
        });





        // console.log(`Updated people and roles: ${JSON.stringify(updatedPeopleAndRoles)}`);

        // Update the distribution array for the asset
        let updatedDistribution;
        if (isChecked) {
            console.log(`is checked in assets distribution`)
            // Add person to distribution if not already present
            if (!assetToUpdate.distribution.some(d => d.personId._id === familyBeneficiary.personId._id)) {
                console.log(`person is not in the asset distribution, person will be now added`)
                updatedDistribution = [...assetToUpdate.distribution, {
                    personId: familyBeneficiary.personId._id,
                    title: familyBeneficiary.personId.title,
                    fullLegalName: familyBeneficiary.personId.fullLegalName,
                    fullAddress: familyBeneficiary.personId.fullAddress,
                    dob: familyBeneficiary.personId.dob,
                    email: familyBeneficiary.personId.email || '',
                    tel: familyBeneficiary.personId.tel || '',
                    receivingAmount: "percentage here"
                }];
            } else {
                updatedDistribution = assetToUpdate.distribution;
            }
        }



        else {
            // Remove person from distribution
            console.log(`should have removed the person with id= ${familyBeneficiary.personId._id} from --------- ${JSON.stringify(assetToUpdate.distribution)}`)
            updatedDistribution = assetToUpdate.distribution.filter(d => {
                const distPersonId = typeof d.personId === 'object' ? d.personId._id : d.personId;
                return distPersonId !== familyBeneficiary.personId._id;
            });
            console.log(`this should have the person removed ${JSON.stringify(updatedDistribution)}`)
        }



        // console.log(`Updated distribution: ${JSON.stringify(updatedDistribution)}`);

        // Create the updated asset object
        const updatedAsset = { ...assetToUpdate, distribution: updatedDistribution };

        // Update the assets array
        const updatedAssets = assets.map((asset, index) => index === assetIndex ? updatedAsset : asset);

        // console.log(`Updated assets: ${JSON.stringify(updatedAssets)}`);

        // Update the assetsAndDistribution in currentOrder
        const updatedCurrentOrderAssetDistribution = currentOrder.assetsAndDistribution.map(asset => {
            console.log(`asset distribution should have been updated`)
            if (asset.assetId._id === assetToUpdate._id) {
                return {
                    ...asset,
                    distribution: updatedDistribution
                };
            }
            return asset;
        });

        // console.log(`Updated current order asset distribution: ${JSON.stringify(updatedCurrentOrderAssetDistribution)}`);

        // Dispatch the updated assets slice
        dispatch(updateAssetsSlice(updatedAssets));

        // Dispatch the updated current order slice
        dispatch(updateCurrentOrderSlice({
            ...currentOrder,
            peopleAndRoles: updatedPeopleAndRoles,
            assetsAndDistribution: updatedCurrentOrderAssetDistribution
        }));

        console.log('Dispatched updated state');
    };





    return (
        <>
            <section className="section-container">
                <div>
                    <div className="creatingOrder-section-heading-container">
                        <h1>Assets distribution</h1>
                    </div>
                    <div className="has-children-container">
                        <div>
                            <h4>Please select or/and add the people to receive the assets and their share.</h4>
                        </div>
                    </div>
                </div>
                <>
                    <div className="section-content-container">
                        <div className="section-controll-container">
                            <div className="section-list-container">


                                {additionalBeneficiaries.length > 0 && (
                                    <>
                                        <h4> Additional beneficiaries</h4>
                                        {additionalBeneficiaries.map((person, personIndex) => (
                                            <SectionListItem
                                                key={`person-${personIndex}`}
                                                buttonsDisabled={showAdditionalBeneficiaryForm}
                                                data={{ ...person.personId, role: 'additional beneficiary' }}
                                                onRemove={() => handleRemoveAdditionalBeneficiary(personIndex)}
                                                onEdit={() => handleEditAdditionalBeneficiary(personIndex)}
                                                section="assetDistribution-additionalBeneficiary"
                                            />
                                        ))}
                                    </>
                                )}
                                <button
                                    className="section-add-btn"
                                    onClick={() => handleShowAdditionalBeneficiaryForm()}
                                    style={showAdditionalBeneficiaryForm ? styles.disabledButton : {}}
                                    disabled={showAdditionalBeneficiaryForm}
                                >
                                    +Add Beneficiary
                                </button>



                                {assets.map((asset, assetIndex) => (
                                    <div className="asset-distribution-container" key={`asset-${assetIndex}`}>
                                        <SectionListItem
                                            buttonsDisabled={showAdditionalBeneficiaryForm}
                                            data={asset}
                                            onRemove={() => handleRemoveAdditionalBeneficiary(assetIndex)}
                                            onEdit={() => handleEditAdditionalBeneficiary(assetIndex)}
                                            section="assetsDistribution-asset"
                                        />
                                        {family.map((person, personIndex) => (
                                            <SectionListItem
                                                key={`asset-${assetIndex}-person-${personIndex}`}
                                                buttonsDisabled={showAdditionalBeneficiaryForm}
                                                data={person.personId}
                                                onRemove={() => handleRemoveAdditionalBeneficiary(personIndex)}
                                                onEdit={() => handleEditAdditionalBeneficiary(personIndex)}
                                                onChecked={(isChecked) => handleBeneficiaryChecked(personIndex, assetIndex, isChecked)}
                                                section="assetDistribution-beneficiary"
                                                asset={asset}
                                                onChange={handleOnChange} // Pass the handleOnChange function
                                                assetIndex={assetIndex} // Pass the asset index
                                            />
                                        ))}

                                    </div>
                                ))}
                            </div>
                            <div className="sectio-add-btn-container">
                            </div>
                        </div>
                        {showAdditionalBeneficiaryForm && (
                            <div className="section-form-container">
                                <form onSubmit={handleAdditionalBeneficiaryFormAdd}>
                                    <div className="form-main-container">
                                        <div className="form-title-and-fullName-container">
                                            <div className="name-group">
                                                <label htmlFor="title">Title</label>
                                                <select
                                                    id="title"
                                                    name="title"
                                                    value={additionalBeneficiaryFormData.title}
                                                    onChange={handleOnChange}
                                                    required
                                                >
                                                    {Object.values(constants.title).map((title, index) => (
                                                        <option key={index} value={title}>
                                                            {title}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="name-group">
                                                <label htmlFor="fullLegalName">Full legal name</label>
                                                <input
                                                    type="text"
                                                    className="fullLegalName"
                                                    id="fullLegalName"
                                                    name="fullLegalName"
                                                    value={additionalBeneficiaryFormData.fullLegalName}
                                                    onChange={handleOnChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="fullAddress">Full address</label>
                                            <AddressAutocomplete
                                                name="fullAddress"
                                                value={additionalBeneficiaryFormData.fullAddress}
                                                onPlaceSelected={handlePlaceSelected}
                                                handleInputChange={handleOnChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="dob">Date of Birth</label>
                                            <DateInput
                                                id="dob"
                                                name="dob"
                                                value={additionalBeneficiaryFormData.dob}
                                                onChange={handleOnChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email (optional)</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={additionalBeneficiaryFormData.email}
                                                onChange={handleOnChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="tel">Phone Number (optional)</label>
                                            <input
                                                type="tel"
                                                id="tel"
                                                name="tel"
                                                value={additionalBeneficiaryFormData.tel}
                                                onChange={handleOnChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-btns-container">
                                        <button
                                            className="form-btn"
                                            type="button"
                                            onClick={() => {
                                                handleShowAdditionalBeneficiaryForm();
                                                resetAdditionalBeneficiaryForm();
                                            }}
                                        >Cancel</button>
                                        <button
                                            className="form-btn"
                                            type="submit"
                                        >{editAdditionalBeneficiaryIndex !== null ? "Update" : "Add"}</button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </>
                <>
                    <div className="section-navigation-container">
                        <OrderNavigation
                            onBack={handleBack}
                            onSaveAndContinue={handleSaveAndContinue}
                            buttonsDisabled={showAdditionalBeneficiaryForm}
                        />
                    </div>
                </>
            </section>
        </>
    );
}

export default AssetsDistribution;

