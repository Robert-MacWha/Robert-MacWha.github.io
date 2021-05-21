/*
 @licstart  The following is the entire license notice for the JavaScript code in this file.

 The MIT License (MIT)

 Copyright (C) 1997-2020 by Dimitri van Heesch

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 and associated documentation files (the "Software"), to deal in the Software without restriction,
 including without limitation the rights to use, copy, modify, merge, publish, distribute,
 sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or
 substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 @licend  The above is the entire license notice for the JavaScript code in this file
*/
var NAVTREE =
[
  [ "Robert's Airplane Database", "index.html", [
    [ "Documentation Guide", "md__d___projects__c____i_c_s__airline__database__documentation__guide.html", [
      [ "Classes", "md__d___projects__c____i_c_s__airline__database__documentation__guide.html#autotoc_md1", null ],
      [ "UML diagrams", "md__d___projects__c____i_c_s__airline__database__documentation__guide.html#autotoc_md2", null ],
      [ "User Guide", "md__d___projects__c____i_c_s__airline__database__documentation__guide.html#autotoc_md3", null ],
      [ "Test Plan", "md__d___projects__c____i_c_s__airline__database__documentation__guide.html#autotoc_md4", null ]
    ] ],
    [ "Test Plan", "md__d___projects__c____i_c_s__airline__database__test__plan.html", [
      [ "Features", "md__d___projects__c____i_c_s__airline__database__test__plan.html#autotoc_md6", null ],
      [ "Invalid command", "md__d___projects__c____i_c_s__airline__database__test__plan.html#autotoc_md7", null ],
      [ "Creating flights", "md__d___projects__c____i_c_s__airline__database__test__plan.html#autotoc_md8", [
        [ "Create flight correctly", "md__d___projects__c____i_c_s__airline__database__test__plan.html#autotoc_md9", null ],
        [ "Create flight with invalid number of seats", "md__d___projects__c____i_c_s__airline__database__test__plan.html#autotoc_md10", null ]
      ] ],
      [ "Selecting flights", "md__d___projects__c____i_c_s__airline__database__test__plan.html#autotoc_md11", [
        [ "Selecting existing flight", "md__d___projects__c____i_c_s__airline__database__test__plan.html#autotoc_md12", null ],
        [ "Selecting invalid flight", "md__d___projects__c____i_c_s__airline__database__test__plan.html#autotoc_md13", null ]
      ] ],
      [ "Deleting flights", "md__d___projects__c____i_c_s__airline__database__test__plan.html#autotoc_md14", [
        [ "Deleting an existing flight", "md__d___projects__c____i_c_s__airline__database__test__plan.html#autotoc_md15", null ],
        [ "Deleting an existing flight and canceling", "md__d___projects__c____i_c_s__airline__database__test__plan.html#autotoc_md16", null ]
      ] ],
      [ "Viewing information", "md__d___projects__c____i_c_s__airline__database__test__plan.html#autotoc_md17", [
        [ "Viewing information on all flights", "md__d___projects__c____i_c_s__airline__database__test__plan.html#autotoc_md18", [
          [ "Detail Mode", "md__d___projects__c____i_c_s__airline__database__test__plan.html#autotoc_md19", [
            [ "View information at lowest detail", "md__d___projects__c____i_c_s__airline__database__test__plan.html#autotoc_md20", null ],
            [ "View information at medium detail", "md__d___projects__c____i_c_s__airline__database__test__plan.html#autotoc_md21", null ],
            [ "View information at highest detail", "md__d___projects__c____i_c_s__airline__database__test__plan.html#autotoc_md22", null ],
            [ "View information at invalid detail", "md__d___projects__c____i_c_s__airline__database__test__plan.html#autotoc_md23", null ]
          ] ],
          [ "Sort Mode", "md__d___projects__c____i_c_s__airline__database__test__plan.html#autotoc_md24", [
            [ "View information at sort mode 0", "md__d___projects__c____i_c_s__airline__database__test__plan.html#autotoc_md25", null ],
            [ "View information at sort mode 1", "md__d___projects__c____i_c_s__airline__database__test__plan.html#autotoc_md26", null ],
            [ "View information at invalid sort mode", "md__d___projects__c____i_c_s__airline__database__test__plan.html#autotoc_md27", null ]
          ] ]
        ] ],
        [ "Viewing information on selected flight", "md__d___projects__c____i_c_s__airline__database__test__plan.html#autotoc_md28", null ],
        [ "Viewing information on selected seat", "md__d___projects__c____i_c_s__airline__database__test__plan.html#autotoc_md29", null ]
      ] ],
      [ "Editing flight information", "md__d___projects__c____i_c_s__airline__database__test__plan.html#autotoc_md30", [
        [ "Updating flight departure", "md__d___projects__c____i_c_s__airline__database__test__plan.html#autotoc_md31", null ],
        [ "Updating flight destination", "md__d___projects__c____i_c_s__airline__database__test__plan.html#autotoc_md32", null ],
        [ "Updating flight departure time", "md__d___projects__c____i_c_s__airline__database__test__plan.html#autotoc_md33", null ]
      ] ],
      [ "Managing passengers", "md__d___projects__c____i_c_s__airline__database__test__plan.html#autotoc_md34", [
        [ "Adding a passenger", "md__d___projects__c____i_c_s__airline__database__test__plan.html#autotoc_md35", [
          [ "Adding a passenger to a valid seat", "md__d___projects__c____i_c_s__airline__database__test__plan.html#autotoc_md36", null ],
          [ "Adding a passenger to a valid non-avalible seat", "md__d___projects__c____i_c_s__airline__database__test__plan.html#autotoc_md37", null ]
        ] ],
        [ "Removing a passenger", "md__d___projects__c____i_c_s__airline__database__test__plan.html#autotoc_md38", [
          [ "Removing a passenger from an avalible seat", "md__d___projects__c____i_c_s__airline__database__test__plan.html#autotoc_md39", null ],
          [ "Removing a passenger from a non-avalible seat", "md__d___projects__c____i_c_s__airline__database__test__plan.html#autotoc_md40", null ]
        ] ]
      ] ]
    ] ],
    [ "User Guide", "md__d___projects__c____i_c_s__airline__database__user__guide.html", [
      [ "Help", "md__d___projects__c____i_c_s__airline__database__user__guide.html#autotoc_md42", null ],
      [ "Creating flights", "md__d___projects__c____i_c_s__airline__database__user__guide.html#autotoc_md43", null ],
      [ "Deleting flights", "md__d___projects__c____i_c_s__airline__database__user__guide.html#autotoc_md44", null ],
      [ "Adding passengers", "md__d___projects__c____i_c_s__airline__database__user__guide.html#autotoc_md45", null ],
      [ "Removing passengers", "md__d___projects__c____i_c_s__airline__database__user__guide.html#autotoc_md46", null ],
      [ "Viewing all flights info", "md__d___projects__c____i_c_s__airline__database__user__guide.html#autotoc_md47", null ],
      [ "Viewing flight info", "md__d___projects__c____i_c_s__airline__database__user__guide.html#autotoc_md48", null ],
      [ "Viewing passenger info", "md__d___projects__c____i_c_s__airline__database__user__guide.html#autotoc_md49", null ],
      [ "Setting flight information", "md__d___projects__c____i_c_s__airline__database__user__guide.html#autotoc_md50", null ]
    ] ],
    [ "Classes", "annotated.html", [
      [ "Class List", "annotated.html", "annotated_dup" ],
      [ "Class Index", "classes.html", null ],
      [ "Class Members", "functions.html", [
        [ "All", "functions.html", null ],
        [ "Functions", "functions_func.html", null ],
        [ "Variables", "functions_vars.html", null ]
      ] ]
    ] ],
    [ "Files", "files.html", [
      [ "File List", "files.html", "files_dup" ],
      [ "File Members", "globals.html", [
        [ "All", "globals.html", null ],
        [ "Functions", "globals_func.html", null ],
        [ "Variables", "globals_vars.html", null ]
      ] ]
    ] ]
  ] ]
];

var NAVTREEINDEX =
[
"_airline_01_database_8cpp.html"
];

var SYNCONMSG = 'click to disable panel synchronisation';
var SYNCOFFMSG = 'click to enable panel synchronisation';