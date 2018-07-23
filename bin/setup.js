var inquirer = require("inquirer");
var config_fields = require("../config/config_fields");
var config_values = {};
var fs = require("fs");
var path = require("path");
var utils = require("../util/utils");

var config_file_path = path.resolve(__dirname, "..", "config", "config.json");
var config_file_backup_path = path.resolve(__dirname, "..", "config", "config.json.bak");

try {
    config_values = require("../config/config");
}
catch(e) {
    config_values = {};
}

var convert_string_to_field_type = function(config_field, value) {

    // If we don't specify field options, assume it's a string
    if(!config_field.hasOwnProperty("field_options")) {
        return value;
    }

    var config_field_options = config_field.field_options;

    if(config_field_options.hasOwnProperty("type")) {
        if(config_field_options.type === "checkbox") {
            if (typeof value === "boolean"){
                return value;
            }
            return utils.is_string_true(value);
        }
        else if(config_field_options.type === "number") {
            return parseFloat(value);
        }
    }

    return value;
};

var config_field_dict = {};

var num_config_fields = config_fields.length;

var inquirer_prompts = [];

for(var config_field_index = 0; config_field_index < num_config_fields;
    ++config_field_index) {

    config_field_dict[config_fields[config_field_index].key] = config_fields[config_field_index];


    var config_field = config_fields[config_field_index];
    var default_value = null;

    if(config_values.hasOwnProperty(config_field.key)) {
        default_value = config_values[config_field.key];
    }
    else {
        default_value = config_field.value;
    }
    var inquirer_options={
        type: "input",
        name: config_field.key,
        message: config_field.description + "(" + config_field.key + ")",
        default: default_value
    };
    if (config_field.inquirer_options)
    {
        var inquirer_optionsKeys=Object.keys(config_field.inquirer_options);
        for (var key_i=0; key_i<inquirer_optionsKeys.length; key_i++)
        {
            var key=inquirer_optionsKeys[key_i];
            inquirer_options[key]=config_field.inquirer_options[key];
            if (key=="validate")
            {
                inquirer_options[key]=eval(config_field.inquirer_options[key]);

            }
        }
    }

    inquirer_prompts.push(inquirer_options);
}

var updated_config_values = {};

inquirer.prompt(inquirer_prompts)
.then(function(answers) {
    for(var key in answers) {

        if(!answers.hasOwnProperty(key)) {
            continue;
        }

        answers[key] = convert_string_to_field_type(config_field_dict[key], answers[key]);

        updated_config_values[key] = answers[key];
    }

    var config_value_string = JSON.stringify(updated_config_values, null, 2);
    fs.writeFileSync(config_file_path, config_value_string);

    return Promise.resolve();

}).then(function() {
    process.exit(0);
});
