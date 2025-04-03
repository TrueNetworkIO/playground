import ace from 'ace-builds/src-noconflict/ace';

// Define the enhanced dark theme
ace.define('ace/theme/true_network_dark', ['require', 'exports', 'module', 'ace/lib/dom'], function (require, exports, module) {
  exports.isDark = true;
  exports.cssClass = 'ace-true-network-dark';
  exports.cssText = `
.ace-true-network-dark .ace_gutter {
  background: #141412;
  color: #8A8A8A;
  border-right: 1px solid #141412;
}

.ace-true-network-dark .ace_print-margin {
  width: 1px;
  background: #0A2845;
}

.ace-true-network-dark {
  background-color: #141412;
  color: #F2F0ED;
  font-family: 'Roboto Mono', 'Menlo', 'Monaco', 'Courier New', monospace;
  line-height: 1.5;
}

.ace-true-network-dark .ace_cursor {
  color: #FF4000;
  border-left: 2px solid;
}

.ace-true-network-dark .ace_marker-layer .ace_selection {
  background: rgba(14, 51, 86, 0.6);
}

.ace-true-network-dark.ace_multiselect .ace_selection.ace_start {
  box-shadow: 0 0 3px 0px #03101D;
}

.ace-true-network-dark .ace_marker-layer .ace_step {
  background: rgba(168, 219, 176, 0.3);
}

.ace-true-network-dark .ace_marker-layer .ace_bracket {
  margin: -1px 0 0 -1px;
  border: 1px solid rgba(255, 64, 0, 0.6);
}

.ace-true-network-dark .ace_marker-layer .ace_active-line {
  background: rgba(6, 31, 51, 0.5);
}

.ace-true-network-dark .ace_gutter-active-line {
  background-color: #0A2845;
}

.ace-true-network-dark .ace_marker-layer .ace_selected-word {
  border: 1px solid rgba(14, 51, 86, 0.7);
  border-radius: 2px;
}

.ace-true-network-dark .ace_invisible {
  color: #4C4C4C;
}

.ace-true-network-dark .ace_keyword,
.ace-true-network-dark .ace_meta,
.ace-true-network-dark .ace_storage,
.ace-true-network-dark .ace_storage.ace_type {
  color: #FF4000;
  font-weight: 500;
}

.ace-true-network-dark .ace_keyword.ace_operator {
  color: #FF9ECF;
  font-weight: normal;
}

.ace-true-network-dark .ace_constant.ace_character,
.ace-true-network-dark .ace_constant.ace_language,
.ace-true-network-dark .ace_constant.ace_numeric,
.ace-true-network-dark .ace_keyword.ace_other.ace_unit {
  color: #FFD176;
}

.ace-true-network-dark .ace_constant.ace_other {
  color: #D0A2F7;
}

.ace-true-network-dark .ace_invalid {
  color: #FFFFFF;
  background-color: rgba(255, 64, 0, 0.6);
}

.ace-true-network-dark .ace_invalid.ace_deprecated {
  color: #FFFFFF;
  background-color: rgba(208, 162, 247, 0.6);
}

.ace-true-network-dark .ace_fold {
  background-color: #90C7F4;
  border-color: #F2F0ED;
}

.ace-true-network-dark .ace_entity.ace_name.ace_function,
.ace-true-network-dark .ace_support.ace_function,
.ace-true-network-dark .ace_variable.ace_parameter {
  color: #90C7F4;
}

.ace-true-network-dark .ace_variable {
  color: #D8D4D0;
}

.ace-true-network-dark .ace_support.ace_class,
.ace-true-network-dark .ace_support.ace_type {
  color: #D0A2F7;
  font-style: italic;
}

.ace-true-network-dark .ace_heading,
.ace-true-network-dark .ace_markup.ace_heading,
.ace-true-network-dark .ace_string {
  color: #A8DBB0;
}

.ace-true-network-dark .ace_comment {
  color: #8A8A8A;
  font-style: italic;
}

.ace-true-network-dark .ace_entity.ace_name.ace_tag,
.ace-true-network-dark .ace_entity.ace_other.ace_attribute-name,
.ace-true-network-dark .ace_meta.ace_tag {
  color: #FF4000;
}

.ace-true-network-dark .ace_indent-guide {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWNgYGBgYHB3d/8PAAOIAdULw8qMAAAAAElFTkSuQmCC) right repeat-y;
}

.ace-true-network-dark .ace_indent-guide-active {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWNgYGBgYJDzPw8AAh8BDqOW5IEAAAAASUVORK5CYII=) right repeat-y;
}

/* Additional styles for better readability */
.ace-true-network-dark .ace_paren {
  color: #FF9ECF;
}

.ace-true-network-dark .ace_xml-pe {
  color: #B58863;
}

.ace-true-network-dark .ace_identifier {
  color: #D8D4D0;
}

/* JSON specific */
.ace-true-network-dark .ace_variable.ace_language.ace_json .ace_property-name {
  color: #90C7F4;
}

/* CSS specific */
.ace-true-network-dark .ace_property-name {
  color: #90C7F4;
}

.ace-true-network-dark .ace_property-value {
  color: #A8DBB0;
}

/* HTML specific */
.ace-true-network-dark .ace_xml_pe {
  color: #ADAAA6;
}

/* Additional customizations for better visual hierarchy */
.ace-true-network-dark .ace_punctuation {
  color: #ADAAA6;
}

.ace-true-network-dark .ace_support.ace_constant {
  color: #D0A2F7;
}

.ace-true-network-dark .ace_boolean {
  color: #FFD176;
  font-weight: 500;
}
  `;

  const dom = require('ace/lib/dom');
  dom.importCssString(exports.cssText, exports.cssClass);
});


