var CountryService = require("services/CountryService");

Vue.component("country-select", {

    delimiters: ["${", "}"],

    props: [
        "countryList",
        "countryNameMap",
        "selectedCountryId",
        "selectedStateId",
        "template",
        "addressType"
    ],

    data()
    {
        return {
            stateList  : [],
            selectedCountry: {}
        };
    },

    computed: Vuex.mapState({
        shippingCountryId: state => state.localization.shippingCountryId
    }),

    /**
     * Get the shipping countries
     */
    created()
    {
        this.$options.template = this.template;

        CountryService.translateCountryNames(this.countryNameMap, this.countryList);
        CountryService.sortCountries(this.countryList);
    },

    methods: {
        /**
         * Method to fire when the country has changed
         */
        countryChanged(value)
        {
            this.$emit("country-changed", parseInt(value));
            this.$emit("state-changed", null);
        },

        /**
         * @param {*} value
         */
        stateChanged(value)
        {
            this.$emit("state-changed", parseInt(value));
        },

        /**
         * @param countryId
         * @returns {*}
         */
        getCountryById(countryId)
        {
            return this.countryList.find(
                function(country)
                {
                    if (country.id === countryId)
                    {
                        return country;
                    }

                    return null;
                });
        }
    },

    watch: {
        selectedCountryId()
        {
            const countryId = this.selectedCountryId || this.shippingCountryId;

            this.selectedCountry = this.getCountryById(countryId);

            if (this.selectedCountry)
            {
                this.stateList = CountryService.parseShippingStates(this.countryList, countryId);

                this.$emit("selected-country-changed", this.selectedCountry);
            }
        }
    }
});
