cData = {}

var address = {
    street: "",
    city: "",
    state: ""
};

var _customerId;

$(function () {

    var $rows = $('#custTable tr');
    console.log($rows)

    $('#search').keyup(function () {

        var val = '^(?=.*\\b' + $.trim($(this).val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$',
            reg = RegExp(val, 'i'),
            text;
       
        $rows.show().filter(function () {
            text = $(this).text().replace(/\s+/g, ' ');
            return !reg.test(text);
        }).hide();
    });

    $(".hover").on("click", function () {
        var selectedRow = $(this);

        //console.log(selectedRow);
        address = new Object;

        $("#deleteDiv").show();
        $("#editDiv").hide();
        $("#btnSubmit").hide();
        $("#btnEditCustomer").show();
        $("#btnDeleteCustomer").show();
        $("#btnEditedCustomerDataSubmit").hide();

        _customerId = $(this).attr('id');
        cData.custId = _customerId;
        _customername = $(selectedRow).find("#customerName").html();
        cData.cName = _customername;
        _customerGender = $(selectedRow).find("#customerGender").html();
        cData.cGender = _customerGender;
        _customerAge = $(selectedRow).find("#customerAge").html();
        cData.cAge = _customerAge;

        _customerStreet = $(selectedRow).closest('tr').find("#customerAddress").find("#hidStreet").val()
        _customerCity = $(selectedRow).closest('tr').find("#customerAddress").find("#hidCity").val()
        _customerState = $(selectedRow).closest('tr').find("#customerAddress").find("#hidState").val()

        address.street = _customerStreet.trim() == "" ? "" : _customerStreet.trim();
        address.city = _customerCity.trim() == "" ? "" : _customerCity.trim();
        address.state = _customerState.trim() == "" ? "" : _customerState.trim();
        cData.cAddress = address;

        _customerBalance = $(selectedRow).find("#customerBalance").html();
        cData.cBalance = _customerBalance;
        _customermemberships = $(selectedRow).find("#customermemberships").html();
        cData.cMemberships = _customermemberships;

        //console.log(cData)

        $('#customerDataModal').modal();
        $('#cID').html('<p>Customer Id: <b>' + _customerId + '</b></p>');
        $('#cName').html('<p>Customer name: <b>' + _customername + '</b></p>');
        $('#cGender').html('<p>Customer gender: <b>' + _customerGender + '</b></p>');
        $('#cAge').html('<p>Customer age: <b>' + _customerAge + '</b></p>')
        $('#cAddress').html('<p>Customer address: <b>' + address.street + address.city + address.state + '</b></p>')
        $('#cBalance').html('<p>Customer balance: <b>' + _customerBalance + '</b></p>')
        $('#cMemberships').html('<p>Customer memberships: <b>' + _customermemberships + '</b></p>')
    });

    $("#btnEditCustomer").on('click', function () {
        //alert(JSON.stringify(cData));
        $("#btnEditedCustomerDataSubmit").show();
        $("#btnEditCustomer").hide();
        $("#btnDeleteCustomer").hide();
        $("#deleteDiv").hide();
        $("#editDiv").show();

        InsertSelecteValuesIntoEditFormInputElements();

    });

    $("#btnEditedCustomerDataSubmit").on('click', function () {
        SubmitEditedCustomerData();
    });

    $("#btnDeleteCustomer").on('click', function () {
        if (confirm("Are you sure?")) {
            jsonData = {};
            jsonData.custId = cData.custId;

            // initiate ajax call....
            $.ajax({
                url: 'deleteCustomer',
                type: 'POST',
                datatype: 'json',
                contentType: 'application/json',
                data: JSON.stringify(jsonData),
                success: function (data) {
                    //console.log(data)
                    checkData = $.parseJSON(data)["result"];
                    //console.log(checkData)
                    if (checkData.deleted_count > 0) {
                        window.location.reload();
                    }
                },
                error: {

                }
            });
        }
        else {
            //alert("Operation cancelled by user");
            return false;
        }
    });

    $("#addCustomerForm").validate({
        errorPlacement: function (error, element) {
            //name attrib of the field
            var n = element.attr("name");
            if (n == "firstName")
                element.attr("placeholder", "Please enter your first name");
            if (n == "lastName")
                element.attr("placeholder", "Please enter your last name");
        },
        rules: {
            'firstName': {
                required: true
            },
            'lastName': {
                required: true
            },
            'gender': {
                required: true
            }
        }
    });

    $("#btnSubmit").click(function (event) {
        $("#addCustomerForm").valid();
        if ($("#addCustomerForm").valid()) {
            submitForm(event);
        }
    });
});

/**
 * Checks that an elemenet has a non-empty 'name' and 'value' property.
 * @param  {Element} element the element to chect
 * @return {Bool} true if the element is an input, false if not
 * 
 */
const isValidElement = element => {
    return element.name && element.value;
};

/**
 * Checks if an element's value can be saved (e.g. not an unselected checkbox).
 * @param {Element} element the element to check
 * @return {Bool} true if the vakyhe shoud be added, false if not
 * 
 */
const isValidValue = element => {
    return (!['checkbox', 'radio'].includes(element.type) || element.checked);
};

/**
 * Checks if the input is a checkbox,, becuase checkboxes allow multiple values
 * @param  {ELement} element the element to check
 * @return {Boolean} true if the element is a checkbox, false if not
 * 
 */
const isCheckbox = element => element.type == 'checkbox';

/**
 * Checks if an input is a select with multiple attribute.
 * @param  {Element} element the elment to check
 * @return {Boolean} true if the element is a multiselect, false if not
 * 
 */
const isMultiSelect = element => element.option && element.multiple;

/**
 * Retrieves the selected options from a multi-select as an array.
 * @param {HtmlOptionsCollections} options the options for the select
 * @return {Array} an array of selected option vaues
 * 
 */
const getSelectedValues = options => [].reduce.call(options, (values, option) => {
    return option.selected ? values.concat(option.value) : values;
}, []);

function submitForm(event) {
    const form = $("#addCustomerForm")[0];
    // Call our function to get the form data.
    const data = formToJSON(form.elements);
    data["address"] = address;
    //console.log(JSON.stringify(data));

    // initiate ajax call....
    $.ajax({
        url: 'addCustomer',
        type: 'POST',
        datatype: 'json',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (data) {
            //cData = data;
            //console.log(data.result);
            //alert("inside success -- " + $.parseJSON(data)["result"]);
            $("#addCustomerForm")[0].reset();
            $("#successAlert").append("Customer successfully added.");
            $("#successAlert").fadeToggle(3000);
        },
        error: {

        }
    });
}

/**
 * Retrieves input data from a form and returns it as a JSON object.
 * @param  {HTMLFormControlsCollection} elements  the form elements
 * 
 * 
 * @return {Object}                               form data as an object literal
 */
const formToJSON = elements => [].reduce.call(elements, (data, element) => {

    // Make sure the element has the required properties and should be added.
    if (isValidElement(element) && isValidValue(element)) {
        /*
         * Some fields allow for more than one value, so we need to check if this
         * is one of those fields and, if so, store the values as an array.
        */

        if (isCheckbox(element)) {
            data[element.name] = (data[element.name] || []).concat(element.value);
        }
        else if (isMultiSelect(element)) {
            data[element.name] = getSelectValues(element);
        } else {
            if (element.name == "street" || element.name == "city" || element.name == "state") {
                address["street"] = $("#street").val();
                address["city"] = $("#city").val();
                address["state"] = $("#state").val();
            }
            else {
                data[element.name] = element.value;
            }
        }
    }

    cData = data;
    return data;
}, {});

function InsertSelecteValuesIntoEditFormInputElements() {
    cData.custId = _customerId;

    $('#custId').html('<p><b>' + _customerId + '</b></p>');

    if (cData.cName.length > 0) {
        if (cData.cName.trim().split(" ").length > 1) {
            $("#first_name").val(cData.cName.trim().split(" ")[0]);
            $("#last_name").val(cData.cName.trim().split(" ")[1]);
        }
        else {
            $("#first_name").val(cData.cName.trim().split(" ")[0]);
        }
    }
    if (cData.cAge.length > 0)
        $("#age").val(parseInt(cData.cAge.trim()))
    else
        $("#age").val(0)

    if (cData.cGender.length > 0)
        $("#gender").val(cData.cGender.trim());

    $("#street").val("");
    $("#city").val("");
    $("#state").val("");


    $("#street").val(cData.cAddress.street);
    $("#city").val(cData.cAddress.city);
    $("#state").val(cData.cAddress.state);

    if (cData.cBalance.trim() > 0)
        $("#balance").val(parseFloat(cData.cBalance.trim()).toFixed(2));
    else
        $("#balance").val(0.00);

    //console.log(cData);

    arrVal = [];
    if (cData.hasOwnProperty('cMemberships')) {
        if (cData.cMemberships.trim().split(",").length > 0) {
            arrVal = $.map(cData.cMemberships.split(","), $.trim);
            $.inArray('mem1', arrVal) > -1 == true ? $('#mem1').prop('checked', true) : $('#mem1').prop('checked', false);
            $.inArray('mem2', arrVal) > -1 == true ? $('#mem2').prop('checked', true) : $('#mem2').prop('checked', false);
            $.inArray('mem3', arrVal) > -1 == true ? $('#mem3').prop('checked', true) : $('#mem3').prop('checked', false);
        }
    }
}

function SubmitEditedCustomerData() {

    const form = $("#editForm")[0];
    //console.log(form)
    // Call our function to get the form data.
    const data = formToJSON(form.elements);
    //console.log(data)
    data["address"] = address;
    data["custId"] = _customerId;
    //console.log("cData: " + JSON.stringify(cData))
    //console.log("data: " + JSON.stringify(data));

    // initiate ajax call....
    $.ajax({
        url: 'editCustomer',
        type: 'POST',
        datatype: 'json',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (data) {
            //console.log(data["result"])
            if (jQuery.parseJSON(data).result.modifiedCount > 0) {
                window.location.reload();
            }
        },
        error: {

        }
    });

}