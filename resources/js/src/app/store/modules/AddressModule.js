// import ApiService from "services/ApiService";

const state =
    {
        billingAddressId: null,
        billingAddressList: [],
        deliveryAddressId: null,
        deliveryAddressList: []
    };

const mutations =
    {
        setBillingAddressList(state, billingAddressList)
        {
            if (Array.isArray(billingAddressList))
            {
                state.billingAddressList = billingAddressList;
            }
        },

        setBillingAddressId(state, billingAddressId)
        {
            if (billingAddressId)
            {
                state.billingAddressId = billingAddressId;
            }
        },

        setDeliveryAddressList(state, deliveryAddressList)
        {
            if (Array.isArray(deliveryAddressList))
            {
                state.deliveryAddressList = deliveryAddressList;
            }
        },

        setDeliveryAddressId(state, deliveryAddressId)
        {
            if (deliveryAddressId)
            {
                state.deliveryAddressId = deliveryAddressId;
            }
        },

        removeBillingAddress(state, billingAddress)
        {
            const index = state.billingAddressList.indexOf(billingAddress);

            if (index !== -1)
            {
                state.billingAddressList.splice(index, 1);
            }
        },

        removeDeliveryAddress(state, deliveryAddress)
        {
            const index = state.deliveryAddressList.indexOf(deliveryAddress);

            if (index !== -1)
            {
                state.deliveryAddressList.splice(index, 1);
            }
        },

        addBillingAddress(state, billingAddress, index)
        {
            if (billingAddress)
            {
                if (index)
                {
                    state.billingAddressList.splice(index, 0, billingAddress);
                }
                else
                {
                    state.billingAddressList.push(billingAddress);
                }
            }
        },

        addDeliveryAddress(state, deliveryAddress, index)
        {
            if (deliveryAddress)
            {
                if (index)
                {
                    state.deliveryAddressList.splice(index, 0, deliveryAddress);
                }
                else
                {
                    state.deliveryAddressList.push(deliveryAddress);
                }
            }
        }
    };

const actions =
    {
        setBillingAddress({commit}, {id, addressList})
        {
            commit("setBillingAddressList", addressList);
            commit("setBillingAddressId", id);
        },

        setDeliveryAddress({commit}, {id, addressList})
        {
            commit("setDeliveryAddressList", addressList);
            commit("setDeliveryAddressId", id);
        },

        selectAddress({dispatch}, {selectedAddressId, addressType})
        {
            if (addressType === "1")
            {
                return dispatch("selectBillingAddress", selectedAddressId);
            }
            else if (addressType === "2")
            {
                return dispatch("selectDeliveryAddress", selectedAddressId);
            }

            return new Promise();
        },

        selectBillingAddress({commit}, selectedAddressId)
        {
            return new Promise((resolve, reject) =>
            {
                // TODO add call to set address
                commit("setBillingAddressId", selectedAddressId);
            });
        },

        selectDeliveryAddress({commit}, selectedAddressId)
        {
            return new Promise((resolve, reject) =>
            {
                // TODO add call to set address
                commit("setDeliveryAddressId", selectedAddressId);
            });
        },

        deleteAddress({dispatch}, {address, addressType})
        {
            if (addressType === "1")
            {
                return dispatch("deleteBillingAddress", address);
            }
            else if (addressType === "2")
            {
                return dispatch("deleteDeliveryAddress", address);
            }

            return new Promise();
        },

        deleteBillingAddress({commit, state}, billingAddress)
        {
            return new Promise((resolve, reject) =>
            {
                // ADD when delete failed const index = state.billingAddressList.indexOf(billingAddress);

                commit("removeBillingAddress", billingAddress);
                resolve();
            });
        },

        deleteDeliveryAddress({commit, state}, deliveryAddress)
        {
            return new Promise((resolve, reject) =>
            {
                // ADD when delete failed const index = state.deleteAddressList.indexOf(deliveryAddress);

                commit("removeDeliveryAddress", deliveryAddress);
                resolve();
            });
        }
    };

const getters =
    {
    };

export default
{
    state,
    mutations,
    actions,
    getters
};