// true-network-ace-light-theme.js
// Enhanced light theme for react-ace using True Network's brand colors

// true-network-ace-light-theme.js
// Enhanced light theme for react-ace using True Network's brand colors


// Define the enhanced light theme
ace.define('ace/theme/true_network_light', ['require', 'exports', 'module', 'ace/lib/dom'], function (require, exports, module) {
  exports.isDark = false;
  exports.cssClass = 'ace-true-network-light';
  exports.cssText = `
.ace-true-network-light .ace_gutter {
  background: #EEF2F6;
  color: #9198A0;
  border-right: 1px solid #E2E8EE;
}

.ace-true-network-light .ace_print-margin {
  width: 1px;
  background: #272C34;
}

.ace-true-network-light {
  background-color: #F9FAFB;
  color: #1A1E22;
  font-family: 'Roboto Mono', 'Menlo', 'Monaco', 'Courier New', monospace;
  line-height: 1.5;
}

.ace-true-network-light .ace_cursor {
  color: #F03D00;
  border-left: 2px solid;
}

.ace-true-network-light .ace_marker-layer .ace_selection {
  background: rgba(215, 227, 240, 0.7);
}

.ace-true-network-light.ace_multiselect .ace_selection.ace_start {
  box-shadow: 0 0 3px 0px #F9FAFB;
}

.ace-true-network-light .ace_marker-layer .ace_step {
  background: rgba(49, 133, 71, 0.2);
}

.ace-true-network-light .ace_marker-layer .ace_bracket {
  margin: -1px 0 0 -1px;
  border: 1px solid rgba(240, 61, 0, 0.6);
}

.ace-true-network-light .ace_marker-layer .ace_active-line {
  background: rgba(226, 232, 238, 0.5);
}

.ace-true-network-light .ace_gutter-active-line {
  background-color: #E2E8EE;
}

.ace-true-network-light .ace_marker-layer .ace_selected-word {
  border: 1px solid rgba(215, 227, 240, 0.7);
  border-radius: 2px;
}

.ace-true-network-light .ace_invisible {
  color: #BFBFBF;
}

.ace-true-network-light .ace_keyword,
.ace-true-network-light .ace_meta,
.ace-true-network-light .ace_storage,
.ace-true-network-light .ace_storage.ace_type {
  color: #F03D00;
  font-weight: 500;
}

.ace-true-network-light .ace_keyword.ace_operator {
  color: #C95A9D;
  font-weight: normal;
}

.ace-true-network-light .ace_constant.ace_character,
.ace-true-network-light .ace_constant.ace_language,
.ace-true-network-light .ace_constant.ace_numeric,
.ace-true-network-light .ace_keyword.ace_other.ace_unit {
  color: #D08C09;
}

.ace-true-network-light .ace_constant.ace_other {
  color: #7755B2;
}

.ace-true-network-light .ace_invalid {
  color: #FFFFFF;
  background-color: rgba(240, 61, 0, 0.6);
}

.ace-true-network-light .ace_invalid.ace_deprecated {
  color: #FFFFFF;
  background-color: rgba(119, 85, 178, 0.6);
}

.ace-true-network-light .ace_fold {
  background-color: #3582C4;
  border-color: #1A1E22;
}

.ace-true-network-light .ace_entity.ace_name.ace_function,
.ace-true-network-light .ace_support.ace_function,
.ace-true-network-light .ace_variable.ace_parameter {
  color: #0066CC; /* Pure blue with good visibility */
  font-weight: 500; /* Adding a bit more weight to make it stand out */
}


.ace-true-network-light .ace_variable {
  color: #3D4348;
}

.ace-true-network-light .ace_support.ace_class,
.ace-true-network-light .ace_support.ace_type {
  color: #7755B2;
  font-style: italic;
}

.ace-true-network-light .ace_heading,
.ace-true-network-light .ace_markup.ace_heading,
.ace-true-network-light .ace_string {
  color: #318547;
}

.ace-true-network-light .ace_comment {
  color: #5D646B;
  font-style: italic;
}

.ace-true-network-light .ace_entity.ace_name.ace_tag,
.ace-true-network-light .ace_entity.ace_other.ace_attribute-name,
.ace-true-network-light .ace_meta.ace_tag {
  color: #F03D00;
}

.ace-true-network-light .ace_indent-guide {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWNgYGBgYJDzPw8AAh8BDqOW5IEAAAAASUVORK5CYII=) right repeat-y;
}

.ace-true-network-light .ace_indent-guide-active {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWNgYGBgYJDzPw8AAh8BDqOW5IEAAAAASUVORK5CYII=) right repeat-y;
}

/* Additional styles for better readability */
.ace-true-network-light .ace_paren {
  color: #C95A9D;
}

.ace-true-network-light .ace_xml-pe {
  color: #7D512E;
}

.ace-true-network-light .ace_identifier {
  color: #3D4348;
}

/* JSON specific */
.ace-true-network-light .ace_variable.ace_language.ace_json .ace_property-name {
  color: #0066CC; /* Pure blue for better visibility */
}

/* CSS specific */
.ace-true-network-light .ace_property-name {
  color: #0066CC; /* Pure blue for better visibility */
}

.ace-true-network-light .ace_property-value {
  color: #318547;
}

/* HTML specific */
.ace-true-network-light .ace_xml_pe {
  color: #5D646B;
}

/* Additional customizations for better visual hierarchy */
.ace-true-network-light .ace_punctuation {
  color: #5D646B;
}

.ace-true-network-light .ace_support.ace_constant {
  color: #7755B2;
}

.ace-true-network-light .ace_boolean {
  color: #D08C09;
  font-weight: 500;
}

.ace-true-network-light .ace_storage.ace_type + .ace_identifier,
.ace-true-network-light .ace_keyword.ace_function + .ace_identifier,
.ace-true-network-light .ace_storage.ace_type.ace_function ~ .ace_identifier {
  color: #0066CC !important;
  font-weight: 500;
}

 /* Scrollbar customization */
    .ace-true-network-light .ace_scrollbar {
      background-color: #F9FAFB; /* Background of the scrollbar track */
      border-radius: 4px;
    }
    
    .ace-true-network-light .ace_scrollbar::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    
    .ace-true-network-light .ace_scrollbar::-webkit-scrollbar-track {
      background-color: #F9FAFB; /* Background of the scrollbar track */
      border-radius: 4px;
    }
    
    .ace-true-network-light .ace_scrollbar::-webkit-scrollbar-thumb {
      background-color: #C5D1DE; /* Color of the scrollbar itself */
      border-radius: 4px;
      border: 8px solid #F9FAFB; /* Creates padding around the scrollbar */
    }
    
    .ace-true-network-light .ace_scrollbar::-webkit-scrollbar-thumb:hover {
      background-color: #9AACBF; /* Scrollbar hover state */
    }
    
    /* For Firefox */
    .ace-true-network-light .ace_scrollbar {
      scrollbar-width: thin;
      scrollbar-color: #C5D1DE #F9FAFB; /* thumb track */
    }




  `;

  const dom = require('ace/lib/dom');
  dom.importCssString(exports.cssText, exports.cssClass);
});
