const handleAdditionalBeneficiaryFormAdd = async (e) => {
    e.preventDefault();

    if (editAdditionalBeneficiaryIndex !== null) {
        const updatedAdditionalBeneficiaries = additionalBeneficiaries.map((beneficiary, index) =>
            index === editAdditionalBeneficiaryIndex ? additionalBeneficiaryFormData : beneficiary
        );

        dispatch(updateAdditionalBeneficiariesSlice(updatedAdditionalBeneficiaries));

        const assetIdToUpdate = additionalBeneficiaryFormData.assetId;
        const updatedAssets = assets.map(asset => {
            if (asset._id === assetIdToUpdate) {
                return {
                    ...asset,
                    distribution: [...(asset.distribution || []), additionalBeneficiaryFormData]
                };
            }
            return asset;
        });

        dispatch(updateAssetsSlice(updatedAssets));
        setEditAdditionalBeneficiaryIndex(null);
    } else {

        const createAdditionalBeficiaryResponse=  await dispatch(
            additionalBeneficiaryThunks.createAdditionalBeficiaryThunk(additionalBeneficiaryFormData)).unwrap();
        // const createAdditionalBeficiaryResponse = dispatch(
        //     additionalBeneficiaryThunks.createAdditionalBeficiaryThunk(additionalBeneficiaryFormData)).unwrap()
        await dispatch(updateAdditionalBeneficiariesSlice([...additionalBeneficiaries, createAdditionalBeficiaryResponse]));









        const assetIdToUpdate = additionalBeneficiaryFormData.assetId;
        const updatedAssets = assets.map(asset => {
            if (asset._id === assetIdToUpdate) {
                return {
                    ...asset,
                    distribution: [...(asset.distribution || []), createAdditionalBeficiaryResponse]
                };
            }
            return asset;
        });

        dispatch(updateAssetsSlice(updatedAssets));
    }

    resetAdditionalBeneficiaryForm();
    setShowAdditionalBeneficiaryForm(false);
};